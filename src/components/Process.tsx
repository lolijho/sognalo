import { ChartNoAxesCombined, Code2, Compass, PenTool } from "lucide-react";

const steps = [
  { icon: Compass, number: "01", title: "Validiamo", text: "Mettiamo alla prova problema, pubblico e modello di ricavo prima di sprecare budget." },
  { icon: PenTool, number: "02", title: "Progettiamo", text: "Disegniamo identità, esperienza e roadmap intorno agli obiettivi del prodotto." },
  { icon: Code2, number: "03", title: "Costruiamo", text: "Sviluppiamo un prodotto solido, veloce e pronto a evolvere con utenti reali." },
  { icon: ChartNoAxesCombined, number: "04", title: "Cresciamo", text: "Lanciamo, misuriamo e miglioriamo. Il nostro ritorno dipende anche dal tuo successo." },
];

export function Process() {
  return (
    <section className="border-y border-white/[.06] bg-[#090e1b] px-5 py-28 text-white md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div>
            <span className="text-xs font-bold uppercase tracking-[.22em] text-indigo-300">Un solo team, dall'inizio alla crescita</span>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-[-.05em] md:text-6xl">Meno passaggi.<br />Più <span className="text-slate-500">prodotto.</span></h2>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-slate-400">Non consegniamo semplicemente un sito o un'app. Costruiamo il veicolo con cui la tua idea può trovare spazio nel mercato.</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/[.08] bg-white/[.08] sm:grid-cols-2">
            {steps.map(({ icon: Icon, number, title, text }) => (
              <article key={number} className="group bg-[#0b1120] p-7 transition hover:bg-[#10182b] md:p-9">
                <div className="flex items-start justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[.04]"><Icon className="h-5 w-5 text-indigo-300" /></span><span className="font-mono text-xs text-slate-600">{number}</span></div>
                <h3 className="mt-10 text-2xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
