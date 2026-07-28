# Sognalo

Landing React con hero cinematografica animata.

## Stack

- React 18, TypeScript e Vite
- Tailwind CSS 3
- Struttura shadcn (`src/components/ui`, alias `@/`, utility `cn`)
- GSAP con ScrollTrigger
- Lucide React

## Sviluppo

```bash
npm install
npm run dev
```

Verifica di produzione e lint:

```bash
npm run build
npm run lint
```

Il componente riutilizzabile è disponibile in `src/components/ui/cinematic-landing-hero.tsx` ed è montato in `src/App.tsx`. Supporta props per brand, headline, contenuto della card, metrica e CTA.

La configurazione shadcn è in `components.json`; Tailwind scansiona `index.html` e tutti i file TypeScript/TSX sotto `src`.
