# Sognalo

Frontend React configurato con Vite, TypeScript strict, Tailwind CSS e shadcn/ui.

## Sviluppo

Richiede Node.js 20 o successivo.

```bash
npm install
npm run dev
```

## Verifiche

```bash
npm run typecheck
npm run lint
npm run build
```

## shadcn/ui

La configurazione è in `components.json`. I componenti riutilizzabili sono collocati in `src/components/ui` e possono essere aggiunti con:

```bash
npx shadcn@latest add <componente>
```

Gli import interni usano l'alias `@/`, configurato sia in TypeScript sia in Vite.
