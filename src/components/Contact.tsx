import { ArrowRight, Mail, Sparkles } from "lucide-react";

export function Contact() {
  return (
    <section id="contatti" className="relative overflow-hidden bg-[#070b17] px-5 py-28 text-white md:px-8 md:py-40">
      <div className="absolute left-1/2 top-1/2 h-[440px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[150px]" />
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-indigo-500/15 via-white/[.04] to-transparent px-6 py-16 text-center shadow-[0_50px_120px_-60px_rgba(76,89,255,.9)] md:px-12 md:py-24">
        <Sparkles className="mx-auto h-7 w-7 text-indigo-300" />
        <h2 className="mx-auto mt-7 max-w-3xl font-display text-4xl font-bold tracking-[-.055em] md:text-6xl">La prossima grande idea potrebbe essere la tua.</h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">Raccontacela. La prima conversazione serve a capire potenziale, fattibilità e quale partnership può portarla più lontano.</p>
        <a href="mailto:ciao@sognalo.it?subject=Ho%20un'idea%20da%20realizzare" className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 font-bold text-slate-950 shadow-xl shadow-black/30 transition hover:-translate-y-1"><Mail className="h-5 w-5" />ciao@sognalo.it<ArrowRight className="h-5 w-5" /></a>
      </div>
    </section>
  );
}
