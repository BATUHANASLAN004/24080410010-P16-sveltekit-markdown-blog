# SvelteKit Markdown Blog (Premium FUI & AI)

> **Proje Kodu:** P16 · **Zorluk:** Orta-Zor · **Puan:** 50 · **Hafta:** 2

**Öğrenci:** BATUHAN ASLAN  
**Öğrenci No:** 24080410010  
**E-posta:** batu99964@gmail.com  
**Ders:** BMU1208 Web Tabanlı Programlama — *Dr. Öğr. Üyesi Davut ARI*  
**Kurum:** Bitlis Eren Üniversitesi — Mühendislik-Mimarlık Fakültesi — Bilgisayar Mühendisliği  
**Dönem:** 2025-2026 Bahar  

---

## İçindekiler

1. [Proje Künyesi](#1-proje-künyesi)
2. [Executive Summary](#2-executive-summary)
3. [Problem ve Motivasyon](#3-problem-ve-motivasyon)
4. [Hedef Kitle ve Persona](#4-hedef-kitle-ve-persona)
5. [Ürün Gereksinimleri (PRD)](#5-ürün-gereksinimleri-prd)
6. [Piyasa ve Rekabet Analizi](#6-piyasa-ve-rekabet-analizi)
7. [Teknoloji Yığını (Tech Stack)](#7-teknoloji-yığını-tech-stack)
8. [Sistem Mimarisi](#8-sistem-mimarisi)
9. [Veri Modeli ve API Tasarımı](#9-veri-modeli-ve-api-tasarımı)
10. [UI/UX Tasarımı](#10-uiux-tasarımı)
11. [Güvenlik, Performans, Test](#11-güvenlik-performans-test)

---

## 1. Proje Künyesi

| Alan | Değer |
|------|-------|
| Proje Adı | SvelteKit Premium FUI Blog Engine |
| Proje Kodu | P16 |
| Slogan | *Sıradan bir okuma deneyiminin ötesinde: Siber-uzayda interaktif bir bilgi ağı.* |
| Kategori | Blog / Content Management / AI SaaS |
| Hedef Platform | Web (Responsive) |
| Lisans | MIT |
| Durum | 🟢 Launched |

### Tech Stack Özeti

| Katman | Teknolojiler |
|--------|--------------|
| Framework | SvelteKit 2 + Svelte 5 |
| Styling | Tailwind CSS 4, Vanilla CSS |
| Etkileşim | Svelte Runes ($state, $derived) |
| AI API | Google Gemini 2.5 Flash |

---

## 2. Executive Summary

### 2.1 Ne Yapıyoruz?
RB Blog, klasik, statik ve tekdüze blog tasarımlarına karşı geliştirilmiş; FUI (Futuristic UI) estetiği ile harmanlanmış, SvelteKit destekli modern bir blog motorudur. Kullanıcılarına sadece metin okutmayı değil, entegre yapay zeka asistanı (RB-AI) ile siber bir evrende etkileşimli bir deneyim yaşatmayı amaçlar.

### 2.2 Neden Şimdi?
Modern web kullanıcıları artık standart sayfalar görmek istemiyor. Ziyaretçilerin dikkat süresi giderek kısalırken, etkileşimli, mikro-animasyonlara sahip ve yapay zeka ile desteklenmiş arayüzler kullanıcıyı içeride tutmanın en büyük anahtarı haline gelmiştir.

---

## 3. Problem ve Motivasyon

### 3.1 Hangi Probleme Çözüm Getiriyoruz?
Günümüzde blog platformları birbirinin kopyası haline gelmiştir. Okuyucu sadece metne odaklanmakta ve etkileşim eksikliğinden dolayı sayfadan çabuk ayrılmaktadır. İçeriği destekleyen dinamik yapılar ve yapay zeka destekli okuma asistanları eksiktir.

### 3.2 Bizim Diferansiyasyonumuz
1. **FUI (Futuristic UI) Estetiği:** Kullanıcıyı karşılayan Matrix ve Siber-Grid temalı giriş.
2. **Gerçek Zamanlı Yapay Zeka:** Ziyaretçiler okudukları içerik hakkında sağ alt köşedeki RB-AI (Google Gemini) ile canlı sohbet edebilir.
3. **Mükemmel Performans:** Svelte 5'in derleme zamanındaki (build-time) optimizasyonu sayesinde devasa framework yükleri olmadan milisaniyelik tepki süreleri.

---

## 4. Hedef Kitle ve Persona

### 4.1 Birincil Segment
Teknoloji meraklıları, yazılımcılar, siber-güvenlik uzmanları ve fütüristik tasarımlara ilgi duyan Z ve Y kuşağı okuyucular.

### 4.2 Persona: "Cyber Coder"
- **Yaş:** 20-35
- **Rol:** Yazılım Geliştirici / Meraklı Öğrenci
- **Pain Points:** Sıkıcı eğitim materyalleri, statik dokümantasyonlar, sorduğu soruya anında cevap bulamama.
- **Beklenti:** Havalı bir tasarım, hızlı çalışan bir altyapı ve içeriği okurken kafasına takılanı sorabileceği bir asistan.

---

## 5. Ürün Gereksinimleri (PRD)

### 5.1 Kapsam (In-Scope - MVP)
1. Animasyonlu ve glitche efektli açılış (Splash) ekranı.
2. FUI konseptine uygun, custom cursor ve sesli hover efektleri içeren navigasyon.
3. 3 farklı temada dinamik değişim (Neon Night, Deep Space, Retro Gold).
4. Google Gemini API entegrasyonu ile RB-AI chatbot.
5. SvelteKit sunucu (backend) API rotalarının güvenli kurulumu.

### 5.2 Fonksiyonel Gereksinimler
- **FR-01:** Kullanıcı ana sayfaya girdiğinde, arkaplanda fütüristik logolar ve sistem başlama animasyonu izlemelidir.
- **FR-02:** Kullanıcı "SWAP_THEME" butonuna tıklayarak uygulamanın genel renk paletini canlı olarak değiştirebilmelidir.
- **FR-03:** Kullanıcı RB-AI asistanına metin gönderdiğinde, SvelteKit backend'i Gemini API'sine güvenli istek atmalı ve dönen cevabı arayüze basmalıdır.

---

## 7. Teknoloji Yığını (Tech Stack)

### 7.1 SvelteKit 2 & Svelte 5
- **Ne?** Reaktif web uygulamaları geliştirmek için kullanılan framework.
- **Neden Seçildi:** Virtual DOM kullanmaması ve kodları build aşamasında Vanilla JS'e dönüştürmesi sayesinde rakiplerine göre inanılmaz hızlıdır. Svelte 5 ile gelen `Runes` mimarisi state yönetimini mükemmelleştirmiştir.

### 7.2 TailwindCSS 4
- **Ne?** Utility-first CSS framework.
- **Neden Seçildi:** FUI tasarımında çok fazla custom gölge (glow), degrade (gradient) ve geçiş olduğu için klasik CSS dosyaları yerine HTML içinde hızlıca stillendirme yapmak için tercih edilmiştir.

### 7.3 Google Gemini 2.5 Flash API
- **Ne?** Google'ın en yeni ve en hızlı dil modeli API'si.
- **Neden Seçildi:** OpenAI'a kıyasla metin oluşturma hızı siber asistan konsepti için daha uygundur ve SvelteKit API rotaları üzerinden Node.js `fetch` ile çok kolay entegre edilir.

---

## 8. Sistem Mimarisi

### 8.1 Veri Akışı
1. Ziyaretçi tarayıcıdan (`Client`) giriş yapar.
2. SvelteKit `+layout.svelte` genel iskeleti ve `Header` bileşenini sunar.
3. Kullanıcı RB-AI'a bir mesaj yazar. İstek `Client`'tan `Server`'a (`/api/chat/+server.js`) gider.
4. Server, `.env` içerisindeki gizli API anahtarı ile Google Cloud'a (Gemini) bağlanır, cevabı alıp tekrar `Client`'a iletir.

---

## 10. UI/UX Tasarımı

### 10.1 Konsept
Uygulamanın genelinde karanlık arkaplan üzerine parlayan neon renkler (cyan, mor, yeşil) kullanılmıştır. Standart fare imleci gizlenmiş, yerine sayfa üzerindeki etkileşimli alanlarda büyüyen ve ses çıkartan "Siber İmleç" tasarlanmıştır.

### 10.2 Micro-Interactions (Mikro Etkileşimler)
- Tıklama ve hover durumlarında `playTechSound` fonksiyonu ile kısa siber-bip sesleri çıkarılır.
- Uygulama yüklendiğinde `scale`, `fade` ve `fly` Svelte geçiş (transition) animasyonları çalışır.
- Gizli "G" (Matrix) tuşuna basıldığında arkaplan anında Matrix yeşiline bürünür.

---

## 11. Güvenlik, Performans, Test

- **API Gizliliği:** Gemini API anahtarı kesinlikle Frontend'e (istemciye) gönderilmez. SvelteKit `$env/static/private` ile sadece backend (`+server.js`) üzerinde tutulur.
- **Performans:** SSR (Server-Side Rendering) ile sayfa ilk yüklemesinde SEO dostu olarak gelir. Görseller ve script'ler SvelteKit'in optimizasyon motorundan geçer.
