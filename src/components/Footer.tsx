const LOGO_URL = "https://storage.costanza.dev/sognalo/logo.png";
const LOGO_FILTER = "brightness(0) invert(1)";

export function Footer() {
  return (
    <footer className="border-t border-white/[.07] bg-[#050811] px-5 py-8 text-sm text-slate-500 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <img src={LOGO_URL} alt="Sognalo" className="h-12 w-auto" style={{ filter: LOGO_FILTER }} />
        <p>© {new Date().getFullYear()} Sognalo. Idee costruite insieme.</p>
      </div>
    </footer>
  );
}