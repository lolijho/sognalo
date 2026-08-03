import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2, Mail, Send, Sparkles, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const PLANS = ["Sprint", "Partner", "Launch", "Co-founder"] as const;

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      nome: formData.get("nome") as string,
      email: formData.get("email") as string,
      messaggio: formData.get("messaggio") as string,
      piano: selectedPlan || undefined,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Errore durante l'invio");
      }

      setStatus("success");
      form.reset();
      setSelectedPlan("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Errore imprevisto");
    }
  }

  return (
    <section id="contatti" className="relative overflow-hidden bg-[#070b17] px-5 py-28 text-white md:px-8 md:py-40">
      <div className="absolute left-1/2 top-1/2 h-[440px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[150px]" />
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-indigo-500/15 via-white/[.04] to-transparent px-6 py-16 shadow-[0_50px_120px_-60px_rgba(76,89,255,.9)] md:px-12 md:py-20">
        <div className="text-center">
          <Sparkles className="mx-auto h-7 w-7 text-indigo-300" />
          <h2 className="mx-auto mt-7 max-w-2xl font-display text-4xl font-bold tracking-[-.055em] md:text-5xl">La prossima grande idea potrebbe essere la tua.</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">Raccontacela. La prima conversazione serve a capire potenziale, fattibilità e quale partnership può portarla più lontano.</p>
        </div>

        {status === "success" ? (
          <div className="mt-12 flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15">
              <CheckCircle2 className="h-8 w-8 text-emerald-300" />
            </div>
            <h3 className="mt-6 text-2xl font-bold">Richiesta inviata!</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">Grazie per averci contattato. Ti risponderemo entro 48 ore all'indirizzo email che hai fornito.</p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.055] px-5 py-3 text-sm font-bold transition hover:bg-white/10"
            >
              Invia un'altra richiesta
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 space-y-5" noValidate>
            {/* Nome */}
            <div>
              <label htmlFor="nome" className="mb-2 block text-sm font-semibold text-slate-300">
                Nome <span className="text-indigo-300">*</span>
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                maxLength={200}
                placeholder="Il tuo nome"
                className="w-full rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-400/50 focus:bg-white/[.06] focus:ring-2 focus:ring-indigo-400/20"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-300">
                Email <span className="text-indigo-300">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={200}
                placeholder="nome@esempio.com"
                className="w-full rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-400/50 focus:bg-white/[.06] focus:ring-2 focus:ring-indigo-400/20"
              />
            </div>

            {/* Piano di interesse */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Piano di interesse <span className="text-slate-500">(opzionale)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {PLANS.map((plan) => (
                  <button
                    key={plan}
                    type="button"
                    onClick={() => setSelectedPlan(selectedPlan === plan ? "" : plan)}
                    className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                      selectedPlan === plan
                        ? "border-indigo-400/50 bg-indigo-400/15 text-indigo-200"
                        : "border-white/10 bg-white/[.04] text-slate-400 hover:border-white/20 hover:text-slate-300"
                    }`}
                  >
                    {plan}
                  </button>
                ))}
              </div>
            </div>

            {/* Messaggio */}
            <div>
              <label htmlFor="messaggio" className="mb-2 block text-sm font-semibold text-slate-300">
                Messaggio <span className="text-indigo-300">*</span>
              </label>
              <textarea
                id="messaggio"
                name="messaggio"
                required
                maxLength={5000}
                rows={5}
                placeholder="Raccontaci la tua idea, gli obiettivi e come pensi che potremmo aiutarti..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-400/50 focus:bg-white/[.06] focus:ring-2 focus:ring-indigo-400/20"
              />
            </div>

            {/* Error message */}
            {status === "error" && (
              <div className="flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/[.06] px-4 py-3 text-sm text-red-200">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 font-bold text-slate-950 shadow-xl shadow-black/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Invio in corso...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Invia la richiesta
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-slate-500">
              <Mail className="mr-1.5 inline h-3.5 w-3.5" />
              Preferisci scrivere direttamente?{" "}
              <a href="mailto:ciao@sognalo.it" className="text-indigo-300 underline-offset-2 hover:underline">
                ciao@sognalo.it
              </a>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
