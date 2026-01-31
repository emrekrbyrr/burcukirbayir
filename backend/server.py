from fastapi import FastAPI, APIRouter, HTTPException, File, UploadFile
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import shutil
import re
import unicodedata

from seed_data import build_seed_posts


logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Uploads directory (configurable for non-container deployments)
DEFAULT_UPLOAD_DIR = (ROOT_DIR.parent / "frontend" / "public" / "uploads").resolve()
UPLOAD_DIR = Path(os.environ.get("UPLOAD_DIR", str(DEFAULT_UPLOAD_DIR)))
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Slug generator function for Turkish characters
def generate_slug(text: str) -> str:
    """Generate a SEO-friendly slug from Turkish text"""
    # Turkish character mapping
    turkish_map = {
        'ı': 'i', 'İ': 'i', 'ş': 's', 'Ş': 's',
        'ğ': 'g', 'Ğ': 'g', 'ü': 'u', 'Ü': 'u',
        'ö': 'o', 'Ö': 'o', 'ç': 'c', 'Ç': 'c'
    }
    
    # Replace Turkish characters
    for turkish_char, latin_char in turkish_map.items():
        text = text.replace(turkish_char, latin_char)
    
    # Convert to lowercase and normalize
    text = text.lower()
    text = unicodedata.normalize('NFKD', text)
    text = text.encode('ascii', 'ignore').decode('ascii')
    
    # Replace spaces and special characters with hyphens
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    text = text.strip('-')
    
    # Limit length
    text = text[:100]
    
    return text


def _is_truthy_env(value: str) -> bool:
    return value.strip().lower() in {"1", "true", "yes", "y", "on"}


async def seed_blog_posts_if_empty():
    """Seed starter blogs if collection is empty."""
    if not _is_truthy_env(os.environ.get("SEED_BLOGS_ON_STARTUP", "true")):
        logger.info("Blog seeding disabled via SEED_BLOGS_ON_STARTUP.")
        return

    existing_count = await db.blog_posts.count_documents({})
    if existing_count > 0:
        logger.info("Blog seeding skipped (%s existing posts).", existing_count)
        return

    blog_posts = build_seed_posts(generate_slug=generate_slug)
    if not blog_posts:
        logger.warning("No seed blog posts configured.")
        return

    await db.blog_posts.insert_many(blog_posts)
    logger.info("Seeded %s blog posts.", len(blog_posts))

# Blog Models
class BlogPostCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    category: str
    image: str

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    image: Optional[str] = None

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: Optional[str] = None  # Optional for backward compatibility
    title: str
    excerpt: str
    content: str
    category: str
    image: str
    date: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Blog Routes
@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts():
    """Get all blog posts"""
    blog_posts = await db.blog_posts.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for post in blog_posts:
        if isinstance(post.get('created_at'), str):
            post['created_at'] = datetime.fromisoformat(post['created_at'])
        if isinstance(post.get('updated_at'), str):
            post['updated_at'] = datetime.fromisoformat(post['updated_at'])
    
    return blog_posts

