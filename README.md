# Hayden Portfolio (Vite + React + TypeScript)

Minimal routed portfolio for GitHub Pages with a black, clean aesthetic.

## Routes

- `/#/` -> Home
- `/#/work` -> Work
- `/#/projects` -> Projects
- `/#/about` -> About
- `/#/hobbies` -> Hobbies
- `/#/resume` -> Resume

The app uses `HashRouter`, so refreshes do not 404 on GitHub Pages.

## Local Development

```bash
npm install
npm run dev
```

Build production assets:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Resume Asset

- Local resume file path: `public/Hayden_Chang_Resume.pdf`
- Resume page links to the file in a new tab.
- Replace this placeholder PDF with your real resume while keeping the same filename (or update the link in `src/pages/ResumePage.tsx`).

## GitHub Pages Deployment

Deployment is configured in `.github/workflows/deploy.yml`.

### 1) Enable Pages

In GitHub repository settings:

1. Open `Settings` -> `Pages`
2. Under **Build and deployment**, set **Source** to `GitHub Actions`

### 2) Trigger deployment

- Push to `main` to auto-deploy
- Or run manually from `Actions` -> `Deploy Portfolio to GitHub Pages` -> `Run workflow`

## Vite Base Path Logic

`vite.config.ts` sets `base` from `GITHUB_REPOSITORY`:

- `<username>.github.io` -> `/`
- any other repo name -> `/<repo-name>/`

This ensures correct asset paths in both user-site and project-site Pages deployments.
