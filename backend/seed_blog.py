import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

from seed_data import build_seed_posts

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

async def seed_blog():
    try:
        blog_posts = build_seed_posts()
        # Check if blog posts already exist
        existing_count = await db.blog_posts.count_documents({})
        if existing_count > 0:
            print(f"Blog posts already exist ({existing_count} posts). Clearing collection...")
            await db.blog_posts.delete_many({})
        
        # Insert blog posts
        result = await db.blog_posts.insert_many(blog_posts)
        print(f"Successfully inserted {len(result.inserted_ids)} blog posts!")
        
        # Print inserted posts
        for post in blog_posts:
            print(f"- {post['title']} ({post['category']})")
        
    except Exception as e:
        print(f"Error seeding blog posts: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_blog())
