import { CinematicHero } from "@/components/ui/cinematic-landing-hero";

const models = [
  {
    number: "01",
    title: "Build together",
    description: "Dalla validazione al lancio: strategia, design e sviluppo in un unico team.",
  },
  {
    number: "02",
    title: "Shared upside",
    description: "Riduciamo il costo iniziale e partecipiamo alla crescita del prodotto insieme a te.",
  },
  {
    number: "03",
    title: "Scale with us",
    description: "Continuiamo a migliorare tecnologia, conversioni e processi dopo il go-live.",
  },
];

export default function App() {
  return (
    <main id="top" className="min-h-screen overflow-x-clip bg-background">
      <CinematicHero />

      <section id="piani" className="relative px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-indigo-300">
              Un modello per ogni idea
            </p>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-[-.04em] md:text-6xl">
              Il prossimo capitolo inizia qui.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              Costruiamo il percorso adatto alla tua fase, alle risorse disponibili e agli obiettivi di crescita.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
            {models.map((model) => (
              <article key={model.number} className="bg-background p-8 md:p-10">
                <span className="text-sm font-bold text-indigo-300">{model.number}</span>
                <h3 className="mt-10 font-display text-2xl font-bold text-white">{model.title}</h3>
                <p className="mt-4 leading-relaxed text-slate-400">{model.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contatti" className="px-6 pb-12 md:px-10 md:pb-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 rounded-[2rem] border border-white/10 bg-white/[.035] px-8 py-12 md:flex-row md:items-center md:px-12 md:py-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.22em] text-indigo-300">Parliamone</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-[-.03em] md:text-5xl">
              Raccontaci dove vuoi arrivare.
            </h2>
          </div>
          <a
            className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-white px-7 py-4 font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            href="mailto:ciao@sognalo.it"
          >
            Raccontaci la tua idea
          </a>
        </div>
      </section>
    </main>
  );
}
