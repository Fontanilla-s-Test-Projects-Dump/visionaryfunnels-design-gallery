# VisionaryFunnels design gallery

Ten visual directions for the same VisionaryFunnels operating-systems site.
Each design is a separate static Next.js site with its own Home, Airtable, and
Construction routes:

- `/skeuomorphic/`
- `/neumorphic/`
- `/glassmorphic/`
- `/claymorphic/`
- `/minimalist/`
- `/maximalist/`
- `/brutalist/`
- `/liquid/`
- `/bento/`
- `/spatial/`

## Local build

```text
npm ci
npm run build:pages
```

The script writes a static gallery to `docs/`. GitHub Pages builds the same
artifact through the workflow in `.github/workflows/pages.yml`.

The booking forms preserve their Calendly handoff. The original server-only
lead endpoint is intentionally excluded from this static Pages deployment.
