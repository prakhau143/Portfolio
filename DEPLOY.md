# Deploy Portfolio to Vercel or Netlify

Your portfolio is ready to deploy. The site lives in **`public_html/`** (HTML, CSS, JS, images).

---

## Option A: Vercel (recommended)

### 1. Push to GitHub
```bash
git add .
git commit -m "Deploy config for Vercel/Netlify"
git push origin main
```

### 2. Deploy on Vercel
1. Go to **[vercel.com](https://vercel.com)** and sign in (GitHub).
2. Click **Add New… → Project**.
3. Import your **Prakhar_portfolio** repo.
4. Leave **Root Directory** as **`.`** (repo root).  
   The repo’s `vercel.json` already points the app to `public_html/`.
5. Click **Deploy**. No build command or env vars needed.
6. Your site will be live at `https://your-project.vercel.app`.

### Alternative: Root Directory = `public_html`
- In Project Settings → General, set **Root Directory** to **`public_html`**.
- Then Vercel uses `public_html/vercel.json` and serves files from that folder. You can remove the `rewrites` from the repo-root `vercel.json` if you use this.

---

## Option B: Netlify

### 1. Push to GitHub
```bash
git add .
git commit -m "Deploy config for Netlify"
git push origin main
```

### 2. Deploy on Netlify
1. Go to **[netlify.com](https://netlify.com)** and sign in (e.g. GitHub).
2. **Add new site → Import an existing project**.
3. Choose **GitHub** and select **Prakhar_portfolio**.
4. Netlify will read **`netlify.toml`** in the repo:
   - **Publish directory:** `public_html`
   - **Build command:** (optional; static site)
5. Click **Deploy site**.
6. Your site will be at `https://random-name.netlify.app` (you can rename it in Site settings).

---

## After deployment

- **Vercel:** Project → Settings → Domains to add a custom domain.
- **Netlify:** Site → Domain management to add a custom domain.
- Push to `main` triggers a new deploy on both.
