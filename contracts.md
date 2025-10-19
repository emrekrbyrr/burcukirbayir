# API Contracts - Burcu Kırbayır Teacher Portfolio

## Overview
This document outlines the API contracts for the blog management system.

## Blog Management

### Models

#### Blog Post Model
```python
{
    "id": "string (auto-generated)",
    "title": "string",
    "excerpt": "string",
    "content": "string",
    "category": "string",
    "image": "string (URL)",
    "date": "datetime",
    "created_at": "datetime",
    "updated_at": "datetime"
}
```

### API Endpoints

#### 1. Get All Blog Posts
- **Endpoint**: `GET /api/blog`
- **Description**: Retrieve all blog posts
- **Response**: Array of blog post objects
- **Status Codes**:
  - 200: Success
  - 500: Server error

#### 2. Get Single Blog Post
- **Endpoint**: `GET /api/blog/{post_id}`
- **Description**: Retrieve a single blog post by ID
- **Response**: Blog post object
- **Status Codes**:
  - 200: Success
  - 404: Post not found
  - 500: Server error

#### 3. Create Blog Post
- **Endpoint**: `POST /api/blog`
- **Description**: Create a new blog post
- **Request Body**:
```json
{
    "title": "string (required)",
    "excerpt": "string (required)",
    "content": "string (required)",
    "category": "string (required)",
    "image": "string (required, URL)"
}
```
- **Response**: Created blog post object
- **Status Codes**:
  - 201: Created successfully
  - 400: Invalid input
  - 500: Server error

#### 4. Update Blog Post
- **Endpoint**: `PUT /api/blog/{post_id}`
- **Description**: Update an existing blog post
- **Request Body**: Same as Create Blog Post
- **Response**: Updated blog post object
- **Status Codes**:
  - 200: Updated successfully
  - 404: Post not found
  - 400: Invalid input
  - 500: Server error

#### 5. Delete Blog Post
- **Endpoint**: `DELETE /api/blog/{post_id}`
- **Description**: Delete a blog post
- **Response**: Success message
- **Status Codes**:
  - 200: Deleted successfully
  - 404: Post not found
  - 500: Server error

## Frontend Integration

### Pages
1. **Admin Blog Page** (`/admin/blog`)
   - List all blog posts
   - Create new blog post
   - Edit existing blog post
   - Delete blog post

### Mock Data Migration
- Current mock data in `mock.js` will be migrated to MongoDB
- Initial seed data will be inserted on first backend start

### Components
1. **BlogList**: Display all blog posts in admin
2. **BlogForm**: Create/Edit blog post form
3. **BlogCard**: Individual blog post card

## Notes
- No authentication required for MVP
- Blog posts will be publicly visible on the main page
- Admin page will be accessible without login for MVP
