# Sognalo

Landing page cinematografica per Sognalo: una partnership product-tech che trasforma idee in prodotti digitali attraverso anticipi accessibili e revenue sharing.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS
- Struttura shadcn (`src/components/ui`, alias `@/` e `src/lib/utils.ts`)
- GSAP + ScrollTrigger
- Lucide React
- Backend Express (`server.js`) per il form di contatto via [Resend](https://resend.com)

## Avvio locale

```bash
npm install
npm run dev
```

Build di produzione e avvio del server Express:

```bash
npm run build
RESEND_API_KEY=... npm start
```

Il server serve gli asset statici da `dist/` sulla porta `3000` (configurabile con `PORT`) ed espone `POST /api/contact`, che inoltra le richieste del form via Resend. Senza `RESEND_API_KEY` il sito funziona ma il form restituisce errore.

## Deploy su Coolify

Il repository include un'immagine Docker multi-stage pronta per la produzione:

- build Vite eseguita con Node.js 22 (`npm ci`, build riproducibili dal lockfile);
- server Express che serve gli asset con cache lunga per i file versionati e fallback SPA;
- rate limiting sul form di contatto (5 richieste/15 minuti per IP) e header di sicurezza;
- health check integrato.

Configurazione applicazione Coolify:

- **Build pack:** Dockerfile
- **Dockerfile:** `/Dockerfile`
- **Porta esposta:** `80` (Coolify imposta `PORT=80`; il server e l'healthcheck la seguono)
- **Variabili d'ambiente:** `RESEND_API_KEY` (obbligatoria per il form)

Il server è configurato con `trust proxy` per funzionare correttamente dietro il reverse proxy di Coolify.

## Struttura UI

Il percorso shadcn predefinito è `src/components/ui`, configurato in `components.json`. Il componente hero si trova in `src/components/ui/cinematic-landing-hero.tsx`; gli stili globali sono in `src/index.css`. Le pagine sono in `src/pages` (`/` e `/come-funziona`).

## Modelli commerciali rappresentati

- **Sprint** — €1.500 di anticipo + 4% dei ricavi netti
- **Partner** — €1.000 di anticipo + 10% dei ricavi netti
- **Launch** — €700 di anticipo + 13% dei ricavi netti
- **Co-founder** — €0 di anticipo + 50% dei ricavi netti
- **Mensile** — anticipo del piano scelto rateizzato in mensilità, con sovrapprezzo del 15%; il revenue sharing resta quello del piano scelto

I costi operativi e di gestione sono esclusi. Nel modello 50/50 sono anticipati da Sognalo fino ai primi ricavi e contabilizzati nel progetto. I termini definitivi vanno formalizzati contrattualmente.
