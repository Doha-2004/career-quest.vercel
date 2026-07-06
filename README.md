# Career Quest — Job Application Tracker

A modern, gamified job application tracker built with React, React Router, Context API, and Tailwind CSS. Glassmorphism UI with blue → purple gradient accents, light/dark mode, and full CRUD for job applications — all persisted in `localStorage`.

## Features

- **Dashboard** — welcome banner, stat cards (Total / Applied / Interviewing / Offers / Rejected), search, status filter, sort by newest/oldest, and job cards with Quick View.
- **Add Job** — validated form (company, title, status, date, notes) with save/cancel.
- **Job Details** — full record view with inline edit and a delete confirmation modal.
- **Gamification** — a quest progress bar and 4 unlockable achievement badges (First Application, 10 Applications, First Interview, First Offer), plus a motivational message that adapts to your progress.
- **Global state** via a single `AppContext` (React Context + hooks) — no external state library.
- **Persistence** — all applications and your theme preference are saved to `localStorage` automatically.
- **Routing** — React Router with `/`, `/add`, and `/job/:id`.
- **Bonus** — export/import applications as JSON, dark mode toggle, empty states, loading skeletons, toast notifications, and a fully responsive nav.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/       Reusable, presentation-focused UI pieces
  context/           AppContext — the single source of truth for jobs/theme/toasts
  pages/             Dashboard, AddJob, JobDetails, NotFound
  utils/             constants, localStorage helpers, achievements/gamification logic
  App.jsx            Route definitions + layout shell
  main.jsx           Entry point (BrowserRouter + AppProvider)
  index.css          Tailwind directives + glassmorphism utility classes
```

## Notes on data

Sample applications are seeded on first run so the dashboard isn't empty. Delete them freely — your own data always takes over once you add or import applications, and everything persists across reloads via `localStorage`.
