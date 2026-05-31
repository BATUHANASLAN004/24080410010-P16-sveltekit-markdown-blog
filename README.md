# RB Blog — SvelteKit Premium FUI & AI Blog Engine

> **SvelteKit 2, Svelte 5, TailwindCSS 4, Supabase ve Google Gemini API ile güçlendirilmiş, Fütüristik Kullanıcı Arayüzü (FUI) konseptine sahip yeni nesil blog motoru.**

![Zorluk](https://img.shields.io/badge/Zorluk-Orta--Zor-orange)
![Puan](https://img.shields.io/badge/Puan-50-blue)
![Hafta](https://img.shields.io/badge/Hafta-2-gray)
![Lisans](https://img.shields.io/badge/License-MIT-green)
![Durum](https://img.shields.io/badge/Durum-Geliştirme%20Tamamlandı-brightgreen)

---

## 🎯 Özet

Sıradan, statik blog tasarımlarının ötesine geçerek kullanıcıya etkileşimli ve siber-punk temalı bir deneyim sunmayı amaçlayan bu proje; Svelte 5'in gücüyle yüksek performans sağlarken, arka planda Google Gemini 2.5 Flash API ile entegre bir yapay zeka asistanı (RB-AI) barındırır. Supabase ile tam kullanıcı yönetimi ve blog CRUD özellikleri sunar.

---

## 🎥 Demo

> Projeyi lokalde ayağa kaldırdıktan sonra `http://localhost:5173` üzerinden erişebilirsiniz.

### Ekran Görüntüleri

#### Ana Sayfa (Splash Sonrası — FUI Dashboard ile)
![Ana Sayfa](docs/screenshots/landing.png)

#### Giriş Sayfası
![Giriş](docs/screenshots/login.png)

#### Blog / Arama Sayfası
![Blog Listesi](docs/screenshots/crud_list.png)

#### Mobile Görünüm (390px)
![Mobil](docs/screenshots/mobile.png)

---

## ✨ Ana Özellikler

- ✅ **FUI Açılış Ekranı:** 4 saniyelik siber-grid ve glitch logolu splash screen
- ✅ **Özel Siber İmleç:** Sistem imleci gizli; yerine ses efektli cyan nokta + halka
- ✅ **Dinamik Temalar:** 3 FUI teması arası canlı geçiş (Neon Night / Deep Space / Retro Gold)
- ✅ **Matrix Easter Egg:** Gizli "G" tuşu ile Matrix yeşili modu
- ✅ **RB-AI Asistan:** Gemini 2.5 Flash destekli sağ-altta canlı chatbot
- ✅ **Siber Dashboard:** Sol-altta CPU/RAM simülasyonu ve BTC/ETH fiyat takibi
- ✅ **Supabase Auth:** Kayıt / Giriş / Korumalı Yazar Paneli
- ✅ **Blog CRUD:** Markdown ile yazı oluşturma, düzenleme, silme
- ✅ **Arama & Etiket:** `/search` ve `/tags` ile içerik filtreleme
- ✅ **Performanslı Altyapı:** SvelteKit SSR + Svelte 5 Runes mimarisi

---

## 🧰 Tech Stack

| Katman | Teknoloji |
|--------|-----------|
| **Framework** | SvelteKit 2.x + Svelte 5 |
| **Styling** | Tailwind CSS 4 |
| **AI API** | Google Gemini 2.5 Flash |
| **Backend / DB** | Supabase (PostgreSQL + Auth) |
| **Syntax Highlight** | Shiki |
| **Markdown** | MDsveX |

> Teknoloji seçimlerinin detaylı gerekçesi: [PROJE-RAPORU.md · Bölüm 7](PROJE-RAPORU.md#7-teknoloji-yığını-tech-stack)

---

## 🏗 Mimari

**Veri akışı:**
- Frontend etkileşimleri Svelte 5 Runes (`$state`, `$derived`) ile yönetilir
- Yapay zeka sorguları güvenli şekilde `src/routes/api/chat/+server.js` üzerinden Gemini API'ye aktarılır
- Supabase Auth ile oturum yönetimi `@supabase/ssr` ile SSR uyumlu kurulmuştur
- Sunucu tarafında anahtar yönetimi `$env/static/private` ile `.env` dosyasından okunur

[Detaylı mimari ve diyagramlar →](PROJE-RAPORU.md#8-sistem-mimarisi)

---

## 🚀 Kurulum

### Gereksinimler

- Node.js ≥ 20
- npm / pnpm / yarn
- Supabase Hesabı (ücretsiz tier yeterli)
- Google Gemini API Key (ücretsiz)

### Adım Adım

```bash
# 1) Repo klasörüne girin
cd repo

# 2) Environment dosyasını oluşturun
# Kök dizinde ".env" dosyası oluşturun:
# GEMINI_API_KEY=sizin_gemini_api_anahtariniz
# PUBLIC_SUPABASE_URL=sizin_supabase_url
# PUBLIC_SUPABASE_ANON_KEY=sizin_supabase_anon_key

# 3) Bağımlılıkları yükle
npm install

# 4) Geliştirme sunucusu
npm run dev

# 5) Projeye Erişim
# Tarayıcıda http://localhost:5173 adresini açın
```

---

## 🛣 Roadmap

- [x] V1 — MVP: FUI tasarım iskeleti, Svelte 5 mimarisi, Animasyonlar
- [x] V2 — RB-AI (Google Gemini) yapay zeka asistanı entegrasyonu
- [x] V3 — Supabase Auth + CRUD Blog Paneli
- [x] V4 — Arama, Etiket, İletişim, Bülten özellikleri
- [ ] V5 — WebSockets ile anlık kripto/borsa verilerinin canlı bağlantısı
- [ ] V6 — Yorum sistemi (Supabase Realtime)

---

## 📂 Proje Yapısı

```
24080410010-P16-sveltekit-markdown-blog/
├── repo/                    # SvelteKit uygulaması
│   ├── src/
│   │   ├── lib/components/  # FUI bileşenleri
│   │   ├── routes/          # Sayfalar ve API rotaları
│   │   └── posts/           # Markdown blog yazıları
│   └── static/              # Statik dosyalar
├── docs/screenshots/        # Proje ekran görüntüleri
├── PROJE-RAPORU.md          # Detaylı teknik rapor
└── README.md                # Bu dosya
```

---

## 🤝 Katkı

Bu proje **BMU1208 Web Tabanlı Programlama** dersi kapsamında **Bitlis Eren Üniversitesi** — **Bilgisayar Mühendisliği** bölümünde final ödevi olarak geliştirilmiştir.

Ders yürütücüsü: **Dr. Öğr. Üyesi Davut ARI**

---

## 📜 Lisans

MIT © 2026 **BATUHAN ASLAN** — Tam metin için [LICENSE](LICENSE).

---

## 🙋‍♂️ İletişim

| Alan | Bilgi |
|------|-------|
| **Öğrenci** | BATUHAN ASLAN |
| **Öğrenci No** | 24080410010 |
| **E-posta** | batu99964@gmail.com |
| **Ders** | BMU1208 · Web Tabanlı Programlama |
| **Kurum** | Bitlis Eren Üniversitesi — Mühendislik-Mimarlık Fakültesi |
