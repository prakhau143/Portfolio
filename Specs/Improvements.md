# Portfolio Redesign — Execution Plan

Specs/Phase-0.md is the strategy gate this plan implements. Phase 0 below is
now **locked** — positioning, hero copy, and canonical domain are approved.
Phases 1–6 execute in order, each independently shippable, each verified on
localhost before moving on.

---
## Phase 0 — Strategy & Positioning (LOCKED)

**Positioning statement:**
> Full Stack Engineer for production software — SaaS, AI Applications, APIs, Automation, Cloud Infrastructure.

"Full Stack Developer" is banned from site copy — every instance becomes the
positioning above or a section-appropriate variant of it.

**Hero copy (approved, exact):**
> Full Stack Engineer for production software
> SaaS · AI Applications · APIs · Automation · Cloud Infrastructure

**Canonical production domain: Vercel.** All `og:url`, `canonical`,
`sitemap.xml` entries point at the Vercel deployment URL (exact subdomain
confirmed once the project is linked/deployed on Vercel — placeholder
`https://prakhar-portfolio.vercel.app` used until then).

**Hero proof metrics:** kept as-is (16+, 5+, 3, 4+, 92% at index.html:3077–3100)
until Prakhar supplies real figures — non-blocking, tracked in Open Items.

### Recruiter journey (acceptance test for the whole redesign)

| Window | Question in recruiter's head | What the page must answer |
|---|---|---|
| 5s | Who is this? What do they build? | Hero: positioning line + proof metrics, above fold |
| 30s | Can they build production software? Real backend capability? | Technical Snapshot + Backend Engineering visible on first scroll |
| 60s | Do they understand architecture and scale? Worth interviewing? | Featured case study with architecture diagram + trade-offs, then hiring CTA |

If a section doesn't serve one of these three windows, it's cut.

### Section intent table

| Section | Purpose | Hiring question answered | Desired impression | CTA |
|---|---|---|---|---|
| Hero | Identity + proof in 5s | Who is this, what do they build? | Specialized, credible, senior | Resume · GitHub · Contact |
| Technical Snapshot | Breadth across the stack | Frontend and backend? | Genuinely full stack | Scroll to work |
| Featured Projects | Depth via case studies | Can they build production software? | Owns products end-to-end | Demo · GitHub · Case study |
| How I Build Software | Process maturity | Do they follow engineering process? | Methodical, not ad-hoc | Scroll to backend |
| Backend Engineering | Server-side credibility | Real backend capability? | Systems engineer, not a UI dev | Scroll to infra |
| Infrastructure & DevOps | Ship + operate | Can they deploy and scale? | Owns production, not just code | Scroll to challenges |
| Engineering Challenges | Problem-solving proof | Do they handle hard problems? | Debugs and optimizes for real | Scroll to GitHub |
| GitHub & Open Source | Live evidence | Do they actually ship? | Consistent, active builder | View GitHub |
| Experience | Ownership + impact | Have they delivered in a team? | Trusted with scope | Download resume |
| Engineering Philosophy | Judgment | How do they think? | Mature, opinionated, pragmatic | Scroll to contact |
| Contact | Convert | How do I reach them? | Available, easy to hire | Email · Calendly |

**Engineering identity to emphasize:** product thinking · system design ·
scalability · reliability · security · performance · maintainability ·
observability · automation. Credibility from architecture diagrams, explicit
trade-offs, deployment pipelines, backend systems, problem-solving stories,
stated principles — not adjectives.

**Content rule (every block):** build trust · demonstrate technical depth ·
explain decisions · show impact · encourage the interview. A block failing
all five gets cut.

**Motion rule:** animation must guide attention, explain hierarchy, or
support storytelling. Decorative-only motion is removed (mousemove sparkle
trail — Phase 2).

### What exploration of the codebase found

`public_html/index.html` is 11,922 lines in a single file — ~10,650 inline
CSS/JS, ~1,270 lines actual markup.

1. The "skill percentage bars" the original brief asked to remove don't
   exist as rendered UI — skills are already devicon tiles. But two orphaned
   bar systems still ship as dead code with zero matching markup:
   `.progress-fill` (CSS 67, 86–97, 1153–1157; JS 8188–8240) and
   `.expertise-bars` (CSS 3726–3740; JS 9348–9370).
