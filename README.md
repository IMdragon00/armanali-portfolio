# Arman Ali portfolio (React 19 + Framer Motion 12 + esbuild)

## Commands
- `npm install`: install dependencies
- `npm run dev`: dev server with rebuild on change (http://localhost:3000)
- `npm run build`: production build into `dist/`
- `npm run check`: build, then verify required files, canonical URL and that no reference-site details remain

## Edit your content
- `src/config/site.js`: name, headline, bio, skills, metrics, email, social links, portrait path
- `src/data/projects.js`: real projects only (template inside). Empty list shows an honest "coming soon" panel
- `src/data/experience.js`: timeline
- `public/assets/`: portrait.webp and og-image.jpg (replace with your own)

## Swarm effect
The header "Motion" button lazy-loads `public/vendor/swarmline.js` (Swarmline, MIT, see SWARMLINE-LICENSE and SWARMLINE-NOTICE.md in that folder) and rebuilds the page with a swarm of cursors. Esc exits. "FX: on/off" toggles the site's own animations (saved in localStorage).

## Deploy to Vercel
Framework preset "Other", build command `npm run build`, output directory `dist` (already set in vercel.json).
