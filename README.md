# 🚀 TaskBoard Tab — New Tab Extension & Showcase Landing Page

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-0055FF?style=for-the-badge&logo=framer)
![Manifest V3](https://img.shields.io/badge/Chrome_Extension-Manifest_V3-4285F4?style=for-the-badge&logo=google-chrome)

> **TaskBoard Tab** transforms your default browser **New Tab** page into a productive workspace featuring a central Google Search bar with live autocomplete suggestions, real-time clock & date display, and draggable floating task cards.

---

## ✨ Features

- 🔍 **Google Search with Live Autocomplete**: Fetch real-time search completions as you type. Automatically routes domain inputs (e.g. `youtube.com`, `github.com`) directly to target websites.
- 📌 **Draggable Sticky Note Tasks**: Drag floating cards anywhere across your screen using physics-based drag interactions.
- 🛡️ **Search Bar Collision Barrier**: Cards hit a physical boundary at the base of the search bar area so they never overlap or slide behind the search input.
- 💾 **Local Storage Persistence**: Task creations, completions, and deletions stay saved on your device across every new tab reload.
- 📦 **Downloadable Extension (.zip)**: One-click download of `docs-app-extension.zip` directly from the landing page to load into Chrome, Edge, Brave, or Opera.
- 🎨 **Dark Glassmorphism UI**: Curated dark mode aesthetics with ambient background glows and digital clock headers.

---

## 📸 Preview

| Feature | Description |
|---|---|
| **Live Search Suggestions** | Real-time autocomplete suggestions powered by Google API with keyboard navigation (`ArrowUp`/`ArrowDown`/`Enter`) |
| **Task Dragging** | Bounded canvas drag physics powered by Framer Motion |
| **Task Management** | Add tasks via modal form, toggle `Pending`/`Completed` status, delete tasks |

---

## 📦 How to Install the Extension in Your Browser

1. **Download the ZIP**: Click **Download Extension (.zip)** on the website or download `public/docs-app-extension.zip` from this repository.
2. **Extract**: Unzip `docs-app-extension.zip` into a folder on your computer.
3. **Open Extensions Page**: Open Chrome, Edge, Brave, or Opera and go to `chrome://extensions` in your address bar.
4. **Enable Developer Mode**: Turn ON the **Developer Mode** toggle switch in the top-right corner.
5. **Load Unpacked**: Click **Load unpacked** and select the unzipped extension folder.
6. Open a **New Tab** (`Ctrl + T`) to enjoy your custom dashboard!

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations & Drag Physics**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Extension Standard**: Chrome Extension Manifest V3 (`public/manifest.json`)
- **Deployment**: [Vercel](https://vercel.com/) (`vercel.json` SPA configuration included)

---

## ⚡ Getting Started (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/beastwaleed/Docs-App-React.git
   cd Docs-App-React
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build production bundle & extension ZIP**:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```
Docs-App-React/
├── public/
│   ├── manifest.json            # Manifest V3 Extension Configuration
│   └── docs-app-extension.zip   # Downloadable Chrome extension zip bundle
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Top navigation bar with download CTA & social links
│   │   ├── Hero.jsx             # Hero section with embedded live demo container
│   │   ├── SearchBar.jsx        # Google search bar with JSONP live autocomplete & clock
│   │   ├── Card.jsx             # Draggable sticky note task card
│   │   ├── Foreground.jsx       # Floating card canvas with drag constraints
│   │   ├── Background.jsx       # Dark ambient backdrop & watermark
│   │   ├── Features.jsx         # 4-card feature highlights grid
│   │   ├── InstallGuide.jsx     # 4-step browser extension setup guide
│   │   └── Footer.jsx           # Footer with developer attribution
│   ├── App.jsx                  # Main application & modal state manager
│   ├── App.css                  # Global root styles
│   └── index.css                # Tailwind CSS imports
├── vercel.json                  # Vercel deployment & SPA routing config
├── package.json
└── README.md
```

---

## 👤 Author

**Waleed (DigiWaleed)**
- GitHub: [@beastwaleed](https://github.com/beastwaleed)
- LinkedIn: [in/digiwaleed](https://www.linkedin.com/in/digiwaleed)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