2. Assets total 444 MB, including 131 MB nothing references. Lighthouse ≥95
   is unreachable at this weight — Phase 1 targets ~80–90 instead, keeping
   the cinematic look.
3. 22 project cards are flat — image + title + one-line description, no
   modal, no detail view. The case-study requirement means building both the
   container and the content (Phase 4 ships structure with TODO copy
   markers; Prakhar drafts real case-study text later — no invented metrics).

---
## Phase 1 — Asset diet

Biggest measurable win, lowest risk. Everything in `public_html/assets/imgs/`.

**Delete (unreferenced, ~131 MB):**
- `10882975-uhd_3840_2160_30fps.mp4` (78 MB)
- `neonroad_endless_loop.glb` (52 MB)
- `public_videos_encryption-bg.webm` (812 KB)
- `space-girl/source/hairspace.blend` (8.2 MB), `destiny-2-character-bust/source/sketchfabTest4.fbx` (2.0 MB) — source files, not runtime assets
- `public_html/back5.html` + `back5_files/` (saved-webpage dump, ~2 MB)
- `public_html/components.html`, `public_html/temp.html` (scratch files)
- `.DS_Store` files, 5 root-level screenshots (~14 MB) — move to docs/ or drop

**Re-encode video to WebM/VP9 + poster stills:**

| File | Now | Target | Used at |
|---|---|---|---|
| contact_panel.mp4 | 97 MB | ~4 MB | index.html:6514 |
| command_skills_about.mp4 | 53 MB | ~3 MB | index.html:3105 |
| github.mp4 | 33 MB | ~2.5 MB | index.html:5659 |
| service_matrix.mp4 | 10 MB | ~1 MB | index.html:4909 (section likely cut — Phase 3) |

```
ffmpeg -i contact_panel.mp4 -vf scale=1920:-2 -c:v libvpx-vp9 -crf 36 -b:v 0 -an contact_panel.webm
ffmpeg -i contact_panel.mp4 -ss 2 -vframes 1 -vf scale=1920:-2 contact_panel_poster.webp
```

Every `<video>` gets `poster=`, `preload="none"` (all below fold), `muted
playsinline loop`. Keep existing IntersectionObserver pausing in
`custom-animations.js`.

**Images:** convert 20 heaviest PNG/JPG to WebP (web-7.png 6.0 MB, hero.png
3.7 MB, ai-news.png 3.7 MB, footer.png 3.4 MB, trading-bot.jpg 3.0 MB, …).
Add `loading="lazy"`, explicit width/height (kills CLS), `decoding="async"`
to every `.bento-img` and cert image.

**Vendors:** `jquery-3.4.1.js` (274 KB) and `bootstrap.bundle.js` (218 KB)
served uncompressed at index.html:6701–6710 — swap to `.min.js`. Drop 943 KB
of `.map` files from deploy. Audit whether isotope (loaded at 6704, unused)
can be removed entirely.

**GLB:** run `gltf-transform optimize` (Draco + texture resize) on
`transformers_...glb` (21 MB) and `fnaf_security_breach_teaser_map.glb`
(13 MB). Both already load lazily.

---
## Phase 2 — Dead code removal

- Delete both orphaned progress-bar systems: CSS 67, 86–97, 1153–1157,
  3726–3740; JS 8188–8199, 8200–8240, 9348–9370.
- Delete contact-3D block at 10846–11062 — guards on `#mc-3d-canvas`, which
  doesn't exist in markup. All 217 lines are a no-op.
- Delete leftover snake state at 11866–11903.
- Remove mousemove sparkle trail at 8027–8036 — appends a DOM node on every
  mousemove. Direct INP hazard and decorative-only motion.
- Fix duplicate `id="home"` (`<body>`:2818 and `<header>`:2824).

---
## Phase 3 — Structure

