# Next.js (App Router) Export for The News LK

This directory contains the production-ready Next.js 14/15 (App Router) files for **The News LK** (`thenews.lk`).

## How to use in Next.js:

1. Create a Next.js project:
   ```bash
   npx create-next-app@latest the-news-lk --typescript --tailwind --eslint --app --src-dir=false
   ```
2. Copy the files:
   - Copy `app/layout.tsx` -> `app/layout.tsx`
   - Copy `app/page.tsx` -> `app/page.tsx`
   - Copy `app/globals.css` -> `app/globals.css`
   - Copy `components/` -> `components/`
   - Copy `/public/favicon.svg` and `/public/og-image.svg` -> `public/`
3. Install dependencies:
   ```bash
   npm install lucide-react
   ```
4. Run locally or deploy:
   ```bash
   npm run dev
   # or deploy with:
   npx vercel
   ```
