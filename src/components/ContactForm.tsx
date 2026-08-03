import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2, Mail, Sparkles, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPiano, setSelectedPiano] = useState("");

  const piani = ["Sprint", "Partner", "Launch", "Co-founder", "Non lo so ancora"];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      messaggio: formData.get("messaggio"),
      piano: formData.get("piano") || undefined,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Qualcosa è andato storto.");
        return;
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      setSelectedPiano("");
    } catch {
      setStatus("error");
      setErrorMessage("Errore di connessione. Riprova più tardi.");
    }
  }

  return (
    <section id="contatti" className="relative overflow-hidden bg-[#070b17] px-5 py-28 text-white md:px-8 md:py-40">
      <div className="absolute left-1/2 top-1/2 h-[440px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[150px]" />
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-indigo-500/15 via-white/[.04] to-transparent px-6 py-16 shadow-[0_50px_120px_-60px_rgba(76,89,255,.9)] md:px-12 md:py-20">
        <div className="text-center">
          <Sparkles className="mx-auto h-7 w-7 text-indigo-300" />
          <h2 className="mx-auto mt-7 max-w-2xl font-display text-4xl font-bold tracking-[-.055em] md:text-5xl">La prossima grande idea potrebbe essere la tua.</h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">Raccontacela. La prima conversazione serve a capire potenziale, fattibilità e quale partnership può portarla più lontano.</p>
        </div>

        {status === "success" ? (
          <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-6 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
              <Check className="h-7 w-7 text-emerald-300" />
            </div>
            <h3 className="text-xl font-bold text-white">Richiesta inviata!</h3>
            <p className="max-w-sm text-sm text-slate-400">Ti risponderemo il prima possibile. Controlla la tua casella di posta (anche spam).</p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-2 rounded-xl border border-white/10 bg-white/[.055] px-5 py-2.5 text-sm font-bold transition hover:bg-white/10"
            >
              Invia un'altra richiesta
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nome" className="mb-2 block text-sm font-semibold text-slate-300">Nome *</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  maxLength={200}
                  autoComplete="name"
                  className="w-full rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-indigo-400/50 focus:bg-white/[.06]"
                  placeholder="Mario Rossi"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-300">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  className="w-full rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-indigo-400/50 focus:bg-white/[.06]"
                  placeholder="mario@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="piano" className="mb-2 block text-sm font-semibold text-slate-300">Piano di interesse</label>
              <div className="flex flex-wrap gap-2">
                {piani.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setSelectedPiano(p)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                      selectedPiano === p
                        ? "border-indigo-400/50 bg-indigo-400/15 text-indigo-200"
                        : "border-white/10 bg-white/[.03] text-slate-400 hover:border-white/20"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <input type="hidden" name="piano" value={selectedPiano} />
            </div>

            <div>
              <label htmlFor="messaggio" className="mb-2 block text-sm font-semibold text-slate-300">Raccontaci la tua idea *</label>
              <textarea
                id="messaggio"
                name="messaggio"
                required
                maxLength={5000}
                rows={5}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-indigo-400/50 focus:bg-white/[.06]"
                placeholder="Descrivi brevemente la tua idea, il problema che vuoi risolvere e gli obiettivi..."
              />
            </div>

            {status === "error" && (
              <div className="flex items-center gap-3 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 font-bold text-slate-950 shadow-xl shadow-black/30 transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Invio in corso...
                </>
              ) : (
                <>
                  <Mail className="h-5 w-5" />
                  Invia richiesta
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-slate-500">
              I tuoi dati vengono utilizzati esclusivamente per rispondere alla tua richiesta. Niente spam, niente condivisione con terzi.
            </p>
          </form>
        )}

        <div className="mt-8 border-t border-white/[.06] pt-6 text-center">
          <a href="/come-funziona" className="text-sm font-semibold text-indigo-300 transition hover:text-indigo-200">
            Come funziona l'invio? →
          </a>
        </div>
      </div>
    </section>
  );
}
