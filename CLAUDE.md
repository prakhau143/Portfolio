# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo root

Actual project root is this `Portfolio/` directory (has `.git`, `package.json`). The parent `Prakhar-Portfolio/` dir is just a container — always `cd` here first if invoked from parent.

## Commands

```bash
npm install       # install gulp toolchain (optional, only needed for build/watch)
npm start         # runs `gulp` default watch task via browser-sync, serves public_html on local port
npx gulp build    # compile scss, minify/concat css+js, compress images -> public_html/dist
npx gulp sass     # compile scss only
npx gulp watch    # dev server + live reload (browser-sync)
```

No test suite, no linter configured. This is a static site — there is no build step required to view it; `public_html/index.html` can be opened/served directly. The gulp pipeline (scss compile, minify, image compress) is optional and only affects `public_html/dist/`, which is not what's actually deployed (deploys serve `public_html/` directly, unminified).

To preview locally without gulp: `python3 -m http.server` from `public_html/` (see `.claude/launch.json` — VS Code debug config already does this on port 4200).

## Architecture

This is a **single-file portfolio site**: nearly all markup, inline styles, and structure live in `public_html/index.html` (~11,900 lines). It is not a component framework app — sections are large inline blocks within one HTML file, styled with a mix of inline `<style>` and the SCSS in `assets/scss/` (compiles to `assets/css/johndoe.css`; `custom-animations.css/js` is separately maintained, not part of the SCSS pipeline).

Key JS files (`public_html/assets/js/`):
- `johndoe.js` — base theme scripts (from original Bootstrap template this was forked from)
- `custom-animations.js` — hero/section-specific animation logic (constellation canvas, cyberpunk cursor, IntersectionObserver-gated video/3D pausing)
- `solar-system-3d.js` — standalone Three.js interactive solar system module

3D/video content (GLB models via Three.js GLTFLoader + AnimationMixer, large MP4 backgrounds) is intentionally heavy — Lighthouse performance is knowingly traded for cinematic effect (see README's Lighthouse section for the rationale and the specific optimizations already applied, e.g. IntersectionObserver pausing, `preload="metadata"`, `prefers-reduced-motion` handling).

`components.html` and `temp.html` in `public_html/` are scratch/reference files, not part of the live site.

## Deployment (triple-configured, keep in sync if changing paths)

- **GitHub Pages**: `.github/workflows/deploy.yml` — pushes `public_html/` to `gh-pages` branch on push to `main`.
- **Vercel**: root `vercel.json` rewrites `/(.*)` → `/public_html/$1` with Root Directory left at repo root. There's also a `public_html/vercel.json` used only if Vercel's Root Directory is instead set to `public_html` — don't need both active at once (see `DEPLOY.md`).
- **Netlify**: `netlify.toml` sets publish dir to `public_html` directly, no rewrite needed.

Any restructuring of `public_html/` must be checked against all three configs, plus the `_redirects` file in `public_html/`.

## Content editing

Site copy (name, links, EmailJS keys, skills arrays `BD=[...]`/`FD=[...]` for the GitHub "AI Champions League" arena simulation, project cards, certifications) all live directly inside `public_html/index.html` — see README.md's "Customize Content" table for exact search markers.

## Active redesign spec

`Specs/Improvements.md` contains a pending redesign brief: reposition the site from generic portfolio to a recruiter-facing "engineering product" — replacing skill-percentage bars with grouped stacks, turning each project into a full case study (problem/architecture/trade-offs/results), adding backend/infra/DevOps sections with pipeline diagrams, and removing decorative-only elements. Treat this as the north star for any content/structure work unless told otherwise. Target Lighthouse: Performance ≥95, Accessibility ≥95, Best Practices/SEO =100, LCP <2.5s, CLS <0.1, INP <200ms (current perf score is 64, intentionally, per README — reconcile with the user before trading cinematic assets for this target).
