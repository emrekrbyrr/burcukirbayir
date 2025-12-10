import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
import re
import unicodedata

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

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

async def add_slugs_to_existing_posts():
    try:
        # Get all blog posts
        posts = await db.blog_posts.find({}).to_list(1000)
        
        print(f"Found {len(posts)} blog posts")
        
        updated_count = 0
        for post in posts:
            # Skip if already has slug
            if 'slug' in post and post['slug']:
                print(f"  - '{post['title']}' already has slug: {post['slug']}")
                continue
            
            # Generate slug from title
            slug = generate_slug(post['title'])
            
            # Check if slug exists
            existing = await db.blog_posts.find_one({"slug": slug, "id": {"$ne": post['id']}})
            if existing:
                counter = 1
                while existing:
                    slug = f"{generate_slug(post['title'])}-{counter}"
                    existing = await db.blog_posts.find_one({"slug": slug, "id": {"$ne": post['id']}})
                    counter += 1
            
            # Update post with slug
            await db.blog_posts.update_one(
                {"id": post['id']},
                {"$set": {"slug": slug}}
            )
            
            print(f"  ✓ Updated '{post['title']}' with slug: {slug}")
            updated_count += 1
        
        print(f"\n✅ Successfully updated {updated_count} blog posts with slugs!")
        
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(add_slugs_to_existing_posts())
