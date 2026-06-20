# 🏫 Allwin School Daily Report Generator

A mobile-first React application for generating WhatsApp-ready daily classroom reports.

---

## ✨ Features

- 🔐 Login authentication (session persisted via LocalStorage)
- 📝 Create daily reports with customizable work done & homework entries
- 📚 Subject management (add, edit, delete subjects with emojis)
- 📋 Copy report as WhatsApp-ready message
- 📜 Report history with search, view, copy, and delete
- 🌙 Dark mode toggle
- 💾 Auto-save draft so you never lose progress
- 📱 Mobile-first, optimized for Realme Narzo 30 5G and all Android devices

---

## 🔑 Login Credentials

| Field    | Value      |
|----------|------------|
| User ID  | Banumathi  |
| Password | 1234       |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Navigate to project directory
cd school-report-app

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open your browser at: **http://localhost:5173**

---

## 📦 Build for Production

```bash
# Build the app
npm run build

# Preview the production build locally
npm run preview
```

The production files will be in the `dist/` folder.

---

## 🌐 Deploy to Netlify

### Option 1: Drag & Drop (Easiest)
1. Run `npm run build`
2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag the `dist/` folder onto the Netlify dashboard
4. Your app is live! ✅

### Option 2: Git-based Deployment
1. Push your project to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) → New site from Git
3. Select your repository
4. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy**

> The `public/_redirects` file handles SPA routing automatically on Netlify.

---

## 📁 Project Structure

```
school-report-app/
├── public/
│   ├── _redirects          # Netlify SPA routing
│   └── school-icon.svg     # Favicon
├── src/
│   ├── components/
│   │   ├── AppLayout.jsx       # Main layout with sidebar + header
│   │   ├── ConfirmDialog.jsx   # Reusable delete confirmation dialog
│   │   ├── MobileHeader.jsx    # Mobile top navigation bar
│   │   ├── ProtectedRoute.jsx  # Auth guard for routes
│   │   └── Sidebar.jsx         # Responsive sidebar navigation
│   ├── contexts/
│   │   ├── AuthContext.jsx     # Authentication state
│   │   ├── ReportContext.jsx   # Current report state
│   │   ├── SubjectsContext.jsx # Subjects management state
│   │   ├── ThemeContext.jsx    # Dark/light mode
│   │   └── ToastContext.jsx    # Toast notifications
│   ├── pages/
│   │   ├── LoginPage.jsx       # Login screen
│   │   ├── DashboardPage.jsx   # Report creation
│   │   ├── SubjectsPage.jsx    # Subject management
│   │   ├── OutputPage.jsx      # Generated report view
│   │   └── HistoryPage.jsx     # Report history
│   ├── services/
│   │   └── storage.js          # LocalStorage service layer
│   ├── utils/
│   │   ├── dateUtils.js        # Date formatting utilities
│   │   └── reportGenerator.js  # Report message generator
│   ├── styles/
│   │   └── index.css           # Global design system & styles
│   ├── App.jsx                 # Root component with routing
│   └── main.jsx                # App entry point
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 📱 Supported Output Format

The generated WhatsApp message exactly follows this format:

```
🏫 ALLWIN MATRIC HR. SEC. SCHOOL

📅 Date: 19/06/2026

👩‍🏫 Class & Section: IV- B

📆 Day: Friday

📝 WORK DONE IN THE CLASSROOM

🌿 EVS: Lesson -1 written work.

⚽ P.E.T: kho- kho practice.

🏠 TODAY'S HOMEWORK

🔤 ENG: work book pg.no:4(1,2)test.

📌 NOTE: Kindly ensure that all books are brought regularly and homework is completed neatly.

🙏 Parents are requested to check the diary regularly and help children prepare for tests.
```

---

## 🛠️ Tech Stack

- **React 18** with Vite
- **React Router v6** for navigation
- **Context API** for state management
- **LocalStorage** for persistence (no external database needed)
- **Lucide React** for icons
- **CSS3** with CSS custom properties (design tokens)

---

## 📝 LocalStorage Keys

| Key              | Purpose                          |
|------------------|----------------------------------|
| `subjects`       | List of subjects with emojis     |
| `history`        | All generated reports            |
| `userSession`    | Login session data               |
| `dashboardDraft` | Auto-saved form data             |
| `darkMode`       | Theme preference                 |

---

Built with ❤️ for Allwin Matric HR. Sec. School
