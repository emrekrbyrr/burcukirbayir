import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { toast } from '../hooks/use-toast';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const isAuthenticated = localStorage.getItem('admin_authenticated');
    if (isAuthenticated === 'true') {
      navigate('/admin/findik');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Correct password
    const correctPassword = 'Kirbayir.12';

    if (password === correctPassword) {
      localStorage.setItem('admin_authenticated', 'true');
      toast({
        title: 'Giriş Başarılı!',
        description: 'Yönetim paneline yönlendiriliyorsunuz...'
      });
      setTimeout(() => {
        navigate('/admin/findik');
      }, 500);
    } else {
      toast({
        title: 'Hatalı Şifre',
        description: 'Lütfen doğru şifreyi giriniz.',
        variant: 'destructive'
      });
      setPassword('');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F0E8] to-[#FAF8F3] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-[#EDE6DB] shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="w-16 h-16 bg-[#8B6F47] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl text-[#3D2E1F]">Yönetim Paneli</CardTitle>
          <CardDescription className="text-[#6B5545]">
            Burcu Kırbayır - Blog Yönetimi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#3D2E1F] mb-2">
                Şifre
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrenizi giriniz"
                  required
                  className="border-[#EDE6DB] focus:border-[#8B6F47] focus:ring-[#8B6F47] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B5545] hover:text-[#3D2E1F]"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8B6F47] hover:bg-[#6B5533] text-white py-6 text-base"
            >
              {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-[#6B5545] hover:text-[#3D2E1F] hover:bg-[#F5F0E8]"
            >
              Ana Sayfaya Dön
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;