import { Link } from "react-router-dom";

const LOGO_URL = "https://storage.costanza.dev/sognalo/logo.svg";

export function Footer() {
  return (
    <footer className="border-t border-white/[.07] bg-[#050811] px-5 py-8 text-sm text-slate-500 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div className="flex items-center justify-center gap-6 sm:justify-start">
          <img src={LOGO_URL} alt="Sognalo" className="h-6 w-auto" />
          <Link to="/come-funziona" className="text-slate-500 transition hover:text-slate-300">
            Come funziona
          </Link>
        </div>
        <p>© {new Date().getFullYear()} Sognalo. Idee costruite insieme.</p>
      </div>
    </footer>
  );
}
