import { ArrowLeft, Check, Code2, Globe, KeyRound, Layers, Lock, Mail, Server, ShieldCheck, Zap } from "lucide-react";

const LOGO_URL = "https://storage.costanza.dev/sognalo/logo.svg";

const flowSteps = [
  {
    icon: Mail,
    number: "01",
    title: "Composizione del messaggio",
    description:
      "L'utente compone l'email direttamente nell'interfaccia di Sognalo: destinatario, oggetto, corpo del messaggio e allegati opzionali. I dati vengono raccolti in un payload strutturato prima dell'invio.",
    code: `const emailPayload = {
  to: "destinatario@example.com",
  subject: "Benvenuto in Sognalo",
  html: "<h1>Ciao!</h1><p>Il tuo prodotto è pronto.</p>",
  attachments: [...]
};`,
  },
  {
    icon: KeyRound,
    number: "02",
    title: "Autenticazione con API Key",
    description:
      "Ogni richiesta verso Resend è autenticata tramite una API Key personale, generata dalla dashboard Resend e memorizzata in modo sicuro lato server. La chiave non viene mai esposta al client.",
    code: `const RESEND_API_KEY = process.env.RESEND_API_KEY;

const response = await fetch("https://api.resend.com/emails", {
  headers: {
    "Authorization": \`Bearer \${RESEND_API_KEY}\`,
    "Content-Type": "application/json"
  }
});`,
  },
  {
    icon: Server,
    number: "03",
    title: "Invio della richiesta HTTP",
    description:
      "Il server inoltra il payload all'endpoint POST https://api.resend.com/emails. Resend riceve la richiesta, valida i campi e accetta il messaggio nella propria coda di spedizione.",
    code: `POST /emails HTTP/1.1
Host: api.resend.com
Authorization: Bearer re_xxxxxxxxxxxx
Content-Type: application/json

{
  "from": "Sognalo <noreply@sognalo.it>",
  "to": "destinatario@example.com",
  "subject": "Benvenuto in Sognalo",
  "html": "<h1>Ciao!</h1>"
}`,
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Verifica SPF, DKIM e DMARC",
    description:
      "Prima di consegnare l'email ai provider di destinazione, Resend firma il messaggio con DKIM e verifica che il dominio del mittente abbia i record SPF e DMARC corretti. Questo garantisce che l'email sia autentica e riduce drasticamente il rischio di finire nello spam.",
    code: `;; Record DNS del dominio sognalo.it

;; SPF — autorizza i server di Resend
TXT @ "v=spf1 include:amazonses.com ~all"

;; DKIM — firma crittografica del messaggio
TXT resend._domainkey "v=DKIM1; k=rsa; p=MIGfMA0..."

;; DMARC — policy di allineamento
TXT _dmarc "v=DMARC1; p=quarantine; rua=mailto:dmarc@sognalo.it"`,
  },
  {
    icon: Zap,
    number: "05",
    title: "Consegna al provider di destinazione",
    description:
      "Resend instrada il messaggio verso il server SMTP del destinatario (Gmail, Outlook, ecc.) attraverso la propria infrastruttura su AWS SES. Il provider di destinazione effettua un ultimo controllo anti-spam e consegna l'email nella casella del destinatario.",
    code: `// Risposta di successo da Resend
{
  "id": "d0e3c8f1-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "from": "Sognalo <noreply@sognalo.it>",
  "to": "destinatario@example.com",
  "created_at": "2025-01-15T10:30:00.000Z"
}`,
  },
  {
    icon: Layers,
    number: "06",
    title: "Tracciamento e webhook",
    description:
      "Resend traccia ogni evento del ciclo di vita dell'email: inviata, consegnata, aperta, cliccata, respinta. Gli eventi possono essere ricevuti in tempo reale tramite webhook per monitorare l'efficacia delle comunicazioni.",
    code: `// Webhook da configurare su Resend
// POST https://sognalo.it/api/webhooks/resend

{
  "type": "email.delivered",
  "data": {
    "email_id": "d0e3c8f1-xxxx-xxxx",
    "to": "destinatario@example.com",
    "created_at": "2025-01-15T10:30:02.000Z"
  }
}`,
  },
];

const advantages = [
  {
    icon: Zap,
    title: "Velocità di consegna",
    text: "Resend instrada le email attraverso l'infrastruttura AWS SES, garantendo tempi di consegna medi inferiori a 2 secondi.",
  },
  {
    icon: ShieldCheck,
    title: "Deliverability elevata",
    text: "La gestione automatica di SPF, DKIM e DMARC assicura che le email raggiungano la casella di posta e non lo spam.",
  },
  {
    icon: Lock,
    title: "Sicurezza delle API Key",
    text: "Le chiavi API sono memorizzate esclusivamente lato server e mai esposte al browser. Comunicazione sempre su HTTPS/TLS.",
  },
  {
    icon: Globe,
    title: "Dominio verificato",
    text: "L'invio avviene da un dominio verificato (sognalo.it), non da indirizzi generici, aumentando la fiducia dei provider.",
  },
];

export function ResendInfo() {
  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[.07] bg-[#050811]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#/" className="flex items-center gap-2.5">
            <img src={LOGO_URL} alt="Sognalo" className="h-7 w-auto" />
          </a>
          <a
            href="#/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.06] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna alla home
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-5 py-28 text-white md:px-8 md:py-40">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-600/12 blur-[150px]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-300/15 bg-indigo-300/[.06] px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-indigo-200">
            <Mail className="h-3.5 w-3.5" />
            Infrastruttura email
          </span>
          <h1 className="font-display text-4xl font-bold tracking-[-.05em] md:text-6xl">
            Come funziona l'invio email
            <br />
            <span className="text-slate-500">con Resend</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
            Ogni email inviata dalla piattaforma Sognalo attraversa un processo preciso in sei fasi,
            dall'interfaccia utente alla casella di posta del destinatario. Ecco il meccanismo completo.
          </p>
        </div>
      </section>

      {/* Architettura overview */}
      <section className="border-y border-white/[.06] bg-[#090e1b] px-5 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl font-bold tracking-[-.04em] md:text-5xl">
            Architettura del flusso
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-slate-400 md:text-lg">
            Il sistema combina un frontend React, un backend sicuro per la gestione delle credenziali
            e l'API di Resend per la spedizione effettiva.
          </p>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {[
              { icon: Globe, label: "Frontend (Browser)", desc: "L'utente compone l'email nell'interfaccia web di Sognalo." },
              { icon: Server, label: "Backend (Server)", desc: "Il server valida, firma e inoltra la richiesta a Resend tramite API." },
              { icon: Mail, label: "Resend API → SMTP", desc: "Resend consegna l'email al provider di destinazione su infrastruttura AWS SES." },
            ].map((node, i) => (
              <div key={node.label} className="relative">
                <div className="flex h-full flex-col items-center rounded-[2rem] border border-white/[.08] bg-[#0b1120] p-8 text-center transition hover:border-white/15">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[.04]">
                    <node.icon className="h-6 w-6 text-indigo-300" />
                  </span>
                  <h3 className="mt-6 text-lg font-bold">{node.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{node.desc}</p>
                </div>
                {i < 2 && (
                  <div className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-indigo-400/50 md:block">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-step flow */}
      <section className="relative overflow-hidden bg-[#070b17] px-5 py-28 text-white md:px-8 md:py-36">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/8 blur-[140px]" />
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-300/15 bg-indigo-300/[.06] px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-indigo-200">
              <Code2 className="h-3.5 w-3.5" />
              Step by step
            </span>
            <h2 className="font-display text-3xl font-bold tracking-[-.04em] md:text-5xl">
              Le sei fasi dell'invio
            </h2>
          </div>

          <div className="space-y-6">
            {flowSteps.map((step) => (
              <article
                key={step.number}
                className="group overflow-hidden rounded-[2rem] border border-white/[.08] bg-[#0b1120] transition hover:border-white/15"
              >
                <div className="flex flex-col gap-6 p-7 md:p-9 lg:flex-row lg:gap-10">
                  {/* Left: description */}
                  <div className="flex-1 lg:max-w-md">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[.04]">
                        <step.icon className="h-5 w-5 text-indigo-300" />
                      </span>
                      <span className="font-mono text-sm text-slate-600">{step.number}</span>
                    </div>
                    <h3 className="mt-6 text-2xl font-bold tracking-tight">{step.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400 md:text-base">{step.description}</p>
                  </div>
                  {/* Right: code block */}
                  <div className="flex-1 overflow-hidden rounded-2xl border border-white/[.06] bg-[#06090f]">
                    <div className="flex items-center gap-2 border-b border-white/[.06] px-4 py-3">
                      <span className="h-3 w-3 rounded-full bg-red-400/60" />
                      <span className="h-3 w-3 rounded-full bg-amber-400/60" />
                      <span className="h-3 w-3 rounded-full bg-emerald-400/60" />
                      <span className="ml-2 text-xs font-mono text-slate-500">code</span>
                    </div>
                    <pre className="overflow-x-auto p-5 text-xs leading-relaxed text-slate-300 md:text-sm">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="border-y border-white/[.06] bg-[#090e1b] px-5 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-300/15 bg-indigo-300/[.06] px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-indigo-200">
              <ShieldCheck className="h-3.5 w-3.5" />
              Perché Resend
            </span>
            <h2 className="font-display text-3xl font-bold tracking-[-.04em] md:text-5xl">
              Vantaggi dell'infrastruttura
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {advantages.map((adv) => (
              <article
                key={adv.title}
                className="group rounded-[2rem] border border-white/[.08] bg-[#0b1120] p-7 transition hover:-translate-y-2 hover:border-white/15"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[.04]">
                  <adv.icon className="h-5 w-5 text-indigo-300" />
                </span>
                <h3 className="mt-8 text-lg font-bold">{adv.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{adv.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Summary checklist */}
      <section className="bg-[#070b17] px-5 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display text-3xl font-bold tracking-[-.04em] md:text-4xl">
            In sintesi
          </h2>
          <ul className="mt-12 space-y-4">
            {[
              "L'utente compone l'email nell'interfaccia di Sognalo.",
              "Il server autentica la richiesta con una API Key Resend (mai esposta al client).",
              "Il payload viene inviato a POST https://api.resend.com/emails.",
              "Resend firma il messaggio con DKIM e verifica SPF/DMARC del dominio mittente.",
              "L'email viene consegnata al provider di destinazione tramite infrastruttura AWS SES.",
              "Gli eventi (consegna, apertura, click) sono tracciabili via webhook in tempo reale.",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 rounded-2xl border border-white/[.06] bg-[#0b1120] p-5"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/15">
                  <Check className="h-4 w-4 text-emerald-300" />
                </span>
                <span className="text-sm leading-relaxed text-slate-300 md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[.07] bg-[#050811] px-5 py-8 text-sm text-slate-500 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <img src={LOGO_URL} alt="Sognalo" className="h-6 w-auto" />
          <p>© {new Date().getFullYear()} Sognalo. Idee costruite insieme.</p>
        </div>
      </footer>
    </main>
  );
}
