import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminBlog = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get(`${API}/blog`);
      setBlogPosts(response.data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast({
        title: 'Hata',
        description: 'Blog yazıları yüklenemedi.',
        variant: 'destructive'
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingPost) {
        await axios.put(`${API}/blog/${editingPost.id}`, formData);
        toast({
          title: 'Başarılı!',
          description: 'Blog yazısı güncellendi.'
        });
      } else {
        await axios.post(`${API}/blog`, formData);
        toast({
          title: 'Başarılı!',
          description: 'Blog yazısı oluşturuldu.'
        });
      }

      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        image: ''
      });
      setIsFormOpen(false);
      setEditingPost(null);
      fetchBlogPosts();
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: 'Hata',
        description: 'Blog yazısı kaydedilemedi.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image: post.image
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await axios.delete(`${API}/blog/${postId}`);
      toast({
        title: 'Başarılı!',
        description: 'Blog yazısı silindi.'
      });
      fetchBlogPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: 'Hata',
        description: 'Blog yazısı silinemedi.',
        variant: 'destructive'
      });
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      image: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Header */}
      <div className="bg-white border-b border-[#EDE6DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47]/5"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ana Sayfaya Dön
              </Button>
              <h1 className="text-3xl font-bold text-[#3D2E1F]">Blog Yönetimi</h1>
            </div>
            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-[#8B6F47] hover:bg-[#6B5533] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Yeni Yazı
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form */}
        {isFormOpen && (
          <Card className="mb-8 border-[#EDE6DB] bg-white">
            <CardHeader>
              <CardTitle className="text-2xl text-[#3D2E1F]">
                {editingPost ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#3D2E1F] mb-2">Başlık</label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Blog yazısı başlığı"
                    required
                    className="border-[#EDE6DB] focus:border-[#8B6F47] focus:ring-[#8B6F47]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3D2E1F] mb-2">Kategori</label>
                  <Input
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Teknoloji, Drama, PYP, vb."
                    required
                    className="border-[#EDE6DB] focus:border-[#8B6F47] focus:ring-[#8B6F47]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3D2E1F] mb-2">Özet</label>
                  <Textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="Kısa bir özet yazın..."
                    required
                    rows={2}
                    className="border-[#EDE6DB] focus:border-[#8B6F47] focus:ring-[#8B6F47] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3D2E1F] mb-2">İçerik</label>
                  <Textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Blog yazısı içeriği..."
                    required
                    rows={8}
                    className="border-[#EDE6DB] focus:border-[#8B6F47] focus:ring-[#8B6F47] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3D2E1F] mb-2">Görsel URL'si</label>
                  <Input
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    required
                    className="border-[#EDE6DB] focus:border-[#8B6F47] focus:ring-[#8B6F47]"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-[#8B6F47] hover:bg-[#6B5533] text-white"
                  >
                    {loading ? 'Kaydediliyor...' : (editingPost ? 'Güncelle' : 'Oluştur')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47]/5"
                  >
                    İptal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Blog Posts List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#3D2E1F]">Tüm Yazılar ({blogPosts.length})</h2>
          {blogPosts.length === 0 ? (
            <Card className="border-[#EDE6DB] bg-white">
              <CardContent className="py-12 text-center">
                <p className="text-[#6B5545]">Henüz blog yazısı yok. İlk yazınızı oluşturun!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id} className="border-[#EDE6DB] bg-white hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="w-48 h-32 flex-shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="bg-[#8B6F47] text-white text-xs px-3 py-1 rounded-full">
                                {post.category}
                              </span>
                              <span className="text-sm text-[#9B8A7A]">{post.date}</span>
                            </div>
                            <h3 className="text-xl font-bold text-[#3D2E1F] mb-2">{post.title}</h3>
                            <p className="text-[#6B5545] line-clamp-2">{post.excerpt}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(post)}
                              className="border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47]/5"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(post.id)}
                              className="border-red-500 text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlog;