# PocketPet 🐾

PocketPet, React Native ve Expo kullanılarak geliştirilmiş, Tamagotchi tarzı dijital evcil hayvan besleme uygulamasıdır. İçerisindeki gamification (oyunlaştırma) özellikleriyle günlük olarak sanal dostunuzla ilgilenmenizi ve aynı zamanda keyifli bir deneyim yaşamanızı sağlar.

## Özellikler

- **Evcil Hayvan Yönetimi:** Açlık, Mutluluk ve Enerji durumlarının yönetimi. Evcil hayvan değerleri zamanla (1 dakikada bir) azalır.
- **Oyunlaştırma (Gamification):** 
  - Besleme, oyun oynama ve uyutma aksiyonları sonucunda XP kazanımı ve Seviye Atalama.
  - Hedeflere ulaşıldığında (İlk Beslenme, Mutluluk Ustası, Seviye 5 vb.) kazanılan rozetler ve Badges Koleksiyonu ekranı.
  - Evcil hayvanın durumuna göre değişen duygu durumu, ikon ve sağlık durumu. Düştüğünde veya iyileştiğinde arka plan renk değişimleri ve uyarılar.
- **Animasyonlar:** Aksiyon butonlarına tıklandığında çıkan dinamik (yükselen yazı) bildirimler ve yüzen (bounce) evcil hayvan animasyonu.
- **Kalıcı Veri (Persistence):** AsyncStorage entegrasyonu sayesinde uygulamadan çıksanız bile dostunuzun bilgileri ve durumu kaydedilir, zamanla enerji ve açlık kayıpları arka planda süreye göre hesaplanıp uygulanır.

## Kurulum ve Çalıştırma

**Gereksinimler:** `Node.js` ve telefonunuzda `Expo Go` uygulaması.

1. Depoyu klonlayın:
   ```bash
   git clone <REPO_URL>
   cd pocket-pet
   ```

2. Paketleri yükleyin:
   ```bash
   npm install
   ```

3. Uygulamayı başlatın:
   ```bash
   npx expo start
   ```

> Açılan terminalde, telefonunuzdaki Expo Go uygulamasıyla QR kodu okutabilir veya `a` / `i` tuşlarına basarak Android/iOS emülatörlerini çalıştırabilirsiniz.

## Ekran Görüntüleri ve Bağlantılar

- **APK İndirme Linki:** *(Buraya APK eklenecek)*
- **YouTube Tanıtım Videosu:** *(Buraya video linki eklenecek)*

---
*Clean Code prensiplerine uygun olarak TypeScript ve modern React konseptleri ile geliştirilmiştir.*