@api_router.get("/blog/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    """Get a single blog post by ID or slug"""
    # Try to find by slug first (if provided), then by ID
    post = await db.blog_posts.find_one({"slug": post_id}, {"_id": 0})
    if not post:
        post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    # Convert ISO string timestamps back to datetime objects
    if isinstance(post.get('created_at'), str):
        post['created_at'] = datetime.fromisoformat(post['created_at'])
    if isinstance(post.get('updated_at'), str):
        post['updated_at'] = datetime.fromisoformat(post['updated_at'])
    
    return BlogPost(**post)

@api_router.post("/blog", response_model=BlogPost)
async def create_blog_post(post: BlogPostCreate):
    """Create a new blog post"""
    # Generate slug from title
    slug = generate_slug(post.title)
    
    # Check if slug already exists, if so add number suffix
    existing = await db.blog_posts.find_one({"slug": slug})
    if existing:
        counter = 1
        while existing:
            slug = f"{generate_slug(post.title)}-{counter}"
            existing = await db.blog_posts.find_one({"slug": slug})
            counter += 1
    
    blog_post = BlogPost(
        **post.model_dump(),
        slug=slug,
        date=datetime.now(timezone.utc).strftime("%d %B %Y")
    )
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = blog_post.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    
    await db.blog_posts.insert_one(doc)
    return blog_post

@api_router.put("/blog/{post_id}", response_model=BlogPost)
async def update_blog_post(post_id: str, post: BlogPostUpdate):
    """Update an existing blog post"""
    existing_post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if not existing_post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    update_data = {k: v for k, v in post.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    await db.blog_posts.update_one(
        {"id": post_id},
        {"$set": update_data}
    )
    
    updated_post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    
    # Convert ISO string timestamps back to datetime objects
    if isinstance(updated_post.get('created_at'), str):
        updated_post['created_at'] = datetime.fromisoformat(updated_post['created_at'])
    if isinstance(updated_post.get('updated_at'), str):
        updated_post['updated_at'] = datetime.fromisoformat(updated_post['updated_at'])
    
    return BlogPost(**updated_post)

@api_router.delete("/blog/{post_id}")
async def delete_blog_post(post_id: str):
    """Delete a blog post"""
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return {"message": "Blog post deleted successfully"}

@api_router.get("/blog-export")
async def export_blogs():
    """Export all blog posts as JSON"""
    posts = await db.blog_posts.find({}, {"_id": 0}).to_list(1000)
    return {"blogs": posts, "count": len(posts)}

@api_router.post("/blog-import")
async def import_blogs(data: dict):
    """Import blog posts from JSON"""
    try:
        blogs = data.get("blogs", [])
        if not blogs:
            raise HTTPException(status_code=400, detail="No blogs provided")
        
        imported_count = 0
        skipped_count = 0
        
        for blog in blogs:
            # Check if blog already exists (by slug or ID)
            existing = await db.blog_posts.find_one({
                "$or": [
                    {"slug": blog.get("slug")},
                    {"id": blog.get("id")}
                ]
            })
            
            if existing:
                skipped_count += 1
                continue
            
            # Insert blog
            await db.blog_posts.insert_one(blog)
            imported_count += 1
        
        return {
            "success": True,
            "imported": imported_count,
            "skipped": skipped_count,
            "message": f"Successfully imported {imported_count} blogs, skipped {skipped_count} duplicates"
        }
    except Exception as e:
        logger.error(f"Error importing blogs: {e}")
        raise HTTPException(status_code=500, detail=f"Error importing blogs: {str(e)}")

@api_router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    """Upload an image file"""
    try:
        # Validate file type
        allowed_types = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
        if file.content_type not in allowed_types:
            raise HTTPException(status_code=400, detail="Invalid file type. Only images allowed.")
        
        # Generate unique filename
        file_extension = file.filename.split(".")[-1]
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        
        # Save to uploads directory
        file_path = UPLOAD_DIR / unique_filename
        
        # Write file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Return URL that works behind a reverse proxy (relative by default)
        relative_url = f"/uploads/{unique_filename}"
        public_base_url = os.environ.get("PUBLIC_BASE_URL") or os.environ.get("REACT_APP_BACKEND_URL")
        file_url = f"{public_base_url.rstrip('/')}{relative_url}" if public_base_url else relative_url
        
        return {
            "success": True,
            "url": file_url,
            "filename": unique_filename
        }
    except Exception as e:
        logger.error(f"Error uploading file: {e}")
        raise HTTPException(status_code=500, detail=f"Error uploading file: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

# Mount static files for uploaded images
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_seed_blogs():
    try:
        await seed_blog_posts_if_empty()
    except Exception as exc:
        logger.error(f"Failed to seed blog posts: {exc}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()