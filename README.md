# Live Browser & Terminal AI Assistant

GitHub ve Vercel üzerinde %100 ücretsiz (Free Tier) altyapı ile barındırılan, tam otonom bir **Canlı Tarayıcı ve Terminal Yapay Zeka Asistanı** sistemi.

## 🎯 Proje Özeti

Sistem, geleneksel ekran görüntüsü (snapshot) alan statık botların aksine; kullanıcının web arayüzü üzerinden yapay zekanın tarayıcı üzerindeki imleç hareketlerini, metin yazma süreçlerini ve sayfa etkileşimlerini **CANLI (Live Stream / DOM Sync)** olarak izleyebildiği, eşzamanlı olarak da simüle edilmiş terminal üzerinden komut çıktılarını görsel olarak takip edebildiği gelişmiş bir ajantik mimaridir.

## 🛠 Teknoloji Yığını

| Katman | Teknoloji | Ücretsiz Plan |
|--------|-----------|---------------|
| **Sürüm Kontrolü** | GitHub | Public/Private Repository |
| **Frontend** | Next.js 14+ (App Router) | Vercel (Hobby Plan) |
| **Styling** | TailwindCSS + Shadcn/UI | Ücretsiz |
| **Live Browser** | Playwright + CDP | Serverless |
| **Terminal UI** | xterm.js | Web-based |
| **LLM Engine** | Google Gemini 1.5 Flash / Groq | Ücretsiz API |
| **Email Service** | Resend / Gmail API | Ücretsiz tier |

## 📋 Geliştirme Faz Planı

### ✅ Faz 1: GitHub & Vercel Setup (TAMAMLANDI)
- [x] GitHub repository oluşturma
- [x] Next.js 14 proje yapısı
- [x] TailwindCSS & PostCSS konfigürasyonu
- [x] Temel UI layout (Split-screen)
- [x] package.json ve build config

### 🔄 Faz 2: Terminal ve Browser UI Tasarımı (Sonraki)
- [ ] xterm.js entegrasyonu ve styling
- [ ] Live browser window placeholder
- [ ] Chat panel UI completion
- [ ] Real-time message streaming UI
- [ ] Responsive design

### 🔧 Faz 3: Playwright Live Stream Entegrasyonu
- [ ] Playwright CDP Screencast setup
- [ ] WebSocket bağlantısı
- [ ] Real-time canvas/video streaming
- [ ] İnsan benzeri cursor hareketleri
- [ ] Stealth plugin entegrasyonu

### 📧 Faz 4: E-Posta ve Kimlik Modülü
- [ ] Gmail API / Resend setup
- [ ] Autonomous email management
- [ ] Activation link handling
- [ ] OTP code detection

### 🤖 Faz 5: AI Agent Döngüsü
- [ ] Gemini / Groq API bağlantısı
- [ ] Function calling (click, type, execute)
- [ ] Task decomposition
- [ ] Self-correction loop

## 🚀 Kurulum ve Çalıştırma

### Ön Gereksinimler
- Node.js 18+
- npm veya yarn

### Local Development
```bash
# Proje klasörüne gir
cd live-browser-ai-assistant

# Bağımlılıkları yükle
npm install

# Development sunucusunu başlat
npm run dev

# http://localhost:3000 adresine aç
```

### Production Build
```bash
npm run build
npm run start
```

## 📦 Klasör Yapısı

```
live-browser-ai-assistant/
├── app/
│   ├── api/
│   │   ├── browser/       # Browser kontrol API'ları
│   │   ├── terminal/      # Terminal komut API'ları
│   │   └── ai/            # AI chat API'ı
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Ana sayfa
├── components/
│   ├── browser/           # Browser window components
│   ├── terminal/          # Terminal components
│   └── chat/              # Chat panel components
├── lib/
│   ├── browser/           # Browser utilities
│   ├── terminal/          # Terminal utilities
│   └── ai/                # AI logic
├── styles/
│   └── globals.css        # Global styling
├── public/                # Static files
└── package.json
```

## 🌐 Vercel Deployment

### Step 1: GitHub'a Push Yap
```bash
git add .
git commit -m "Faz 1: Initial Next.js setup"
git push origin main
```

### Step 2: Vercel'de Deploy Et
1. https://vercel.com adresine git
2. "Add New Project" tıkla
3. GitHub repository'ni seç
4. "Deploy" tıkla

Vercel otomatik olarak:
- Build yapacak
- Environment variables'ları yönetecek
- Her push'ta otomatik deploy yapacak

## 🔐 Environment Variables

```env
# .env.local dosyası (local development için) — ASLA NEXT_PUBLIC_ ile başlatmayın, anahtar tarayıcıya sızar
OPENROUTER_API_KEY=xxx
# İsteğe bağlı: varsayılan openrouter/auto
OPENROUTER_MODEL=openrouter/auto

# Faz 4'te kullanılacak
RESEND_API_KEY=xxx
```

## 📝 Katkı Kuralları

1. Kod yazarken Türkçe açıklama satırları ekle
2. Clean code prensiplerine uy
3. Her faz sonunda test et
4. Commit mesajları açıklayıcı ol

## 📜 Lisans

MIT License - Tekno

## 📧 İletişim

- **Email**: teknocengel@gmail.com
- **Repository**: https://github.com/tekno/live-browser-ai

---

**Şu anda: Faz 1 (Setup) ✅**  
**Sonraki: Faz 2 (UI Refinement) 🔄**
