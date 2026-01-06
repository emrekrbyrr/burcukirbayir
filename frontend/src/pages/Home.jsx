import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MapPin, BookOpen, Users, Award, Star, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from '../hooks/use-toast';
import axios from 'axios';
import {
  teacherInfo,
  experiences,
  teachingApproaches,
  testimonials,
  privateLessons
} from '../mock';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const API = `${BACKEND_URL}/api`;

const getApproachIcon = (iconName) => {
  const iconMap = {
    theater: Users,
    globe: Award,
    brain: BookOpen,
    gamepad: Calendar
  };
  const IconComponent = iconMap[iconName] || BookOpen;
  return <IconComponent className="w-6 h-6" />;
};

const Home = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get(`${API}/blog`);
      setBlogPosts(response.data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const handleBlogClick = (post) => {
    // Use slug for SEO-friendly URLs if available, fallback to ID
    const urlParam = post.slug || post.id;
    navigate(`/blog/${urlParam}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-[#EDE6DB] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-[#3D2E1F] tracking-tight">{teacherInfo.name}</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#hakkimda" className="text-[#6B5545] hover:text-[#3D2E1F] transition-colors text-sm font-medium">Hakkımda</a>
              <a href="#yaklasim" className="text-[#6B5545] hover:text-[#3D2E1F] transition-colors text-sm font-medium">Öğretim Yaklaşımım</a>
              <a href="#blog" className="text-[#6B5545] hover:text-[#3D2E1F] transition-colors text-sm font-medium">Blog</a>
              <a href="#deneyim" className="text-[#6B5545] hover:text-[#3D2E1F] transition-colors text-sm font-medium">Deneyimlerim</a>
              <a href="#iletisim" className="text-[#6B5545] hover:text-[#3D2E1F] transition-colors text-sm font-medium">İletişim</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F0E8] to-[#FAF8F3]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-[#C4996B]/10 rounded-full">
                <span className="text-[#8B6F47] text-sm font-medium">{teacherInfo.title}</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#3D2E1F] leading-tight">
                Eğitimde Yenilikçi ve
                <span className="block text-[#8B6F47] mt-2">İlham Verici Bir Yolculuk</span>
              </h2>
              <p className="text-lg text-[#6B5545] leading-relaxed">
                {teacherInfo.bio}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => document.getElementById('iletisim').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#8B6F47] hover:bg-[#6B5533] text-white rounded-lg px-6 py-6 text-base"
                >
                  İletişime Geçin
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => document.getElementById('deneyim').scrollIntoView({ behavior: 'smooth' })}
                  className="border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47]/5 rounded-lg px-6 py-6 text-base"
                >
                  Deneyimlerimi Keşfedin
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/8613059/pexels-photo-8613059.jpeg"
                  alt="İlkokul öğrencileri sınıf ortamı"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#C4996B] rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-[#8B6F47] rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="hakkimda" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://customer-assets.emergentagent.com/job_teacher-burcu/artifacts/gynxrrxx_profilarkaplanburcu.png"
                alt="Burcu Kırbayır"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold text-[#3D2E1F]">Hakkımda</h3>
              <div className="space-y-4 text-[#6B5545] leading-relaxed">
                <p>
                  Merhaba! Ben Burcu Öğretmen. Marmara Üniversitesi - Sınıf Öğretmenliği bölümünden 2021 yılında mezun oldum. Eğitim dünyasında tutkuyla çalışan bir sınıf öğretmeniyim. Kitap okumak, yazmak, çizmek; doğada zaman geçirip kamp yapmak vazgeçilmezlerim arasında. Bu yaşantılarımda edindiğim deneyimleri çocuklarla paylaşabilmek ise benim için çok kıymetli.
                </p>
                <p>
                  İstanbul ve Kocaeli'deki farklı okullarda görev yaparak, yolumun kesiştiği her çocuğun hayatına dokunmayı hedefledim. Şu anda Kocaeli Nesibe Aydın Okulları'nda İB-PYP uygulaması ile öğrencilerime rehberlik ediyorum.
                </p>
                <p>
                  Her çocuğun eşsiz olduğuna ve kendi hızında öğrendiğine inanıyorum. Bu sebeple derslerimde disiplinlerüstü yaklaşımı ele alarak teknoloji ve oyunlaştırma yöntemlerini harmanlayıp öğrencilerimin öğrenmenin tadını çıkarmalarını sağlıyorum. Ben de her gün onlardan yeni şeyler öğrenerek kendi öğrenme yolculuğumu sürdürüyorum.
                </p>
              </div>
              <div className="pt-4">
                <div className="inline-flex items-center gap-2 text-[#8B6F47] font-medium">
                  <Award className="w-5 h-5" />
                  <span>{teacherInfo.education}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Approach Section */}
      <section id="yaklasim" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-[#3D2E1F] mb-4">Öğretim Yaklaşımım</h3>
            <p className="text-lg text-[#6B5545] max-w-2xl mx-auto">
              Modern eğitim yöntemleriyle çocukların potansiyelini ortaya çıkarıyorum
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachingApproaches.map((approach) => (
              <Card key={approach.id} className="border-[#EDE6DB] hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-[#FAF8F3]">
                <CardHeader>
                  <div className="w-14 h-14 bg-[#8B6F47] rounded-xl flex items-center justify-center text-white mb-4">
                    {getApproachIcon(approach.icon)}
                  </div>
                  <CardTitle className="text-xl text-[#3D2E1F]">{approach.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#6B5545] leading-relaxed">{approach.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-[#3D2E1F] mb-4">Blog</h3>
            <p className="text-lg text-[#6B5545] max-w-2xl mx-auto">
              Eğitim dünyasından yazılar ve deneyimlerim
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="border-[#EDE6DB] overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#8B6F47] text-white text-xs px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-[#9B8A7A] text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <CardTitle className="text-xl text-[#3D2E1F] group-hover:text-[#8B6F47] transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#6B5545] leading-relaxed">{post.excerpt}</p>
                  <button 
                    onClick={() => handleBlogClick(post)}
                    className="mt-4 text-[#8B6F47] font-medium hover:gap-3 flex items-center gap-2 transition-all"
                  >
                    Devamını Oku
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="yorumlar" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-[#3D2E1F] mb-4">Veli Yorumları</h3>
            <p className="text-lg text-[#6B5545] max-w-2xl mx-auto">
              Ailelerden gelen geri bildirimler
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-[#EDE6DB] bg-[#FAF8F3] hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-[#3D2E1F]">{testimonial.name}</CardTitle>
                      <CardDescription className="text-[#9B8A7A]">{testimonial.role}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#C4996B] text-[#C4996B]" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[#6B5545] leading-relaxed italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Private Lessons Section */}
      <section id="ozel-dersler" className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h3 className="text-3xl lg:text-4xl font-bold text-[#3D2E1F]">{privateLessons.title}</h3>
              <p className="text-lg text-[#6B5545] leading-relaxed">
                {privateLessons.description}
              </p>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-[#3D2E1F]">Özellikler:</h4>
                <div className="grid gap-3">
                  {privateLessons.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#8B6F47] rounded-full"></div>
                      <span className="text-[#6B5545]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-[#3D2E1F]">Dersler:</h4>
                <div className="flex flex-wrap gap-3">
                  {privateLessons.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white rounded-lg text-[#6B5545] border border-[#EDE6DB]"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                onClick={() => document.getElementById('iletisim').scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#8B6F47] hover:bg-[#6B5533] text-white rounded-lg px-6 py-6 text-base"
              >
                İletişime Geçin
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1588072432836-e10032774350"
                alt="Özel ders"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="deneyim" className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-[#3D2E1F] mb-4">Deneyimlerim</h3>
            <p className="text-lg text-[#6B5545] max-w-2xl mx-auto">
              Farklı eğitim kurumlarında edindiğim değerli deneyimler
            </p>
          </div>
          <div className="space-y-8 max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <Card key={exp.id} className="border-[#EDE6DB] hover:shadow-lg transition-shadow duration-300 bg-white">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl text-[#3D2E1F]">{exp.school}</CardTitle>
                      <CardDescription className="text-[#9B8A7A] flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </CardDescription>
                    </div>
                    <div className="text-[#8B6F47] font-semibold bg-[#C4996B]/10 px-4 py-2 rounded-lg text-sm">
                      {exp.year}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[#3D2E1F] font-medium mb-2">{exp.position}</p>
                  <p className="text-[#6B5545] leading-relaxed">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="iletisim" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-[#3D2E1F] mb-4">İletişim</h3>
            <p className="text-lg text-[#6B5545] max-w-2xl mx-auto">
              Benimle iletişime geçmek için e-posta adresimi kullanabilirsiniz
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <Card className="border-[#EDE6DB] bg-[#FAF8F3]">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#8B6F47] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#3D2E1F] mb-2">E-posta</h4>
                      <a href={`mailto:${teacherInfo.email}`} className="text-[#6B5545] hover:text-[#8B6F47] transition-colors break-all">
                        {teacherInfo.email}
                      </a>
                      <p className="text-sm text-[#9B8A7A] mt-3">
                        Özel ders, eğitim danışmanlığı veya diğer sorularınız için bana e-posta gönderebilirsiniz.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="relative rounded-2xl overflow-hidden h-64 md:h-auto">
                <img
                  src="https://customer-assets.emergentagent.com/job_teacher-burcu/artifacts/a0fql3yb_burcusinifta.jpeg"
                  alt="Burcu Kırbayır"
                  className="w-full h-full object-cover shadow-xl rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3D2E1F] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">{teacherInfo.name}</h4>
              <p className="text-[#C4996B] text-sm">{teacherInfo.title}</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Hızlı Linkler</h5>
              <div className="space-y-2">
                <a href="#hakkimda" className="block text-[#C4996B] hover:text-white transition-colors text-sm">Hakkımda</a>
                <a href="#deneyim" className="block text-[#C4996B] hover:text-white transition-colors text-sm">Deneyimlerim</a>
                <a href="#blog" className="block text-[#C4996B] hover:text-white transition-colors text-sm">Blog</a>
                <a href="#iletisim" className="block text-[#C4996B] hover:text-white transition-colors text-sm">İletişim</a>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">İletişim</h5>
              <div className="space-y-2 text-sm">
                <p className="text-[#C4996B] break-all">{teacherInfo.email}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-[#6B5545] pt-8 text-center">
            <p className="text-[#C4996B] text-sm">
              © 2024 {teacherInfo.name}. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;