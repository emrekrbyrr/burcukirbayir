import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPost();
  }, [id]);

  const fetchBlogPost = async () => {
    try {
      const response = await axios.get(`${API}/blog/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center">
        <p className="text-[#6B5545]">Yükleniyor...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#6B5545] mb-4">Blog yazısı bulunamadı.</p>
          <Button
            onClick={() => navigate('/')}
            className="bg-[#8B6F47] hover:bg-[#6B5533] text-white"
          >
            Ana Sayfaya Dön
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-[#EDE6DB] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47]/5"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ana Sayfaya Dön
            </Button>
          </div>
        </div>
      </nav>

      {/* Blog Post Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#8B6F47] text-white text-sm px-4 py-1 rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-[#9B8A7A]">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#3D2E1F] mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-[#6B5545] leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Featured Image */}
        <Card className="mb-8 border-[#EDE6DB] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover"
          />
        </Card>

        {/* Content */}
        <Card className="border-[#EDE6DB] bg-white">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => {
                // Check if it's a heading (starts with ##)
                if (paragraph.trim().startsWith('##')) {
                  const headingText = paragraph.replace(/^##\s*/, '');
                  return (
                    <h2 key={index} className="text-2xl font-bold text-[#3D2E1F] mt-8 mb-4">
                      {headingText}
                    </h2>
                  );
                }
                
                // Check if it's a list item (starts with number or bullet)
                if (paragraph.trim().match(/^\d+\.\s/) || paragraph.trim().startsWith('-') || paragraph.trim().startsWith('•')) {
                  const items = paragraph.split('\n').filter(line => line.trim());
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 my-4 text-[#6B5545]">
                      {items.map((item, i) => (
                        <li key={i} className="leading-relaxed">
                          {item.replace(/^[\d\.\-\•\*]\s*/, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }

                // Check if it's bold text (starts with **)
                if (paragraph.trim().startsWith('**')) {
                  const boldText = paragraph.replace(/\*\*/g, '');
                  return (
                    <p key={index} className="text-[#6B5545] leading-relaxed mb-4">
                      <strong className="font-semibold text-[#3D2E1F]">{boldText}</strong>
                    </p>
                  );
                }
                
                // Regular paragraph
                return (
                  <p key={index} className="text-[#6B5545] leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={() => navigate('/')}
            className="bg-[#8B6F47] hover:bg-[#6B5533] text-white px-8 py-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tüm Yazılara Dön
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#3D2E1F] text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[#C4996B] text-sm">
              © 2024 Burcu Kırbayır. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogDetail;
