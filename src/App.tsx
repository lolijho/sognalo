import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <section className="max-w-xl space-y-6 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Sognalo</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Il progetto è pronto.</h1>
        <p className="text-lg text-muted-foreground">
          React, TypeScript, Tailwind CSS e shadcn/ui sono configurati e pronti per lo sviluppo.
        </p>
        <Button asChild size="lg">
          <a href="https://ui.shadcn.com/docs" target="_blank" rel="noreferrer">
            Esplora shadcn/ui
          </a>
        </Button>
      </section>
    </main>
  );
}