| Target section | Action | Current |
|---|---|---|
| Hero | Rewrite copy | #home 2824–2930 |
| Technical Snapshot | Rebuild as grouped stacks | #tech-skills 4617–4719 (30 flat tiles) |
| Featured Engineering Projects | Rebuild with case studies | #projects 4970–5182 (22 flat cards) |
| How I Build Software | New | — |
| Backend Engineering | New | — |
| Infrastructure & DevOps | New | — |
| Engineering Challenges Solved | New | — |
| GitHub & Open Source | Keep, retitle | #solar-system 5655–5892 |
| Experience | Tighten copy | #resume 3425–3527 mission-log |
| Engineering Philosophy | New (small) | — |
| Contact | Rewrite CTA | #contact 6508–6697 |

**Cut / merge** (justified against section-intent table):
- `#services` matrix (4905–4967 + CSS 4722–4903 + JS 10738–10839) — agency framing, contradicts engineer positioning. Remove.
- `#skill-stream` marquee (3412–3423 + JS 9847–10006) — duplicates #tech-skills. Remove; content absorbed into Technical Snapshot.
- `#service` certifications carousel (4466–4612 + CSS 4086–4464) — compress from 6-card carousel to compact strip inside Experience.
- `#stats-bar` (3077–3100) — merge 5 counters into Hero as proof metrics.
- `#about` (3102–3409) — trim long biography, keep block, cut prose.

Nav updated in all three hardcoded copies — desktop 2959–2964, mobile drawer
3033–3058, footer 6681–6686. Nav behavior JS at 8243–8343 keys off these
anchors. New nav: HOME / STACK / WORK / PROCESS / GITHUB / CONTACT.

Footer at 6675–6694 is a `<div>` nested inside `#contact`. Promote to a real
`<footer>` element outside `<main>`.

---
## Phase 4 — Content build

**Hero (2824–2930):** replace generic rotating titles with the locked
positioning statement above. Absorb `#stats-bar` counters as 4–6 proof
metrics. Keep blackhole video, constellation canvas, spaceman GLB — visual
identity. CTAs: Resume · GitHub · LinkedIn · Contact.

