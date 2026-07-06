# cloudplanner.org — DevOps Portfolio Project Roadmap

> **What you're building:** A production-quality content website about cloud cost planning (FinOps), built and deployed using industry-standard DevOps practices. The finished project gives you a real URL, a real GitHub repo, and a real CI/CD pipeline to show employers.

---

## Why this impresses hiring managers

Most DevOps portfolios are either fake ("here's a diagram I drew") or incomplete ("I did a tutorial once"). This project gives you:

| What you build | What it proves |
|---|---|
| Astro site deployed on Vercel | You can ship a real product |
| GitHub repo with branching strategy | You understand Git workflow |
| GitHub Actions CI/CD pipeline | You can automate builds and deployments |
| Preview environments per PR | You know how feature branch deployments work |
| Environment variable management | You handle secrets properly |
| Airtable as headless CMS | You can integrate external data sources |
| Analytics wired up (GA4 + Mixpanel) | You understand observability |
| Sitemap, schema markup, robots.txt | You know SEO/technical hygiene |
| Looker Studio dashboard | You can surface data for stakeholders |

---

## The stack (beginner-friendly choices)

| Layer | Tool | Why it's good for a beginner |
|---|---|---|
| Framework | **Astro** | Generates static HTML — no server to manage, very fast |
| Hosting | **Vercel** | Free tier, auto-deploys from GitHub, zero config |
| CMS / database | **Airtable** | Spreadsheet-like UI, real API, no SQL needed |
| CI/CD | **GitHub Actions** | Built into GitHub, free, industry standard |
| Analytics | **GA4 + Mixpanel** | Paste a snippet, data appears — instant win |
| Monitoring | **Vercel Analytics** | Built in, one click to enable |
| Reporting | **Looker Studio** | Free Google tool, drag-and-drop dashboards |

Everything has a free tier. You can complete this project at zero cost.

---

## Phase-by-phase plan

### Phase 0 — Accounts & tools (1–2 hours)
*Do this before writing any code.*

