import React, { useState } from 'react';
import { X, Search, Upload } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { toast } from '../hooks/use-toast';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Hazır eğitim görselleri
const predefinedImages = [
  {
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    category: "Genel",
    description: "Eğitim ve öğrenme"
  },
  {
    url: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=800",
    category: "Drama",
    description: "Drama ve tiyatro"
  },
  {
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800",
    category: "Teknoloji",
    description: "Teknoloji ve bilgisayar"
  },
  {
    url: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800",
    category: "Eğitim",
    description: "Oyun ve öğrenme"
  },
  {
    url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800",
    category: "Kitaplar",
    description: "Kitaplar ve okuma"
  },
  {
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
    category: "Sınıf",
    description: "Sınıf ve ders ortamı"
  },
  {
    url: "https://images.pexels.com/photos/8613059/pexels-photo-8613059.jpeg",
    category: "Öğrenciler",
    description: "Öğrenciler birlikte çalışıyor"
  },
  {
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
    category: "Okul",
    description: "Okul malzemeleri"
  },
  {
    url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800",
    category: "Eğitim",
    description: "Eğitim ve öğretim"
  },
  {
    url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800",
    category: "Okuma",
    description: "Kitap okuma"
  },
  {
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
    category: "Ders",
    description: "Ders notları"
  },
  {
    url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800",
    category: "Yaratıcılık",
    description: "Yaratıcı aktiviteler"
  }
];

const ImagePicker = ({ isOpen, onClose, onSelectImage, currentImage }) => {
  const [customUrl, setCustomUrl] = useState('');
  const [selectedTab, setSelectedTab] = useState('gallery'); // 'gallery', 'url', or 'upload'
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleSelectImage = (url) => {
    onSelectImage(url);
    onClose();
  };

  const handleCustomUrl = () => {
    if (customUrl.trim()) {
      onSelectImage(customUrl.trim());
      setCustomUrl('');
      onClose();
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Hata',
        description: 'Sadece resim dosyaları yüklenebilir.',
        variant: 'destructive'
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Hata',
        description: 'Dosya boyutu 5MB\'dan küçük olmalıdır.',
        variant: 'destructive'
      });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${API}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        const imageUrl = response.data.url; // Backend already returns full URL
        setUploadedFile(imageUrl);
        onSelectImage(imageUrl);
        toast({
          title: 'Başarılı!',
          description: 'Görsel başarıyla yüklendi.'
        });
        onClose();
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Hata',
        description: 'Görsel yüklenirken bir hata oluştu.',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#3D2E1F]">Görsel Seç</DialogTitle>
          <DialogDescription className="text-[#6B5545]">
            Hazır görsellerden birini seçin veya kendi URL'nizi girin
          </DialogDescription>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-[#EDE6DB] mb-4">
          <button
            onClick={() => setSelectedTab('gallery')}
            className={`px-4 py-2 font-medium transition-colors ${
              selectedTab === 'gallery'
                ? 'text-[#8B6F47] border-b-2 border-[#8B6F47]'
                : 'text-[#6B5545] hover:text-[#3D2E1F]'
            }`}
          >
            Görsel Galerisi
          </button>
          <button
            onClick={() => setSelectedTab('upload')}
            className={`px-4 py-2 font-medium transition-colors ${
              selectedTab === 'upload'
                ? 'text-[#8B6F47] border-b-2 border-[#8B6F47]'
                : 'text-[#6B5545] hover:text-[#3D2E1F]'
            }`}
          >
            Dosya Yükle
          </button>
          <button
            onClick={() => setSelectedTab('url')}
            className={`px-4 py-2 font-medium transition-colors ${
              selectedTab === 'url'
                ? 'text-[#8B6F47] border-b-2 border-[#8B6F47]'
                : 'text-[#6B5545] hover:text-[#3D2E1F]'
            }`}
          >
            URL Gir
          </button>
        </div>

        {/* Gallery Tab */}
        {selectedTab === 'gallery' && (
          <div className="grid grid-cols-3 gap-4">
            {predefinedImages.map((image, index) => (
              <Card
                key={index}
                className={`cursor-pointer overflow-hidden hover:shadow-lg transition-shadow ${
                  currentImage === image.url ? 'ring-2 ring-[#8B6F47]' : ''
                }`}
                onClick={() => handleSelectImage(image.url)}
              >
                <img
                  src={image.url}
                  alt={image.description}
                  className="w-full h-32 object-cover"
                />
                <div className="p-2">
                  <p className="text-xs font-medium text-[#3D2E1F]">{image.category}</p>
                  <p className="text-xs text-[#6B5545]">{image.description}</p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Upload Tab */}
        {selectedTab === 'upload' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-[#EDE6DB] rounded-lg p-8 text-center hover:border-[#8B6F47] transition-colors">
              <Upload className="w-12 h-12 text-[#8B6F47] mx-auto mb-4" />
              <h4 className="text-lg font-medium text-[#3D2E1F] mb-2">
                Bilgisayarınızdan Görsel Yükleyin
              </h4>
              <p className="text-sm text-[#6B5545] mb-4">
                JPG, PNG, GIF veya WEBP formatında, maksimum 5MB
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button
                  type="button"
                  disabled={uploading}
                  className="bg-[#8B6F47] hover:bg-[#6B5533] text-white cursor-pointer"
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  {uploading ? 'Yükleniyor...' : 'Dosya Seç'}
                </Button>
              </label>
            </div>
            {uploadedFile && (
              <div>
                <p className="text-sm font-medium text-[#3D2E1F] mb-2">Yüklenen Görsel:</p>
                <img
                  src={uploadedFile}
                  alt="Yüklenen"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        )}

        {/* URL Tab */}
        {selectedTab === 'url' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#3D2E1F] mb-2">
                Görsel URL'si
              </label>
              <Input
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="border-[#EDE6DB] focus:border-[#8B6F47] focus:ring-[#8B6F47]"
              />
              <p className="text-xs text-[#9B8A7A] mt-2">
                💡 <strong>İpucu:</strong> Ücretsiz görseller için{' '}
                <a
                  href="https://unsplash.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8B6F47] hover:underline"
                >
                  Unsplash
                </a>
                {' '}veya{' '}
                <a
                  href="https://pexels.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8B6F47] hover:underline"
                >
                  Pexels
                </a>
                {' '}sitelerini kullanabilirsiniz. Görsele sağ tıklayıp "Görsel Adresini Kopyala" seçeneğini kullanın.
              </p>
            </div>
            
            {customUrl && (
              <div>
                <p className="text-sm font-medium text-[#3D2E1F] mb-2">Önizleme:</p>
                <img
                  src={customUrl}
                  alt="Önizleme"
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            <Button
              onClick={handleCustomUrl}
              disabled={!customUrl.trim()}
              className="w-full bg-[#8B6F47] hover:bg-[#6B5533] text-white"
            >
              URL'yi Kullan
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImagePicker;
