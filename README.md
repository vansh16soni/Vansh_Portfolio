# Vansh Kumar Soni — Portfolio & Engineering Folio

> **Art-Directed Personal Website for Full-Stack Developer & Java Ecosystem Engineer**  
> Built with Swiss graphic design sensibilities, editorial typography, restrained animations, and zero generic AI templates.

---

## ✦ Design Philosophy

- **Art Direction**: Framed frosted-glass exhibition stage with sculptural display typography, optical specular rim highlights, and layered natural mountain/sky parallax.
- **Palette**: Natural Green Mountain Pine (`#162C20`, `#234734`, `#578C66`), Deep Evergreen Granite (`#08120E`), Glacial Sky (`#7EAEC7`, `#BDD9E7`), Mountain Lake Tarn (`#1F424F`), and Snow Peak (`#F2F6F3`). Zero artificial/neon glare; pure organic mountain atmosphere.
- **3D Liquid Glassmorphism**: Real-time 3D folded glass ribbon with fluid wave perturbations, multi-layer 3D card tilt with Z-depth separation, prismatic conic edge bevels, organic liquid aurora backlight underlay, and interactive 3D architecture chambers inside case studies.
- **Typography**: Space Grotesk (Sculptural Display), Inter (Body Copy), IBM Plex Mono (Technical Tags).
- **Choreography**: GSAP + ScrollTrigger mountain ridge parallax, depth-scrubbed hero wordmark, and staggered glass plate reveals (with graceful native fallback).
- **Privacy Safe**: Personal contact details like private phone numbers are kept completely confidential and omitted from public source code.

---

## ✦ Key Sections Included

1. **Asymmetric Editorial Hero & 3D LEGO® Ferrari Showcase**:
   - **Left Column**: Clean, dominant typographic presentation of **VANSH KUMAR SONI**, role kicker, Smart India Hackathon '25 runner-up and internship proof badges, and 1-click recruiter actions (View Resume, Download PDF, Explore Works).
   - **Right Column (Dedicated 3D LEGO® Ferrari Panel)**: Real-time 3D brick-built Ferrari Speed Champion built in Three.js (`js/car-3d.js`) featuring authentic cylindrical LEGO studs, iconic sloped wedge nose, Ferrari Modena shield, quad round taillights, F40-style rear wing, spinning alloy wheels with yellow hubcaps, projector headlights, and real-time livery cycling (Rosso Corsa, Modena Giallo, Nero Daytona, Tour de France). Completely separated from the name for maximum legibility and visual impact.
2. **Curated Case Studies (Works)**:
   - **Repo City** — 3D Codebase Visualization & AI Learning Platform (Three.js, React.js, Node.js, Express.js, AST Parsing, DAG algorithms, SSE, GitHub OAuth 2.0).
   - **GYAN.AI** — AI-Powered Technical Notes & Knowledge Platform (React.js, Node.js, Express.js, MongoDB, Dual-LLM Gemini ⇄ Groq fallback, React Flow dynamic graphs).
   - **ShadowPlay** — Real-Time Hand Gesture & Shadow Puppet Studio (MediaPipe Hands WASM, React.js, Node.js, 21 3D landmarks, Canvas API).
   - Dedicated in-depth **Architectural Case Study Modals** for each system.
3. **Technical Profile & Architecture (Skills)**:
   - Categorized by systems: Java & Spring Boot, Full-Stack & Graphics, Applied AI & Vision, Systems & Core CSE, Persistence & Cloud.
4. **Experience Timeline**:
   - **Cisco** — AI Intern (June – August 2026, NetSage AI).
   - **BSNL** — Government Data Analytics Intern (February 2026, Telecom Churn & Revenue Optimization).
5. **Document Gallery & Verified Credentials**:
   - Smart India Hackathon '25 National Runner-up (top 40 finalists), Hack SRIT '24, AWS Academy credentials, SoloLearn Java.
6. **Curriculum Vitae (Original Resume)**:
   - Full-fidelity PDF viewer and direct download for your official resume document.

---

## ✦ How to Deploy to GitHub Pages (1-Click, Concise & Zero Setup)

Because this website uses pristine, modern static web architecture, it has **zero build dependencies** and can be deployed directly to GitHub in seconds:

### Step 1: Initialize Git and Push to GitHub
```bash
git init
git add .
git commit -m "feat: initial human-art-directed portfolio"
git branch -M main
git remote add origin https://github.com/vansh16soni/vansh16soni.github.io.git
# (or use any repo name like https://github.com/vansh16soni/portfolio.git)
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub: `https://github.com/vansh16soni/<repo-name>`
2. Click **Settings** → **Pages** (in the left sidebar).
3. Under **Source**:
   - **Option A (GitHub Actions)**: Choose **GitHub Actions**. The included `.github/workflows/deploy.yml` will automatically build and publish your site!
   - **Option B (Deploy from branch)**: Select branch `main` and folder `/ (root)`, then click **Save**.
4. Your site will be live at `https://vansh16soni.github.io/`!

---

## ✦ How to Add Screenshots & Live Demo Links

### 1. Adding Project Screenshots
Place your screenshot files in `assets/projects/`:
- `assets/projects/repocity.png`
- `assets/projects/gyanai.png`
- `assets/projects/shadowplay.png`

In `index.html`, inside `.project-screenshot-frame`, replace the `<div class="editorial-blueprint-placeholder">...</div>` with:
```html
<img src="assets/projects/repocity.png" alt="Repo City 3D Codebase Visualization" class="project-img-cover">
```

### 2. Updating Live Demo Links
In `index.html`, locate the project action row and replace the demo placeholder with your live link:
```html
<a href="https://your-live-demo-link.com" target="_blank" rel="noopener noreferrer" class="btn-primary-editorial">
  <span>LAUNCH LIVE DEMO ↗</span>
</a>
```
You can also update `demo: "https://your-live-demo-link.com"` in `js/project-modal.js` so it automatically appears inside the case study modal!

---

## ✦ Local Development & Run Commands (100% Pure Node.js)

The project includes a lightweight, zero-dependency Node.js server (`server.js`). You can run it with:

```bash
# Pure Node.js (zero external dependencies)
node server.js

# Or using npm
npm start
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. All static assets, fonts, stylesheets, scripts, and the PDF resume are served with optimal MIME headers.

