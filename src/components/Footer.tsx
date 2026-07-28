export function Footer() {
  return (
    <footer className="border-t border-white/[.07] bg-[#050811] px-5 py-8 text-sm text-slate-500 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <span className="font-black tracking-tight text-slate-300">SOGNALO</span>
        <p>© {new Date().getFullYear()} Sognalo. Idee costruite insieme.</p>
      </div>
    </footer>
  );
}
