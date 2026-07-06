# cloudplanner.org

> FinOps guides, cloud cost calculators, and tool comparisons for engineering teams.

Built with **Astro** · Deployed on **Vercel** · Content from **Airtable** · CI/CD via **GitHub Actions**

---

## Local development

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/cloudplanner.org.git
cd cloudplanner.org
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your Airtable API key and base IDs.  
Get your API key from: https://airtable.com/account  
Get base IDs from each base's API docs: https://airtable.com/[base_id]/api/docs

### 3. Run the dev server

```bash
npm run dev
```

Open http://localhost:4321 — the site hot-reloads as you edit files.

---

## Project structure

```
cloudplanner.org/
├── src/
│   ├── components/       # Reusable Astro components (Nav, Footer, etc.)
│   ├── layouts/          # Page layouts (BaseLayout wraps every page)
│   ├── lib/              # Utilities (Airtable fetch, helpers)
│   ├── pages/            # One file = one URL route
│   │   ├── index.astro   # Homepage → cloudplanner.org/
│   │   ├── finops/       # FinOps guides → cloudplanner.org/finops/
│   │   ├── calculators/  # Calculators → cloudplanner.org/calculators/
│   │   ├── comparisons/  # Comparisons → cloudplanner.org/comparisons/
│   │   └── templates/    # Architecture templates
│   └── styles/           # Global CSS
├── public/               # Static assets (favicon, robots.txt, og images)
├── .github/workflows/    # GitHub Actions CI/CD
├── .env.example          # Environment variable template
└── astro.config.mjs      # Astro configuration
```

---

## Deployment

This site auto-deploys via Vercel:

- **Push to `main`** → production deploy at cloudplanner.org
- **Push to `dev`** → staging deploy at a Vercel preview URL
- **Open a Pull Request** → Vercel creates an isolated preview URL for that PR

### Vercel environment variables

Add these in your Vercel project settings (Settings → Environment Variables):

| Variable | Environment |
|---|---|
| `AIRTABLE_API_KEY` | Production + Preview |
| `AIRTABLE_BASE_COMPARISONS` | Production + Preview |
| `AIRTABLE_BASE_GUIDES` | Production + Preview |
| `AIRTABLE_BASE_CALCULATORS` | Production + Preview |
| `AIRTABLE_BASE_TEMPLATES` | Production + Preview |
| `AIRTABLE_BASE_MIGRATIONS` | Production + Preview |
| `PUBLIC_GA4_ID` | Production only |
| `PUBLIC_MIXPANEL_TOKEN` | Production only |

---

## Git workflow

```
main   ← production (cloudplanner.org)
  └── dev      ← staging
        └── feature/[name]   ← your working branch
```

**The loop:**
```bash
git checkout dev
git checkout -b feature/my-feature
# ... make changes, commit often ...
git push origin feature/my-feature
# Open Pull Request to dev on GitHub
# Vercel posts a preview URL on the PR
# Merge PR → staging deploy
# When stable: merge dev → main → production
```

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start local dev server at localhost:4321 |
| `npm run build` | Build static site to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | TypeScript type-check (runs in CI) |