- [ ] Create a [GitHub](https://github.com) account (if you don't have one)
- [ ] Create a [Vercel](https://vercel.com) account — sign up with GitHub
- [ ] Create an [Airtable](https://airtable.com) account — free tier
- [ ] Install [Node.js](https://nodejs.org) (LTS version) on your computer
- [ ] Install [VS Code](https://code.visualstudio.com) — free code editor
- [ ] Install the VS Code extension: **Astro** (by Astro)
- [ ] Install Git — comes with VS Code or install from [git-scm.com](https://git-scm.com)

---

### Phase 1 — Foundation & stack setup (11–17 hours)
*Goal: a blank site that deploys automatically when you push to GitHub.*

#### 1.1 Create the Astro project (2–4 hrs)
```
npm create astro@latest cloudplanner.org
```
- Choose: "Empty" template
- Choose: TypeScript → "Strict"
- Push to a new GitHub repo named `cloudplanner.org`

#### 1.2 Connect Vercel (30 min)
- Go to vercel.com → "Add New Project" → import your GitHub repo
- Vercel auto-detects Astro — no config needed
- Every push to `main` auto-deploys to production
- Every pull request gets a preview URL (this is the CI/CD magic)

#### 1.3 Set up 5 Airtable bases (3–5 hrs)
Create one base per content type:
1. **Comparisons** — cloud provider comparisons (AWS vs Azure vs GCP)
2. **FinOps Guides** — long-form guides on cloud cost topics
3. **Calculators** — calculator configs (inputs, formulas, labels)
4. **Architecture Templates** — downloadable diagram templates
5. **Migration Guides** — step-by-step migration playbooks

#### 1.4 Airtable API fetch utility (3–6 hrs)
A small JS file that fetches data from Airtable at build time.
Claude writes this — you review and test it.

#### 1.5 Analytics setup (2–4 hrs)
- Add GA4 measurement ID to global layout
- Add Mixpanel snippet to global layout
- Verify events fire in the browser console

**DevOps highlight:** At the end of Phase 1, pushing one line of code to GitHub automatically rebuilds and redeploys the site. This is the core loop of modern DevOps.

---

### Phase 2 — Page templates (50–74 hours)
*Goal: 5 reusable page types that pull content from Airtable.*

| Template | Hours | Complexity | What it demonstrates |
|---|---|---|---|
| Compare pages | 14–22 | Hard | Comparison tables, FAQ, 3 schema types |
| FinOps guide pages | 8–14 | Medium | Long-form layout, Article schema |
| Calculator pages | 10–18 | Hard | React interactive island, partial hydration |
| Architecture template pages | 6–10 | Medium | File downloads, email capture, lead events |
| Migration guide pages | 8–14 | Medium | HowTo schema, ISO 8601 durations |
| Shared components (nav, footer) | 4–8 | Easy | Build once, reuse everywhere |
| Vercel OG image generation | 4–8 | Medium | Dynamic social preview images |

**How to tackle templates as a beginner:**
1. Ask Claude to generate the first draft of each template
2. Run it locally (`npm run dev`) and see if it works
3. Fix errors one by one — Claude helps you understand each error
4. Once it works, commit and push — Vercel deploys automatically

---

### Phase 3 — Content production (17–33 hours)
*Goal: real content in Airtable that the site pulls in at build time.*

- Write Claude prompts for each content type (3–5 hrs)
- Run prompts, review output, paste into Airtable (8–16 hrs)
- Validate 84 target keywords in Semrush (2–4 hrs)
- Source and upload architecture diagram images (4–8 hrs)

**Tip:** You don't need perfect content to launch. Fill 3–5 rows per Airtable base to start.

---

### Phase 4 — SEO & technical checks (9–21 hours)
*Goal: the site is technically correct before anyone sees it.*

- Run pre-launch checklist across all 5 templates (3–6 hrs)
- Google Rich Results Test — validate all schema types (1–2 hrs)
- Screaming Frog crawl — find broken links and orphan pages (2–4 hrs)
- Sitemap.xml + robots.txt — let Google find all pages (1–3 hrs)
- PageSpeed Insights — fix load speed issues (2–6 hrs)

---

### Phase 5 — Launch (3–5 hours)
*Goal: Google knows your site exists.*

- Set up Google Search Console, verify domain ownership (1–2 hrs)
- Submit sitemap (30 min)
- Request manual indexing for top 20 pages via GSC (1–2 hrs)

---

### Phase 6 — Measure & iterate (6–12 hours)
*Goal: a dashboard that shows what's working.*

- Looker Studio dashboard connecting GA4 + Semrush data (3–6 hrs)
- Airtable → Vercel webhook (auto-rebuild when content changes) (2–4 hrs)
- First competitor content gap analysis in Semrush (1–2 hrs)

---

## GitHub workflow (DevOps-style)

Don't push directly to `main`. Use this pattern — it's what real teams do:

```
main           ← production (what's live on cloudplanner.org)
  └── dev      ← staging (your working branch)
        └── feature/compare-template   ← one branch per feature
        └── feature/calculator-page
        └── fix/nav-mobile-menu
```

**The loop:**
1. Create a feature branch: `git checkout -b feature/compare-template`
2. Build the thing, commit regularly
3. Push the branch → Vercel creates a preview URL automatically
4. When it's working, open a Pull Request to `dev`
5. Review the preview, merge PR → Vercel deploys to staging
6. When stable, merge `dev` → `main` → production deploy

---

## GitHub Actions CI/CD pipeline

Once the project is working, add this pipeline (Claude writes the YAML):

```
On every Pull Request:
  ✓ Run Astro build check (does it compile?)
  ✓ Run linter (is the code clean?)
  ✓ Post preview URL as a PR comment

On merge to main:
  ✓ Build the site
  ✓ Run Lighthouse score check (performance, SEO, accessibility)
  ✓ Deploy to Vercel production
  ✓ Send Slack/email notification
```

This pipeline is what separates a DevOps portfolio from a plain coding portfolio.

---

## What to show employers

When the project is done, you have:

1. **GitHub repo** — commit history, PR history, Actions runs, branch structure
2. **Live URL** — cloudplanner.org (or your Vercel subdomain)
3. **Vercel dashboard** — deployment logs, preview environments, analytics
4. **Looker Studio dashboard** — metrics you're tracking
5. **This ROADMAP.md** — proof you planned it, not just hacked it together

In interviews, walk through: "I set up a CI/CD pipeline where every PR gets a preview environment. Here's one" — then show a GitHub Actions run and a Vercel preview URL. That's the moment that lands jobs.

---

## Suggested order of work

```
Week 1:   Phase 0 + Phase 1 (accounts, scaffold, Vercel, Airtable)
Week 2–4: Phase 2 (templates — this is the bulk of the work)
Week 5:   Phase 3 (content) + Phase 4 start (SEO checks)
Week 6:   Phase 4 finish + Phase 5 (launch)
Week 7+:  Phase 6 (dashboard, automation, iteration)
```

At 10 hours/week: ~7–8 weeks to a fully launched, employer-ready project.
At 5 hours/week: ~14–16 weeks.

---

## Next step

The very first thing to do: **Phase 0 — set up your accounts.**

Once you've got GitHub, Vercel, Airtable, Node.js, and VS Code installed, come back and we'll scaffold the Astro project together. That first `git push` that auto-deploys your site is a great feeling.

---

*Last updated: July 2026*
