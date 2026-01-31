from datetime import datetime, timezone
import uuid
from typing import Callable, Optional

BASE_BLOG_POSTS = [
    {
        "title": "PYP Programında Öğrenci Merkezli Öğrenmenin Gücü",
        "excerpt": "Nesibe Aydın Okulları'nda PYP programını uygularken öğrencilerin nasıl öğrenmenin öznesi haline geldiklerini ve bu süreçte edindiğim deneyimleri paylaşıyorum.",
        "content": """Nesibe Aydın Okulları'nda PYP (Primary Years Programme) programını uygulamaya başladığımda, geleneksel öğretim yöntemlerinden ne kadar uzaklaştığımızı fark ettim. PYP, öğrencileri pasif bilgi alıcıları olmaktan çıkarıp, aktif sorgulayıcılar haline getiriyor.

Sınıfımda uyguladığım sorgulama temelli öğrenme yaklaşımında, öğrenciler kendi meraklarını keşfediyor ve sorular soruyorlar. Örneğin, "Canlılar" ünitesinde bir öğrencim "Neden bazı bitkiler çölde yaşayabilir?" diye sorduğunda, bu soruyu tüm sınıfla birlikte araştırmaya dönüştürdük.

## PYP'nin Temel İlkeleri

1. **Sorgulamaya Dayalı Öğrenme**: Öğrenciler kendi sorularını sorar ve cevaplarını ararlar.
2. **Kavramsal Anlayış**: Ezberden ziyade derin anlayış hedeflenir.
3. **Uluslararası Bakış Açısı**: Farklı kültürlere ve perspektiflere açık bireyler yetiştirme.

Sonuç olarak, PYP programı sadece akademik başarıyı değil, aynı zamanda eleştirel düşünme, iletişim ve sosyal becerileri de geliştiriyor. Öğrencilerimin her gün daha meraklı, daha sorgulayıcı ve daha özgüvenli hale geldiklerini görmek, bu yaklaşımın ne kadar değerli olduğunu gösteriyor.""",
        "category": "PYP",
        "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
        "date": "10 Mart 2024"
    },
    {
        "title": "Drama Etkinlikleri ile Sosyal Becerilerin Gelişimi",
        "excerpt": "Sınıfımda uyguladığım drama etkinliklerinin çocukların kendilerini ifade etme, empati kurma ve özgüven kazanma becerilerine nasıl katkı sağladığını paylaşıyorum.",
        "content": """Drama, çocukların dünyasında büyülü bir araç. Nesibe Aydın Okulları'nda yürüttüğüm drama etkinlikleri, öğrencilerimin sadece sahnede değil, hayatın her alanında daha güçlü bireyler olmalarını sağlıyor.

Her hafta Salı günleri, sınıfımızı bir tiyatro sahnesine dönüştürüyoruz. Öğrenciler farklı karakterlere bürünüyor, duygularını keşfediyor ve kendilerini özgürce ifade ediyorlar.

## Drama Etkinliklerinin Faydaları

**Özgüven Gelişimi**: Başlangıçta çekingen olan öğrencilerim, drama sayesinde grup önünde konuşmaktan korkmaz hale geliyorlar. 6 yaşındaki bir öğrencim, ilk drama etkinliğinde tek kelime edemezken, şimdi mini gösterilerde başrol oynuyor.

**Empati Kurma**: Farklı karakterleri canlandırırken, öğrenciler başkalarının duygularını anlamayı öğreniyorlar. "Yalnız Kalan Çocuk" senaryosunda, izolasyon duygusunu deneyimleyen öğrencilerim, arkadaşlarına karşı daha anlayışlı olmaya başladılar.

**İletişim Becerileri**: Drama, sadece konuşma becerisi değil, aynı zamanda beden dili ve mimiklerle iletişim kurma yeteneğini de geliştiriyor.

Yeşilyurt Açı Koleji'ndeki deneyimlerimde de drama etkinliklerinin öğrencilerin derse katılımını %80 oranında artırdığını gözlemledim. Çocuklar oyun oynarken öğreniyor, öğrenirken eğleniyorlar.""",
        "category": "Drama",
        "image": "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=800",
        "date": "5 Mart 2024"
    },
    {
        "title": "Yapay Zeka Araçlarını Sınıfta Etkili Kullanma",
        "excerpt": "Yapay zeka ve Web 2.0 araçlarını derslerime nasıl entegre ettiğimi ve bu teknolojilerin öğrenme deneyimini nasıl zenginleştirdiğini anlatıyorum.",
        "content": """21. yüzyılda öğretmenlik yapmak, teknolojiye ayak uydurmayı gerektiriyor. Ben de yapay zeka ve Web 2.0 araçlarını sınıfımda aktif olarak kullanarak, öğrencilerime modern öğrenme deneyimleri sunuyorum.

## Kullandığım Yapay Zeka Araçları

**Canva**: Görsel tasarım projeleri için öğrencilerimle birlikte kullanıyoruz. Çocuklar kendi posterlerini, sunumlarını tasarlayarak yaratıcılıklarını geliştiriyorlar.

**Kahoot ve Quizizz**: Oyunlaştırılmış değerlendirme araçları. Sınavlar artık stresli değil, eğlenceli! Öğrenciler yarışarak öğreniyorlar.

**AI Hikaye Oluşturucular**: Türkçe derslerinde, öğrencilerle birlikte AI destekli hikayeler oluşturuyoruz. Bu, onların hayal güçlerini tetikliyor.

**Google Classroom & Padlet**: Ödev takibi ve işbirlikli çalışmalar için vazgeçilmezlerim.

## Teknoloji Entegrasyonunda Dikkat Ettiklerim

1. **Dengeli Kullanım**: Teknoloji bir araç, amaç değil. Her ders teknoloji kullanımı gerektirmez.
2. **Dijital Okuryazarlık**: Öğrencilere teknolojiyi güvenli ve etik kullanmayı öğretiyorum.
3. **Erişilebilirlik**: Her öğrencinin teknolojiye eşit erişimi olmasını sağlıyorum.

Yeşilyurt Açı Koleji'nde interaktif akıllı tahta uygulamalarıyla başlattığım teknoloji yolculuğum, şimdi yapay zeka destekli öğrenme deneyimlerine evrildi. Öğrencilerim artık sadece bilgi tüketicileri değil, teknoloji ile birlikte içerik üreticileri.""",
        "category": "Teknoloji",
        "image": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800",
        "date": "28 Şubat 2024"
    },
    {
        "title": "Oyunlaştırma ile Öğrenme Motivasyonunu Artırma",
        "excerpt": "Oyunlaştırılmış öğretim yöntemlerinin öğrencilerin derse katılımını ve öğrenme motivasyonunu nasıl artırdığını deneyimlerimle paylaşıyorum.",
        "content": """Çocuklar oyun oynarken en mutlu oldukları ve en çok öğrendikleri anları yaşıyorlar. Ben de bu gerçekten yola çıkarak, derslerimi oyunlaştırdım ve sonuçlar inanılmaz oldu!

## Oyunlaştırma Nedir?

Oyunlaştırma, oyun tasarım öğelerini eğitim ortamına entegre etmektir. Puanlar, rozetler, seviyeler ve liderlik tabloları gibi unsurlar, öğrencilerin motivasyonunu artırır.

## Sınıfımda Uyguladığım Oyunlaştırma Teknikleri

**Puan Sistemi**: Her tamamlanan görev için öğrenciler puan kazanıyor. Bu puanlarla "Sınıf Mağazası"ndan ödüller alabiliyorlar.

**Rozet Sistemi**: "Matematik Ustası", "Okuma Şampiyonu", "İşbirliği Kahramanı" gibi rozetler, öğrencilerin farklı becerilerde başarılı olmalarını teşvik ediyor.

**Hikaye Anlatımı**: Her ünitenin bir hikayesi var. Öğrenciler, görevleri tamamlayarak hikayenin kahramanlarına yardım ediyorlar.

**Grup Rekabeti**: Takımlar halinde çalışan öğrenciler, işbirliği içinde görevleri tamamlayarak puan kazanıyorlar.

## Sonuçlar

Yeşilyurt Açı Koleji'nde oyunlaştırmayı uygulamaya başladığımda, öğrencilerin derse katılım oranı %85'e ulaştı. Y.Ö.M İlkokulu'ndaki ilk yılımda da benzer teknikler kullandım ve öğrencilerin ödev tamamlama oranının %60'tan %95'e yükseldiğini gördüm.

Oyunlaştırma, öğrenmeyi eğlenceli hale getirirken, aynı zamanda öğrencilerin problem çözme, eleştirel düşünme ve işbirliği becerilerini de geliştiriyor.""",
        "category": "Eğitim Yöntemleri",
        "image": "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800",
        "date": "20 Şubat 2024"
    },
    {
        "title": "İlk Yıl Deneyimlerim: Y.Ö.M İlkokulu'nda Öğrendiklerim",
        "excerpt": "Öğretmenlik kariyerimin ilk yılında Y.Ö.M İlkokulu'nda edindiğim deneyimleri ve bu süreçte karşılaştığım zorlukları nasıl aştığımı anlatıyorum.",
        "content": """2021 yılında Marmara Üniversitesi'nden mezun olduktan sonra, öğretmenlik kariyerimin ilk adımını Y.Ö.M İlkokulu'nda attım. Bu bir yıl, benim için hem zorlu hem de öğretici bir deneyimdi.

## İlk Günler

İlk günümde 25 öğrencili bir 2. sınıfa girdim. Heyecanlı, biraz da korkmuştum. Teoride öğrendiğim her şeyi pratiğe dökmek düşündüğümden çok daha zordu.

## Karşılaştığım Zorluklar

**Sınıf Yönetimi**: İlk aylarımda sınıfı kontrol altında tutmakta zorlandım. Öğrenciler bazen çok hareketli oluyordu ve dikkatlerini toplamak zaman alıyordu.

**Farklı Öğrenme Hızları**: Her öğrencinin farklı bir öğrenme hızı olduğunu fark ettim. Bazıları çok hızlı kavrarken, bazılarına daha fazla destek gerekiyordu.

**Veli İletişimi**: Velilerle etkili iletişim kurmayı öğrenmem gerekti. Her velinin beklentileri ve kaygıları farklıydı.

## Çözümler ve Öğrendiklerim

**Pozitif Disiplin**: Ceza yerine ödül sistemine geçtim. Olumlu davranışları pekiştirmek, olumsuz davranışları azalttı.

**Farklılaştırılmış Öğretim**: Her öğrencinin ihtiyacına uygun materyaller hazırlamaya başladım. Grup çalışmaları ve birebir destekler işe yaradı.

**Düzenli Veli Toplantıları**: Aylık veli toplantıları düzenleyerek, velilerle işbirliği içinde çalıştım.

## Unutulmaz Anlar

En unutulmaz anım, okuma yazma öğrenemeyen bir öğrencimin, yoğun çalışmalarımız sonucunda ilk kitabını okuduğu andı. Gözlerindeki mutluluk, bana öğretmenliğin ne kadar değerli bir meslek olduğunu hatırlattı.

Y.Ö.M İlkokulu'ndaki bu bir yıl, bana sadece öğretmenliği değil, aynı zamanda sabırlı olmayı, empati kurmayı ve her gün öğrenmeye devam etmeyi öğretti. Bu deneyimler, bugünkü başarılı öğretmen olmamın temelini oluşturdu.""",
        "category": "Deneyimler",
        "image": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800",
        "date": "15 Şubat 2024"
    }
]


def build_seed_posts(generate_slug: Optional[Callable[[str], str]] = None):
    posts = []
    for base_post in BASE_BLOG_POSTS:
        now = datetime.now(timezone.utc).isoformat()
        post = {
            "id": str(uuid.uuid4()),
            **base_post,
            "created_at": now,
            "updated_at": now
        }
        if generate_slug:
            post["slug"] = generate_slug(base_post["title"])
        posts.append(post)
    return posts
