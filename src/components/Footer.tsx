const LOGO_URL = "https://storage.costanza.dev/sognalo/logo.svg";

export function Footer() {
  return (
    <footer className="border-t border-white/[.07] bg-[#050811] px-5 py-8 text-sm text-slate-500 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <img src={LOGO_URL} alt="Sognalo" className="h-6 w-auto" />
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
          <a href="#/resend" className="text-slate-500 transition hover:text-slate-300">Come funziona l'invio email</a>
          <span className="hidden sm:inline text-slate-700">·</span>
          <p>© {new Date().getFullYear()} Sognalo. Idee costruite insieme.</p>
        </div>
      </div>
    </footer>
  );
}
