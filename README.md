# RB Blog - Premium FUI & AI-Powered Blog Engine

> **SvelteKit, TailwindCSS ve Google Gemini API ile güçlendirilmiş, Fütüristik Kullanıcı Arayüzü (FUI) konseptine sahip yeni nesil blog motoru.**

![Zorluk](https://img.shields.io/badge/Zorluk-Orta--Zor-orange)
![Puan](https://img.shields.io/badge/Puan-50-blue)
![Hafta](https://img.shields.io/badge/Hafta-2-gray)
![Lisans](https://img.shields.io/badge/License-MIT-green)
![Durum](https://img.shields.io/badge/Durum-Development-yellow)

## 🎯 Özet

Sıradan, statik blog tasarımlarının ötesine geçerek kullanıcıya etkileşimli ve siber-punk temalı bir deneyim sunmayı amaçlayan bu proje; Svelte 5'in gücüyle yüksek performans sağlarken, arka planda Google Gemini 2.5 Flash API ile entegre bir yapay zeka asistanı (RB-AI) barındırır.

## 🎥 Demo

> Projeyi lokalde ayağa kaldırdıktan sonra `http://localhost:5173` üzerinden erişebilirsiniz.

### Ekran Görüntüleri

| Animasyonlu Giriş | Tema Değişimi | RB-AI Asistanı |
|---------|-----------|--------|
| *(Siber-Grid ve Matrix Modu)* | *(Neon Night / Deep Space)* | *(Gerçek Zamanlı AI Sohbeti)* |

## ✨ Ana Özellikler

- ✅ **Siber-Punk FUI Arayüz:** Custom cursor, interaktif grid, dinamik arkaplan animasyonları.
- ✅ **RB-AI Asistan:** Google Gemini 2.5 Flash destekli canlı blog asistanı.
- ✅ **Dinamik Temalar:** 3 farklı FUI teması arasında anında geçiş (Neon Night, Deep Space, Retro Gold).
- ✅ **Matrix Modu:** Gizli kısayol ("G" tuşu) ile aktifleşen easter-egg arayüz.
- ✅ **Performans İzleme:** Sol altta CPU, RAM ve Kripto paraların (ETH, BTC) simüle edilmiş/canlı dashboard'u.
- ✅ **Modern Altyapı:** SvelteKit 2 ve Svelte 5 (Runes mimarisi).

## 🧰 Tech Stack

**Framework:** `SvelteKit 2.x` + `Svelte 5`  
**Styling:** `Tailwind CSS 4`  
**AI API:** `Google Gemini API (gemini-2.5-flash)`  
**Syntax Highlight:** `Shiki`  

> Teknoloji seçimlerinin detaylı gerekçesi: [PROJE-RAPORU.md · Bölüm 7](PROJE-RAPORU.md#7-teknoloji-yığını-tech-stack)

## 🏗 Mimari

**Veri akışı:** 
- Frontend tarafındaki etkileşimler Svelte 5 rune'ları (`$state`, `$derived`) ile yönetilir.
- Yapay zeka sorguları güvenli bir şekilde `src/routes/api/chat/+server.js` üzerinden Gemini API'ye aktarılır.
- Sunucu tarafında anahtar yönetimi `$env/static/private` ile `.env` dosyasından okunur.

[Detaylı mimari ve ADR'lar →](PROJE-RAPORU.md#8-sistem-mimarisi)

## 🚀 Kurulum

### Gereksinimler

- Node.js ≥ 20
- npm / pnpm / yarn

### Adım Adım

```bash
# 1) Repo içerisine girin
cd repo

# 2) Environment dosyasını oluşturun
# Kök dizinde ".env" dosyası oluşturun ve içerisine aşağıdaki değişkeni ekleyin:
# GEMINI_API_KEY=sizin_gemini_api_anahtariniz

# 3) Bağımlılıkları yükle
npm install

# 4) Geliştirme sunucusu
npm run dev

# 5) Projeye Erişim
# Tarayıcıda http://localhost:5173 adresini açın
```

## 🛣 Roadmap

- [x] V1 — MVP: FUI tasarım iskeleti, Svelte 5 mimarisi, Animasyonlar
- [x] V2 — RB-AI (Google Gemini) yapay zeka asistanı entegrasyonu
- [ ] V3 — WebSockets ile anlık kripto/borsa verilerinin dashboard'a aktarımı
- [ ] V4 — Markdown (MDX) tabanlı tam otomatik makale/blog altyapısı

## 🤝 Katkı

Bu proje **BMU1208 Web Tabanlı Programlama** dersi kapsamında **Bitlis Eren Üniversitesi** — **Bilgisayar Mühendisliği** bölümünde bir final ödevi olarak geliştirilmiştir.

Ders yürütücüsü: **Dr. Öğr. Üyesi Davut ARI**

## 📜 Lisans

MIT © 2026 **BATUHAN ASLAN** — Tam metin için [LICENSE](LICENSE).

## 🙋‍♂️ İletişim

- **Öğrenci:** BATUHAN ASLAN
- **Öğrenci No:** 24080410010
- **E-posta:** batu99964@gmail.com
- **Ders:** BMU1208 · Web Tabanlı Programlama
- **Kurum:** Bitlis Eren Üniversitesi — Mühendislik-Mimarlık Fakültesi
