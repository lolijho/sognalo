import { ArrowUpRight, CalendarClock, Check, Handshake, ShieldCheck, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Sprint",
    upfront: "€ 1.500",
    share: "4%",
    description: "Per chi vuole mantenere quasi tutto il valore futuro e ridurre il costo iniziale di sviluppo.",
    featured: false,
  },
  {
    name: "Partner",
    upfront: "€ 1.000",
    share: "10%",
    description: "Il punto di equilibrio ideale tra investimento iniziale e condivisione dei risultati.",
    featured: true,
  },
  {
    name: "Launch",
    upfront: "€ 700",
    share: "13%",
    description: "Per partire con un budget leggero, mantenendo una quota ampia dei ricavi generati.",
    featured: false,
  },
  {
    name: "Co-founder",
    upfront: "€ 0",
    share: "50%",
    description: "Diventiamo veri partner: investiamo noi nel progetto e dividiamo i ricavi netti a metà.",
    featured: false,
    partnership: true,
  },
  {
    name: "Mensile",
    upfront: "+15%",
    share: "",
    description: "Preferisci non pagare tutto subito? Diluisci l'anticipo del piano che scegli in rate mensili.",
    featured: false,
    monthly: true,
  },
];

export function Pricing() {
  return (
    <section id="piani" className="relative overflow-hidden bg-[#070b17] px-5 py-28 text-white md:px-8 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-300/15 bg-indigo-300/[.06] px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-indigo-200"><Sparkles className="h-3.5 w-3.5" />Cinque modi per partire</span>
          <h2 className="font-display text-4xl font-bold tracking-[-.05em] md:text-6xl">Investiamo nel potenziale,<br /><span className="text-slate-500">non nelle ore.</span></h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">L'anticipo copre una parte della realizzazione. La nostra vera crescita arriva dai risultati che generiamo insieme.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.name} className={`group relative flex min-h-[460px] flex-col overflow-hidden rounded-[2rem] border p-7 transition duration-500 hover:-translate-y-2 ${plan.featured ? "border-indigo-400/40 bg-gradient-to-b from-indigo-500/20 to-white/[.035] shadow-[0_30px_80px_-35px_rgba(99,102,241,.7)]" : "border-white/[.08] bg-white/[.035] hover:border-white/15"}`}>
              {plan.featured && <span className="absolute right-5 top-5 rounded-full bg-indigo-300 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-indigo-950">Più scelto</span>}
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[.06]">{plan.partnership ? <Handshake className="h-5 w-5 text-emerald-300" /> : plan.monthly ? <CalendarClock className="h-5 w-5 text-sky-300" /> : <ArrowUpRight className="h-5 w-5 text-indigo-300" />}</div>
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="mt-2 min-h-[66px] text-sm leading-relaxed text-slate-400">{plan.description}</p>
              <div className="my-7 border-y border-white/[.08] py-6">
                <span className="block text-xs font-bold uppercase tracking-[.16em] text-slate-500">{plan.monthly ? "Sovrapprezzo sull'anticipo" : "Anticipo"}</span>
                <strong className="mt-1 block text-4xl font-black tracking-[-.05em]">{plan.upfront}</strong>
                {plan.monthly ? (
                  <span className="mt-4 block text-sm text-slate-300">Rate mensili, <b className="text-indigo-300">stesso revenue sharing</b> del piano scelto</span>
                ) : (
                  <span className="mt-4 block text-sm text-slate-300"><b className="text-xl text-indigo-300">{plan.share}</b> sui ricavi netti</span>
                )}
              </div>
              <ul className="mb-7 space-y-3 text-sm text-slate-300">
                <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />Strategia, design e sviluppo</li>
                <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />Supporto al lancio</li>
              </ul>
              <a href="#contatti" className="mt-auto flex items-center justify-between rounded-xl border border-white/10 bg-white/[.055] px-4 py-3 text-sm font-bold transition hover:bg-white/10">Parliamone <ArrowUpRight className="h-4 w-4" /></a>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/[.08] bg-white/[.03] p-5 text-sm leading-relaxed text-slate-400 md:flex-row md:items-center md:p-6">
          <ShieldCheck className="h-6 w-6 shrink-0 text-indigo-300" />
          <p><strong className="text-slate-200">Trasparenza prima di tutto.</strong> I costi operativi e di gestione sono esclusi da tutti i piani. Nel modello 50/50 li anticipiamo noi fino all'arrivo dei primi ricavi e vengono contabilizzati nel progetto. L'opzione Mensile applica un sovrapprezzo del 15% sull'anticipo del piano scelto (es. Sprint: € 1.725 totali, rateizzati). Termini, perimetro e modalità di calcolo sono definiti nel contratto dedicato.</p>
        </div>
      </div>
    </section>
  );
}
