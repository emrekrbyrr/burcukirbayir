## Blog Senkronizasyonu Hakkında

**Durum:**
- Preview ortamı (teacher-burcu.preview.emergentagent.com) ve Production ortamı (burcukirbayir.com) farklı veritabanları kullanıyor
- Bu yüzden bloglar farklı görünüyor

**Çözümler:**

### Seçenek 1: Admin Panelden Manuel Blog Ekleme (Önerilen)
1. Production sitesinde admin paneline giriş yapın: `https://burcukirbayir.com/admin/login`
2. Şifre: `Kirbayir.12`
3. Admin panelde: `https://burcukirbayir.com/admin/findik`
4. Mevcut 5 blog yazısını manuel olarak ekleyin (kopyala-yapıştır)

### Seçenek 2: Blog İçe/Dışa Aktarma Özelliği
Eğer isterseniz bir "Export/Import" özelliği ekleyebilirim:
- Preview'deki blogları JSON olarak dışa aktarır
- Production'a JSON dosyasını yüklersiniz
- Otomatik olarak tüm bloglar eklenir

### Seçenek 3: Production Seed Script
Backend'den direkt production veritabanına blog eklemek için script çalıştırabilirsiniz.

**Hangi seçeneği tercih edersiniz?**
