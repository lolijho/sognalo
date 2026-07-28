# Sognalo

Landing page cinematografica per Sognalo: una partnership product-tech che trasforma idee in prodotti digitali attraverso anticipi accessibili e revenue sharing.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS
- Struttura shadcn (`src/components/ui`, alias `@/` e `src/lib/utils.ts`)
- GSAP + ScrollTrigger
- Lucide React

## Avvio locale

```bash
npm install
npm run dev
```

Build di produzione:

```bash
npm run build
npm run preview
```

## Deploy su Coolify

Il repository include un'immagine Docker multi-stage pronta per la produzione:

- build Vite eseguita con Node.js 22;
- asset statici serviti da Nginx sulla porta `80`;
- fallback SPA verso `index.html`;
- cache lunga per gli asset versionati e health check integrato.

Configurazione applicazione Coolify:

- **Build pack:** Dockerfile
- **Dockerfile:** `/Dockerfile`
- **Porta esposta:** `80`
- **Branch:** `feat/cinematic-sognalo-landing`

## Struttura UI

Il percorso shadcn predefinito è `src/components/ui`, configurato in `components.json`. Il componente hero si trova in `src/components/ui/cinematic-landing-hero.tsx`; gli stili globali sono in `src/index.css`.

## Modelli commerciali rappresentati

- €1.500 di anticipo + 4% dei ricavi netti
- €1.000 di anticipo + 10% dei ricavi netti
- €700 di anticipo + 13% dei ricavi netti
- €0 di anticipo + 50% dei ricavi netti

I costi operativi e di gestione sono esclusi. Nel modello 50/50 sono anticipati da Sognalo fino ai primi ricavi e contabilizzati nel progetto. I termini definitivi vanno formalizzati contrattualmente.
