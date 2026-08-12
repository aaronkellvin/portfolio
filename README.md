# Kellvin Aaron Ocampo — Portfolio

Personal portfolio built with **React**, **Node.js (Express)**, and **Tailwind CSS**.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, React Router, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| Assets | `public/static/` (images, resume PDF) |
| Deploy | Vercel |

## Project structure

```
portfolio/
├── client/              React + Tailwind (Vite) — primary app
├── server/              Express API + static file serving
├── api/                 Vercel serverless entry
├── templates/           HTML page templates (Jinja2)
├── public/static/css/   Site stylesheet
├── public/static/js/    Site JavaScript
├── public/static/images/ Images
├── public/static/uploads/ Resume PDF
└── assets/              Bundled resume fallback
```

The **React app** (`client/`) is the main stack for development and deployment. The **HTML templates**, **CSS**, and **JavaScript** in `templates/` and `public/static/` are kept in the repo as the original site source.

## Setup

### 1. Install Node.js

Download and install **Node.js LTS** from [https://nodejs.org](https://nodejs.org), then restart your terminal.

Verify:

```bash
node -v
npm -v
```

### 2. Install dependencies

```bash
npm run install:all
```

### 3. Run locally

**Terminal 1 — API server:**

```bash
npm run dev --prefix server
```

**Terminal 2 — React dev server:**

```bash
npm run dev --prefix client
```

Open **http://127.0.0.1:5173**

### Production build

```bash
npm run build
npm start
```

Open **http://127.0.0.1:5000**

## Resume PDF

Place your resume in both locations (keep them in sync):

- `assets/resume.pdf`
- `public/static/uploads/resume.pdf`

Then commit and push for deployment.

## Deploy to Vercel

1. Push to GitHub
2. Import the repo in Vercel
3. Build command: `npm run build`
4. Install command: `npm run install:all`

The Express server handles `/api`, `/resume`, `/static`, and SPA routing.

## Pages

- `/` — Home
- `/skills` — Technical skills + AI tools
- `/projects` — Featured projects with gallery modal
- `/experience` — Work history & education
- `/certifications` — Certifications & awards
- `/resume` — PDF viewer
- `/contact` — Contact details
