import { CinematicHero } from "@/components/ui/cinematic-landing-hero";

export default function App() {
  return (
    <main id="top" className="min-h-screen overflow-x-clip bg-background">
      <CinematicHero />
      <section id="piani" className="flex min-h-screen items-center justify-center px-6 py-24 text-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.22em] text-indigo-300">Sognalo</p>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-6xl">Il prossimo capitolo inizia qui.</h2>
        </div>
      </section>
      <section id="contatti" className="flex min-h-[70vh] items-center justify-center bg-white/[.025] px-6 py-24 text-center">
        <a className="rounded-2xl bg-white px-7 py-4 font-bold text-slate-950" href="mailto:ciao@sognalo.it">
          Raccontaci la tua idea
        </a>
      </section>
    </main>
  );
}