**Technical Snapshot (replaces #tech-skills):** regroup 30 devicon tiles
into five labeled categories — Frontend / Backend / Database / Cloud / AI.
Reuse `.skill-card` markup and pyramid animation JS at 8346–8452 (retarget
selectors from `.sk-row` to new group containers). Keep `#sk-ai-core` and
stars canvas.

**Featured Projects (replaces #projects):** two tiers —
- Featured (5–6): full case-study cards. Candidates chosen for backend depth — SpendWise AI (5153), InventoryFlow Pro (5163), KYC Verification Platform (5126), AI News Platform (5135), Binance Futures Bot (5173), AI Auto Dialer (5016).
- Archive: remaining ~16 stay as compact bento grid.

Case-study card expands (accordion or modal) into: Problem · Context ·
Solution · Architecture Diagram · Technical Decisions · Engineering
Challenges · Scale · Results · Tech Stack · Demo · GitHub.

Architecture diagrams as inline SVG — sharp at any zoom, themeable, ~2 KB
each, screen-reader accessible via `<title>`/`<desc>`. Shape: Client → API →
Cache → Database → Workers → Storage.

Every case study ships with `<!-- TODO: PRAKHAR TO DRAFT -->` placeholder
copy. No metrics invented.

**How I Build Software · Backend Engineering · Infrastructure & DevOps ·
Engineering Challenges** — four new sections, reusing existing card CSS
(`.about-block`, `.bento-card` patterns):
- How I Build: horizontal pipeline, inline SVG — Idea → Requirements → Architecture → DB Design → Backend → Frontend → Testing → Deployment → Monitoring → Iteration.
- Backend Engineering: capability grid — REST APIs, auth/authz, DB design, Redis, queues, background jobs, payments, search, logging, monitoring, security.
- Infra & DevOps: pipeline diagram — GitHub → CI/CD → Docker → Cloud → DB → CDN → Monitoring. Plus env management, secrets, containers, automated deploys.
- Engineering Challenges: 6–8 concrete problem/solution pairs (query optimization, caching, rate limiting, retry systems, file uploads, background processing). Ships with placeholders — real war stories pending.

**Engineering Philosophy:** short, 5 one-line principles. Reuse `.about-block` styling.

**Contact (6508–6697):** replace generic form header with hiring-focused CTA
("Looking for a Full Stack Engineer?"). Keep terminal card, EmailJS handler
(9175–9222), Calendly, channels.

Security note: EmailJS credentials hardcoded in client source at 9178–9180
(public key by design). Confirm domain allowlisting enabled in EmailJS
dashboard — non-blocking, tracked in Open Items.

---
## Phase 5 — SEO, accessibility, meta

In `<head>` (3–56):
- Move `<title>` (line 30) above JSON-LD block (17–29).
- Fix `og:image` (12) — currently relative `assets/imgs/header.jpg`; needs absolute. Add `og:image:width`, `og:image:height`, `og:image:alt`, `og:locale`.
- Fix `og:url` (14) and canonical (16) — point at **Vercel domain** (locked above), not stale `prakhau143.github.io/Portfolio`.
- Add full Twitter Card set: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`.
- Add `theme-color`.
- Extend JSON-LD beyond Person: add ProfilePage and CreativeWork entries for featured projects.

New files in `public_html/`: `robots.txt`, `sitemap.xml`.

`_redirects` conflict: currently `/* /index.html 200` — swallows
`/robots.txt` and `/sitemap.xml`. Add explicit passthrough rules above it.
Any `public_html/` restructuring must be checked against all three deploy
configs — `.github/workflows/deploy.yml`, root `vercel.json`,
`netlify.toml` — plus `_redirects`.

**Accessibility:**
- Proper heading hierarchy — audit for skipped levels across rewritten sections.
- Alt text on all `.bento-img` and cert images.
- Visible focus states on nav links, bento buttons, form fields.
- WCAG AA contrast check on dark theme — dim-cyan-on-black is the likely failure.
- Real `<footer>` element (Phase 3).
- `prefers-reduced-motion` — extend existing handling to new sections' animations and video autoplay.

---
## Phase 6 — Strategy verification

Re-run the Phase-0 recruiter journey against the finished site.

- 5-second test: screenshot above-the-fold hero at 1440px and 390px. Can a stranger state what this person builds from the image alone?
- 30-second test: scroll for 30s. Is backend capability demonstrated, not just claimed?
- 60-second test: is at least one architecture diagram with explicit trade-offs reachable?
- Walk the section-intent table row by row. Any section failing its own row gets cut or fixed.

---
## Execution order

1. Phase 0 — locked (this document).
2. Phases 1 + 2 (assets, dead code) — mechanical, low risk. Measure Lighthouse before touching structure.
3. Phase 3 (structure: cut sections, update nav, promote footer).
4. Phase 4 (content: new sections + case-study shells with TODO markers).
5. Phase 5 (SEO/a11y) — last, so meta describes the final page.
6. Phase 6 (strategy verification).

Each phase independently shippable. Localhost review after every phase
before moving to the next; no push until explicitly approved.

---
## Verification

Per phase: serve locally via `python3 -m http.server 4200` from
`public_html/` (matches `.claude/launch.json`). Visual check every section
before/after — core constraint is preserving 70–80% of visual language.

- **Phase 1:** `du -sh public_html/assets` before/after (baseline 444 MB). Confirm every video plays, every GLB loads — check console for 404s after deletions.
- **Phase 2:** console clean, zero visual change (code-only removal).
- **Phase 3:** click every nav link in all three copies; each scrolls to a section that still exists. Verify active-link highlighting still tracks (JS 8243–8343).
- **Phase 4:** keyboard-only pass — Tab through every case-study expander and contact form. `grep -c "TODO: PRAKHAR TO DRAFT" public_html/index.html` confirms no placeholder shipped forgotten.
- **Phase 5:** Lighthouse in Chrome DevTools (mobile preset, all categories). Validate meta with Twitter/OG card debugger. Curl deployed `/robots.txt` and `/sitemap.xml` — must return text, not HTML.

Final gate: all three deploy targets still serve correctly — GitHub Pages, Vercel, Netlify.

---
## Open items for Prakhar

Non-blocking (execution proceeds without these; revisit before final ship):
- [ ] Exact Vercel deployment subdomain (or custom domain) once linked/deployed
- [ ] Meaning + current accuracy of the 5 hero metrics (16+, 5+, 3, 4+, 92%)
- [ ] Case-study copy for the 5–6 featured projects (problem / decisions / scale / results)
- [ ] Engineering Challenges war stories (6–8)
- [ ] Confirm EmailJS domain allowlisting is on
