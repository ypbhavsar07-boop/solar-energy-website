# ☀️ Solar Energy in India — Website Project

A fully functional, responsive, and modern website about **Solar Energy in India**, built as a student project using pure **HTML, CSS, and JavaScript**.

---

## 📁 File Structure

```
solar-india/
├── index.html       ← Main webpage (all sections)
├── style.css        ← All styles, animations, responsive design
├── script.js        ← Charts, calculator, animations, form
└── README.md        ← This file
```

---

## 🚀 How to Run Locally

### Option A — Just Double-Click (Simplest)
1. Download or unzip the project folder.
2. Open the `solar-india/` folder.
3. Double-click `index.html` → it opens in your browser. Done!

### Option B — Using VS Code Live Server (Recommended)
1. Install **Visual Studio Code** → https://code.visualstudio.com
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions sidebar.
3. Open the `solar-india/` folder in VS Code.
4. Right-click `index.html` → **"Open with Live Server"**.
5. Website opens at `http://127.0.0.1:5500` with auto-refresh on save.

### Option C — Python Local Server
If Python is installed:
```bash
cd solar-india
python -m http.server 8000
# Open http://localhost:8000 in your browser
```

---

## 🌐 How to Host on GitHub Pages (Free)

### Step 1 — Create a GitHub Account
Sign up at https://github.com if you don't have an account.

### Step 2 — Create a New Repository
1. Click the **+** icon → **New repository**
2. Repository name: `solar-india` (or any name you like)
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload Your Files
**Via GitHub Website (No Git needed):**
1. On your new repo page, click **"uploading an existing file"**
2. Drag and drop all 3 files: `index.html`, `style.css`, `script.js`
3. Click **"Commit changes"**

**Via Git command line:**
```bash
# Navigate to your project folder
cd solar-india

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Solar Energy in India website"

# Connect to GitHub (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/solar-india.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4 — Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → scroll to **Pages** (left sidebar)
3. Under **Source**, select `main` branch and `/ (root)` folder
4. Click **Save**
5. Wait ~60 seconds, then visit:
   `https://YOUR_USERNAME.github.io/solar-india/`

✅ Your website is now live on the internet — for free!

---

## 🎯 Features

| Feature | Details |
|---|---|
| 🏠 Hero Banner | Animated sun orb, sunray effects, live counters |
| ℹ️ About Solar | What is solar energy + animated flow diagram |
| 🇮🇳 India Section | Stats, govt schemes, 2 interactive Chart.js graphs |
| ⚖️ Pros & Cons | Side-by-side card comparison |
| 🏭 Applications | Residential, Industrial, Agriculture, Transport cards |
| 🧮 Calculator | Interactive JS calculator with savings, payback, CO₂ |
| 🔭 Future Scope | Timeline + emerging tech cards |
| 📬 Contact Form | Validated form with success/error feedback |

---

## 🛠 Technologies Used
- **HTML5** — Semantic structure
- **CSS3** — Variables, Grid, Flexbox, Animations, Responsive
- **JavaScript (ES6+)** — DOM manipulation, IntersectionObserver
- **Chart.js** — Interactive data charts (CDN)
- **Font Awesome 6** — Icons (CDN)
- **Google Fonts** — Syne + DM Sans

---

## 👤 Project Info
- **Topic:** Solar Energy in India
- **Type:** Student Project Website
- **Level:** Undergraduate / Diploma

---

*Built with ❤️ for a greener, solar-powered India 🌞*
