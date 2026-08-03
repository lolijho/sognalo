import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Code2, Mail, Server, Shield, Zap } from "lucide-react";
import { Footer } from "@/components/Footer";

const steps = [
  {
    icon: Mail,
    number: "01",
    title: "Compili il form",
    text: "Inserisci nome, email, un messaggio descrivendo la tua idea e (opzionale) il piano di tuo interesse. I dati restano sul tuo dispositivo fino al momento dell'invio.",
  },
  {
    icon: Server,
    number: "02",
    title: "Il server riceve la richiesta",
    text: "Il backend Express valida ogni campo: nome, email (con regex), messaggio e piano. Input sanificato con escaping HTML per prevenire injection. Se qualcosa non va, ricevi un errore immediato.",
  },
  {
    icon: Zap,
    number: "03",
    title: "Resend recapita l'email",
    text: "I dati validati vengono formattati in una email HTML professionale e inviati tramite l'API di Resend. Il mittente è noreply@costanza.dev, il reply-to è la tua email: puoi rispondere direttamente.",
  },
  {
    icon: Check,
    number: "04",
    title: "Ricevi una risposta",
    text: "Il team di Sognalo legge la tua richiesta e ti risponde all'email che hai fornito. Nessun dato viene salvato o condiviso con terzi: l'email viene recapitata e basta.",
  },
];

const features = [
  {
    icon: Shield,
    title: "Validazione lato server",
    text: "Ogni campo viene controllato anche sul backend, non solo nel browser. Lunghezza massima, formato email, sanitizzazione HTML: nessun input malevolo passa.",
  },
  {
    icon: Code2,
    title: "API REST pulita",
    text: "L'endpoint POST /api/contact accetta JSON, risponde con JSON. Nessuna dipendenza da servizi proprietari opachi: il codice è tutto nel repository.",
  },
  {
    icon: Mail,
    title: "Resend come provider",
    text: "Usiamo Resend per la deliverability: le email arrivano, non finiscono in spam. Il mittente è verificato e l'integrazione è via API key (mai nel codice frontend).",
  },
  {
    icon: Zap,
    title: "Zero storage, zero tracking",
    text: "I dati del form non vengono salvati in database né registrati in log. Vengono letti, inviati via email e dimenticati. Niente cookie, niente analytics sui form.",
  },
];

export function ComeFunzionaPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-background text-white">
      {/* Header */}
      <header className="border-b border-white/[.07] bg-[#050811] px-5 py-5 md:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Torna al sito
          </Link>
          <img src="https://storage.costanza.dev/sognalo/logo.svg" alt="Sognalo" className="h-6 w-auto brightness-0 invert" />
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#070b17] px-5 py-24 md:px-8 md:py-32">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[150px]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-300/15 bg-indigo-300/[.06] px-4 py-2 text-xs font-bold uppercase tracking-[.22em] text-indigo-200">
            <Mail className="h-3.5 w-3.5" />
            Trasparenza tecnica
          </span>
          <h1 className="font-display text-4xl font-bold tracking-[-.05em] md:text-6xl">
            Come funziona <span className="text-silver-matte bg-gradient-to-b from-white to-indigo-300 bg-clip-text text-transparent">l'invio delle richieste</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
            Ogni richiesta che invii dal form di contatto attraversa un percorso preciso e sicuro. Ecco cosa succede, passo dopo passo.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="border-y border-white/[.06] bg-[#090e1b] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-[.22em] text-indigo-300">Il flusso</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-[-.05em] md:text-5xl">Dal form alla tua casella</h2>
          </div>

          <div className="space-y-4">
            {steps.map(({ icon: Icon, number, title, text }) => (
              <div
                key={number}
                className="group flex flex-col gap-4 rounded-[1.5rem] border border-white/[.08] bg-white/[.025] p-6 transition hover:border-white/15 hover:bg-white/[.04] md:flex-row md:items-center md:gap-8 md:p-8"
              >
                <div className="flex items-center gap-4 md:w-64 md:shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[.04]">
                    <Icon className="h-5 w-5 text-indigo-300" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-slate-600">{number}</span>
                    <h3 className="text-lg font-bold md:text-xl">{title}</h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-400 md:text-base">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture diagram */}
      <section className="bg-[#070b17] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[.22em] text-indigo-300">Architettura</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-[-.05em] md:text-5xl">Il percorso dei dati</h2>
          </div>

          <div className="rounded-[2rem] border border-white/[.08] bg-[#0b1120] p-6 md:p-10">
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-2">
              {[
                { label: "Browser", sub: "Form HTML", icon: Code2 },
                { label: "Server", sub: "Express + validazione", icon: Server },
                { label: "Resend API", sub: "Deliverability", icon: Zap },
                { label: "Casella email", sub: "Lettura e risposta", icon: Mail },
              ].map((node, i, arr) => (
                <div key={node.label} className="flex items-center gap-4 md:gap-2">
                  <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[.04] px-5 py-4 text-center">
                    <node.icon className="h-6 w-6 text-indigo-300" />
                    <span className="text-sm font-bold">{node.label}</span>
                    <span className="text-[11px] text-slate-500">{node.sub}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <ArrowRight className="h-5 w-5 rotate-90 text-slate-600 md:rotate-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/[.06] bg-[#090e1b] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-[.22em] text-indigo-300">Sicurezza e qualità</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-[-.05em] md:text-5xl">Perché puoi fidarti</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-[1.5rem] border border-white/[.08] bg-white/[.025] p-7 transition hover:border-white/15 hover:bg-white/[.04]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[.04]">
                  <Icon className="h-5 w-5 text-indigo-300" />
                </div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#070b17] px-5 py-24 text-center md:px-8 md:py-32">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-[-.05em] md:text-5xl">Pronto a inviare la tua idea?</h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-slate-400 md:text-lg">
            Il form è in fondo alla pagina principale. Bastano nome, email e un messaggio.
          </p>
          <Link
            to="/#contatti"
            className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 font-bold text-slate-950 shadow-xl shadow-black/30 transition hover:-translate-y-1"
          >
            <Mail className="h-5 w-5" />
            Vai al form
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
