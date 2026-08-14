<div align="center">

# 💍 Rashad & Esraa — Digital Engagement Invitation

**A love story, beautifully told in code.**

An elegant, animated digital engagement invitation crafted with care — featuring immersive music, a live countdown, interactive RSVP, photo gallery, and a whole lot of heart.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-c9a87c?style=for-the-badge)](https://Bavly-Hamdy.github.io/Engagement)
[![Built With](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Deployed on](https://img.shields.io/badge/GitHub_Pages-222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com)

<br />

<img src="https://readme-typing-svg.demolab.com?font=Playfair+Display&weight=600&size=22&pause=3000&color=C9A87C&center=true&vCenter=true&width=500&lines=بِكُلّ+الحب+ننتظركم+لتشاركونا+فرحتنا;We+can't+wait+to+celebrate+with+you" alt="Typing SVG" />

</div>

---

## ✨ The Story Behind This Project

This isn't just another web app — it's a **digital celebration of love**.

When Rashad and Esraa got engaged, they wanted something more personal than a paper card and more memorable than a WhatsApp message. So this invitation was born: a fully immersive, animated experience that guests can open on their phones and feel the warmth of the moment, no matter where they are.

Every animation, every color choice, every line of Arabic calligraphy was placed with intention. The background music (*الليل وسماه*) plays softly as you scroll — because love deserves a soundtrack. 🎶

---

## 🎨 Features at a Glance

| Feature | Description |
|---|---|
| 🎬 **Animated Cover** | A cinematic entrance with sparkle effects, staggered reveals, and a "Open the Invitation" button that sets the mood |
| ⏳ **Live Countdown** | Real-time countdown to the big day — September 25th, 2026 |
| 📅 **Interactive Calendar** | Visual calendar highlighting the engagement date |
| 📸 **Photo Gallery** | A curated collection of the couple's moments together |
| 🗓️ **Event Timeline** | Step-by-step schedule of the evening's events |
| 👔 **Dress Code Guide** | So guests show up looking their best |
| 📍 **Venue & Map** | Google Maps integration — Haras El-Hodood Club, Zamalek |
| ✅ **RSVP System** | Interactive modal for guests to confirm attendance |
| 💬 **Guestbook** | Leave a heartfelt message for the couple |
| 🎵 **Background Music** | Ambient audio player with play/pause toggle |
| ✍️ **Bilingual UI** | Seamless Arabic + English typography throughout |

---

## 🏗️ Tech Stack

This project is built with a modern, production-grade frontend stack:

```
React 19          →  UI library with latest concurrent features
TypeScript        →  Type-safe development, zero `any` shortcuts
Tailwind CSS 4    →  Utility-first styling with custom design tokens
Framer Motion     →  Silky-smooth page transitions & micro-animations
Lucide React      →  Crisp, minimal icon set
Vite 6            →  Lightning-fast dev server & optimized builds
GitHub Pages      →  Free, reliable static hosting
```

### Project Architecture

```
Engagement-main/
├── public/                    # Static assets (photos, audio, rings)
│   ├── Photo 1.png
│   ├── Photo 2.png
│   ├── rings.png
│   └── el-leil-we-samah.mpeg
├── src/
│   ├── assets/                # Imported media assets
│   ├── components/
│   │   ├── AudioPlayer.tsx    # 🎵 Floating music player
│   │   ├── Countdown.tsx      # ⏳ Live countdown timer
│   │   ├── Cover.tsx          # 🎬 Cinematic entrance screen
│   │   ├── DressCode.tsx      # 👔 Dress code section
│   │   ├── Gallery.tsx        # 📸 Photo gallery with lightbox
│   │   ├── Guestbook.tsx      # 💬 Guest messages section
│   │   ├── InteractiveCalendar.tsx  # 📅 Calendar widget
│   │   ├── Invitation.tsx     # 📜 Main invitation layout
│   │   ├── RSVPModal.tsx      # ✅ RSVP confirmation modal
│   │   ├── Sparkles.tsx       # ✨ Decorative sparkle effects
│   │   └── Timeline.tsx       # 🗓️ Event schedule timeline
│   ├── data/                  # Data layer (extensible)
│   ├── App.tsx                # Root component & audio logic
│   ├── main.tsx               # React DOM entry point
│   └── index.css              # Global styles & design tokens
├── index.html                 # HTML shell
├── vite.config.ts             # Vite + Tailwind + React config
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies & scripts
└── .env.example               # Environment variable template
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `v18+` — [Download here](https://nodejs.org)
- **npm** `v9+` (comes bundled with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Bavly-Hamdy/Engagement.git
cd Engagement

# 2. Install dependencies
npm install

# 3. (Optional) Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY if needed

# 4. Start the development server
npm run dev
```

The app will be running at **http://localhost:3000/Engagement/** 🎉

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local dev server on port 3000 |
| `npm run build` | Create a production-optimized build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Build & deploy to GitHub Pages |
| `npm run lint` | Run TypeScript type-checking |
| `npm run clean` | Remove build artifacts |

---

## 🎯 Design Philosophy

> *"We didn't want it to feel like a website. We wanted it to feel like unfolding a letter."*

### Visual Language
- **Color Palette**: Warm ivories, muted golds (`#c9a87c`), and deep charcoals — a palette inspired by classic wedding stationery
- **Typography**: Serif fonts for elegance, Arabic calligraphy for cultural authenticity, and sans-serif for modern UI elements
- **Motion**: Every section fades in as you scroll, with spring-based easing curves (`[0.16, 1, 0.3, 1]`) that feel organic and unhurried
- **Background**: A subtle rings watermark behind a semi-transparent overlay — present but never distracting

### Accessibility & Performance
- Fully responsive — tested across mobile, tablet, and desktop viewports
- Smooth scroll behavior enabled globally
- Lazy-loaded Google Maps iframe
- Audio plays only on user interaction (no autoplay violations)
- Touch-friendly interactive elements with generous tap targets

---

## 🌐 Deployment

This project is configured for **GitHub Pages** out of the box:

```bash
# Build and deploy in one command
npm run deploy
```

This runs `vite build` → `gh-pages -d dist`, pushing the `dist/` folder to the `gh-pages` branch.

**Live URL**: [https://Bavly-Hamdy.github.io/Engagement](https://Bavly-Hamdy.github.io/Engagement)

---

## 🤝 Contributing

This is a personal project, but if you'd like to use it as a template for your own engagement or wedding invitation — go for it! Here's how:

1. **Fork** the repository
2. Update the couple's names in `Cover.tsx` and `Invitation.tsx`
3. Replace photos in `public/` with your own
4. Swap the music file in `public/el-leil-we-samah.mpeg`
5. Update the venue, date, and map coordinates in `Invitation.tsx`
6. Deploy to your own GitHub Pages

> 💡 **Tip**: Search for "Rashad" and "Esraa" across the codebase to find all places that need personalization.

---

## 📝 License

This project is open source and available for personal use. If you use it, a small credit or star ⭐ on the repo would mean the world.

---

<div align="center">

### 💛 Made with love, late nights, and lots of coffee

**Rashad & Esraa — 25.09.2026**

*عقبال عندكم جميعاً* 🤍

---

<sub>Built by <a href="https://github.com/Bavly-Hamdy">Bavly Hamdy</a> · Powered by React, TypeScript & Framer Motion</sub>

</div>