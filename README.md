<<<<<<< HEAD
# 🚀 Career Quest — Job Application Tracker

A modern, responsive, and gamified **Job Application Tracker** built with **React.js**, **React Router**, **Context API**, and **Tailwind CSS**. It helps users organize and track their job applications through a clean dashboard with an engaging user experience.


=======
# Career Quest — Job Application Tracker (v2)

A modern, gamified job application tracker built with React, React Router, Context API, Tailwind CSS, and Recharts. Glassmorphism UI with blue → purple gradient accents, light/dark mode, and full CRUD for job applications — all persisted in `localStorage`.

## v2 features

- **Job Post Link** — optional URL field on Add/Edit, validated, shown as a "View Job Post" link that opens in a new tab.
- **Interview Scheduler** — when Status = Interviewing, capture date/time/type/notes. Upcoming interviews list on the dashboard, plus a "📅 You have an interview today!" banner.
- **Days Since Applied** — job cards show "Applied X days ago"; Applied jobs older than 30 days get a "⚠ No response yet" badge.
- **Smart CV Alert** — configurable threshold (default 10). Applied ≥ threshold with 0 interviews shows a dismissable-by-progress warning card with a "Review My CV" button.
- **Dashboard Analytics** — Recharts pie chart (Applications by Status) and bar chart (Applications per Month), styled to match the glass theme.
- **Favorites** — star any job; filter the dashboard to Favorites only.
- **Company Logos** — auto-fetched from the Clearbit Logo API based on a guessed domain, with graceful fallback to the initial-letter avatar.
- **Application Timeline** — Job Details shows Applied → Recruiter Viewed → Assessment → Interview → Offer, with the current stage highlighted.
- **Celebration** — confetti overlay fires whenever a job's status becomes Offer.
- **Improved empty state** — "Start your job search journey." with a friendlier illustration and Add Job button.
- **Better search** — matches company, title, notes, and job post link.
- **Statistics** — Success Rate, Interview Rate, Offer Rate, Rejection Rate, Avg. Applications/Month.
- **Export improvements** — JSON export now includes `exportDate`, `totalJobs`, and `statistics` alongside the job list (import still accepts old plain-array exports too).

All v1 features (dashboard, add/edit/delete, gamification badges, quest progress, dark mode, JSON import/export, toasts, responsive nav) continue to work unchanged.
>>>>>>> 1db9055 (feat: add interview scheduler and dashboard enhancements)

## 📸 Features

- 📊 Dashboard with application statistics
- 🔍 Search and filter job applications
- ➕ Add new applications
- ✏️ Edit existing applications
- 🗑️ Delete applications with confirmation modal
- 📅 Track application date and current status
- 🎯 Gamification system with achievements
- 📈 Progress bar for job search journey
- 🌙 Dark / Light Mode
- 💾 Data persistence using LocalStorage
- 📤 Export applications as JSON
- 📥 Import applications from JSON
- 📱 Fully responsive design
- 🔔 Toast notifications
- ⚡ Loading skeletons

## 🛠️ Tech Stack

- React.js
- React Router
- Context API
- Tailwind CSS
- LocalStorage
- Lucide React

## 📂 Project Structure

```text
src/
 ├── components/
 ├── context/
 ├── pages/
 ├── utils/
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/Doha-2004/career-quest.vercel
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 💡 Key Concepts Practiced

<<<<<<< HEAD
- React Components
- React Hooks
- React Router
- Context API
- State Management
- Form Validation
- CRUD Operations
- Responsive Design
- LocalStorage
- JSON Import & Export
## 🌐 Live Demo
=======
```
src/
  components/       Reusable, presentation-focused UI pieces
  context/           AppContext — the single source of truth for jobs/theme/toasts/favorites/celebration
  pages/             Dashboard, AddJob, JobDetails, NotFound
  utils/             constants, localStorage helpers, dateUtils, stats, timeline, companyDomain, achievements, validation
  App.jsx            Route definitions + layout shell
  main.jsx           Entry point (BrowserRouter + AppProvider)
  index.css          Tailwind directives + glassmorphism utility classes
```
>>>>>>> 1db9055 (feat: add interview scheduler and dashboard enhancements)

https://career-quest-new.vercel.app

## 💻 GitHub Repository

https://github.com/Doha-2004/career-quest.vercel

## 👩‍💻 Developed By

**Doha Emad**

If you like this project, don't forget to ⭐ the repository!
