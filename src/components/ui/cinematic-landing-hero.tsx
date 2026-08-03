"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, Check, Lightbulb, Rocket } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const LOGO_URL = "https://storage.costanza.dev/sognalo/logo.svg";
const HERO_BG_URL = "https://storage.costanza.dev/sognalo/hero-bg.jpg";

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }
  .hero-bg { position:absolute;inset:0;z-index:0;background-image:url("${HERO_BG_URL}");background-size:cover;background-position:center;will-change:transform,opacity,filter }
  .hero-bg::after { content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,8,17,.55) 0%,rgba(5,8,17,.72) 50%,rgba(5,8,17,.85) 100%) }
  .film-grain { position:absolute;inset:0;pointer-events:none;z-index:60;opacity:.045;mix-blend-mode:overlay;background:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E") }
  .bg-grid-theme { background-size:60px 60px;background-image:linear-gradient(to right,rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.045) 1px,transparent 1px);mask-image:radial-gradient(ellipse at center,#000 0%,transparent 72%);-webkit-mask-image:radial-gradient(ellipse at center,#000 0%,transparent 72%) }
  .text-3d-matte { color:#f8fafc;text-shadow:0 12px 32px rgba(106,125,255,.24),0 2px 4px rgba(0,0,0,.3) }
  .text-silver-matte { background:linear-gradient(180deg,#fff 0%,#7886af 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;filter:drop-shadow(0 12px 25px rgba(69,88,230,.22));transform:translateZ(0) }
  .text-card-silver { background:linear-gradient(180deg,#fff 0%,#9aa8ca 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;filter:drop-shadow(0 12px 24px rgba(0,0,0,.75)) }
  .premium-depth-card { background:radial-gradient(circle at var(--mouse-x,60%) var(--mouse-y,30%),rgba(107,126,255,.18),transparent 28%),linear-gradient(145deg,#162869 0%,#090e1c 72%);box-shadow:0 45px 110px -20px rgba(0,0,0,.95),inset 0 1px 2px rgba(255,255,255,.2),inset 0 -2px 5px rgba(0,0,0,.8);border:1px solid rgba(255,255,255,.06) }
  .card-sheen { position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:40;background:radial-gradient(700px circle at var(--mouse-x,50%) var(--mouse-y,50%),rgba(255,255,255,.075),transparent 42%);mix-blend-mode:screen }
  .device-shell { background:#0b0c11;box-shadow:inset 0 0 0 2px #515565,inset 0 0 0 7px #020204,0 42px 85px -16px rgba(0,0,0,.95),0 15px 25px -5px rgba(0,0,0,.7);transform-style:preserve-3d }
  .widget-depth { background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.018));box-shadow:0 12px 22px rgba(0,0,0,.3),inset 0 1px 1px rgba(255,255,255,.07),inset 0 -1px 1px rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.05) }
  .floating-ui-badge { background:linear-gradient(135deg,rgba(255,255,255,.11),rgba(255,255,255,.025));backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);box-shadow:0 0 0 1px rgba(255,255,255,.11),0 25px 50px -12px rgba(0,0,0,.85),inset 0 1px 1px rgba(255,255,255,.17) }
  .tactile-btn { transition:transform .35s cubic-bezier(.25,1,.5,1),box-shadow .35s ease }
  .tactile-btn:hover { transform:translateY(-3px) }
  .tactile-btn:active { transform:translateY(1px) }
  .btn-light { background:linear-gradient(180deg,#fff,#e8edff);color:#0b1020;box-shadow:0 2px 4px rgba(0,0,0,.1),0 14px 28px -5px rgba(0,0,0,.45),inset 0 1px 1px #fff,inset 0 -3px 6px rgba(0,0,0,.07) }
  .btn-ghost { background:linear-gradient(180deg,#292d3a,#151721);color:white;box-shadow:0 0 0 1px rgba(255,255,255,.12),0 13px 25px -5px rgba(0,0,0,.9),inset 0 1px 1px rgba(255,255,255,.13) }
  .transform-style-3d { transform-style:preserve-3d }
  @media (prefers-reduced-motion: reduce) { .gsap-reveal { visibility:visible } }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({
  brandName = "Sognalo",
  tagline1 = "Hai un'idea?",
  tagline2 = "Rendiamola reale.",
  cardHeading = "Non solo fornitori. Partner.",
  cardDescription = <>Progettiamo, sviluppiamo e lanciamo il tuo prodotto digitale condividendo <strong className="font-semibold text-white">rischio e risultati.</strong></>,
  metricValue = 4,
  metricLabel = "modelli flessibili",
  ctaHeading = "Il capitale non deve fermarti.",
  ctaDescription = "Scegli il modello più adatto alla tua idea. Partiamo da zero, insieme.",
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2 || window.matchMedia("(pointer: coarse)").matches) return;
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (!mainCardRef.current || !mockupRef.current) return;
        const rect = mainCardRef.current.getBoundingClientRect();
        mainCardRef.current.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
        mainCardRef.current.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
        gsap.to(mockupRef.current, {
          rotationY: (event.clientX / window.innerWidth - 0.5) * 18,
          rotationX: -(event.clientY / window.innerHeight - 0.5) * 18,
          ease: "power3.out",
          duration: 1.2,
        });
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".gsap-reveal", { autoAlpha: 1 });
        gsap.set(".main-card", { y: 0 });
        return;
      }
      const isMobile = window.innerWidth < 768;
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.86, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-copy", ".card-brand", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      gsap.timeline({ delay: 0.2 })
        .to(".text-track", { duration: 1.7, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.3, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=.9");

      gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "+=6200", pin: true, scrub: 1, anticipatePin: 1 },
      })
        .to([".hero-text-wrapper", ".bg-grid-theme", ".hero-bg"], { scale: 1.14, filter: "blur(18px)", opacity: 0.16, duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: 0, duration: 1.5, ease: "power3.inOut" })
        .fromTo(".mockup-scroll-wrapper", { y: 280, z: -500, rotationX: 45, rotationY: -25, autoAlpha: 0, scale: 0.62 }, { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, duration: 2.4, ease: "expo.out" }, "-=.8")
        .to(".phone-widget", { autoAlpha: 1, y: 0, stagger: 0.13, duration: 1.2, ease: "back.out(1.2)" }, "-=1.4")
        .fromTo(".floating-badge", { y: 90, scale: 0.75, rotationZ: -8 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, stagger: 0.2, duration: 1.4, ease: "back.out(1.5)" }, "-=1.6")
        .fromTo(".card-copy", { x: -45 }, { x: 0, autoAlpha: 1, duration: 1.4, ease: "power4.out" }, "-=1.2")
        .fromTo(".card-brand", { x: 45, scale: 0.85 }, { x: 0, scale: 1, autoAlpha: 1, duration: 1.4, ease: "expo.out" }, "<")
        .to({}, { duration: 2.1 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-copy", ".card-brand"], { scale: 0.9, y: -35, z: -180, autoAlpha: 0, stagger: 0.04, duration: 1.1, ease: "power3.in" })
        .to(".main-card", { width: isMobile ? "92vw" : "85vw", height: isMobile ? "90vh" : "85vh", borderRadius: isMobile ? 30 : 40, duration: 1.7, ease: "expo.inOut" }, "pullback")
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", duration: 1.7, ease: "expo.inOut" }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 300, duration: 1.5, ease: "power3.in" });
    }, containerRef);
    return () => ctx.revert();
  }, [metricValue]);

  return (
    <div ref={containerRef} className={cn("relative flex h-screen w-full items-center justify-center overflow-hidden bg-background text-foreground", className)} style={{ perspective: "1500px" }} {...props}>
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="hero-bg" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme pointer-events-none absolute inset-0 z-0 opacity-60" aria-hidden="true" />

      <header className="absolute inset-x-0 top-0 z-[70] mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Sognalo, torna all'inizio">
          <img src={LOGO_URL} alt="Sognalo" className="h-7 w-auto md:h-9" />
        </a>
        <a href="#piani" className="rounded-full border border-white/15 bg-white/[.06] px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">Scopri i piani</a>
      </header>

      <div className="hero-text-wrapper absolute z-10 flex w-full transform-style-3d flex-col items-center justify-center px-5 text-center will-change-transform">
        <span className="mb-7 rounded-full border border-indigo-300/15 bg-indigo-300/[.06] px-4 py-2 text-xs font-bold uppercase tracking-[.22em] text-indigo-200">Dall'idea al mercato</span>
        <h1 className="text-track gsap-reveal text-3d-matte mb-2 font-display text-5xl font-bold tracking-[-.06em] md:text-7xl lg:text-[6rem]">{tagline1}</h1>
        <h1 className="text-days gsap-reveal text-silver-matte font-display text-5xl font-extrabold tracking-[-.065em] md:text-7xl lg:text-[6rem]">{tagline2}</h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">Strategia, design e sviluppo senza investimenti impossibili. Costruiamo il tuo progetto e cresciamo quando cresci tu.</p>
        <div className="mt-9 flex items-center gap-2 text-sm font-semibold text-indigo-200"><span>Scorri per entrare</span><ArrowRight className="h-4 w-4 rotate-90 animate-bounce" /></div>
      </div>

      <div className="cta-wrapper gsap-reveal pointer-events-auto absolute z-10 flex w-full flex-col items-center justify-center px-5 text-center will-change-transform">
        <h2 className="text-silver-matte max-w-4xl font-display text-4xl font-bold tracking-[-.05em] md:text-6xl lg:text-7xl">{ctaHeading}</h2>
        <p className="mx-auto mb-10 mt-6 max-w-xl text-base font-light leading-relaxed text-slate-400 md:text-xl">{ctaDescription}</p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a href="#contatti" className="tactile-btn btn-light inline-flex items-center justify-center gap-3 rounded-2xl px-7 py-4 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"><Rocket className="h-5 w-5" />Raccontaci la tua idea</a>
          <a href="#piani" className="tactile-btn btn-ghost inline-flex items-center justify-center gap-3 rounded-2xl px-7 py-4 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400">Confronta i modelli<ArrowRight className="h-5 w-5" /></a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center" style={{ perspective: "1500px" }}>
        <div ref={mainCardRef} className="main-card premium-depth-card gsap-reveal pointer-events-auto relative flex h-[92vh] w-[92vw] items-center justify-center overflow-hidden rounded-[32px] md:h-[85vh] md:w-[85vw] md:rounded-[40px]">
          <div className="card-sheen" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-evenly gap-2 px-4 py-7 lg:grid lg:grid-cols-3 lg:gap-8 lg:px-12 lg:py-0">
            <div className="card-brand gsap-reveal order-1 flex w-full justify-center lg:order-3 lg:justify-end">
              <h2 className="text-card-silver font-display text-5xl font-black uppercase tracking-[-.08em] md:text-7xl lg:text-[7rem]">{brandName}</h2>
            </div>

            <div className="mockup-scroll-wrapper order-2 relative flex h-[390px] w-full items-center justify-center lg:h-[600px]" style={{ perspective: "1000px" }}>
              <div className="relative flex h-full w-full scale-[.67] items-center justify-center md:scale-[.85] lg:scale-100">
                <div ref={mockupRef} className="device-shell relative flex h-[580px] w-[280px] flex-col rounded-[3rem] will-change-transform">
                  <div className="absolute inset-[7px] z-10 overflow-hidden rounded-[2.5rem] bg-[#050914] text-white shadow-[inset_0_0_15px_#000]">
                    <div className="absolute left-1/2 top-[6px] z-50 h-[27px] w-[96px] -translate-x-1/2 rounded-full bg-black" />
                    <div className="flex h-full w-full flex-col px-5 pb-7 pt-12">
                      <div className="phone-widget mb-7 flex translate-y-6 items-center justify-between">
                        <div><span className="block text-[9px] font-bold uppercase tracking-[.22em] text-indigo-300">Workspace</span><span className="text-xl font-bold">La tua idea</span></div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5"><Lightbulb className="h-4 w-4 text-amber-300" /></div>
                      </div>
                      <div className="space-y-3">
                        {["Validazione e strategia", "Design e sviluppo", "Lancio e crescita"].map((label) => <div key={label} className="phone-widget widget-depth flex translate-y-6 items-center rounded-2xl p-3"><span className="mr-3 flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/10"><Check className="h-4 w-4 text-indigo-300" /></span><div><span className="block text-[11px] font-semibold text-slate-200">{label}</span><span className="mt-1 block h-1.5 w-20 rounded-full bg-white/10" /></div></div>)}
                      </div>
                      <div className="absolute bottom-2 left-1/2 h-1 w-[115px] -translate-x-1/2 rounded-full bg-white/20" />
                    </div>
                  </div>
                </div>
                <div className="floating-badge floating-ui-badge absolute left-[-20px] top-8 z-30 flex items-center gap-3 rounded-2xl p-3 lg:left-[-85px] lg:top-14 lg:p-4"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/10">💡</span><div><p className="text-xs font-bold text-white lg:text-sm">Idea validata</p><p className="text-[10px] text-indigo-200/55 lg:text-xs">Pronta per partire</p></div></div>
                <div className="floating-badge floating-ui-badge absolute bottom-14 right-[-20px] z-30 flex items-center gap-3 rounded-2xl p-3 lg:bottom-20 lg:right-[-85px] lg:p-4"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-300/10">🚀</span><div><p className="text-xs font-bold text-white lg:text-sm">Go to market</p><p className="text-[10px] text-indigo-200/55 lg:text-xs">Costruiamo insieme</p></div></div>
              </div>
            </div>

            <div className="card-copy gsap-reveal order-3 w-full px-3 text-center lg:order-1 lg:px-0 lg:text-left">
              <span className="mb-3 hidden text-xs font-bold uppercase tracking-[.2em] text-indigo-300 md:block">Skin in the game</span>
              <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl lg:mb-5 lg:text-4xl">{cardHeading}</h3>
              <p className="mx-auto mt-3 hidden max-w-sm text-sm leading-relaxed text-blue-100/65 md:block lg:mx-0 lg:text-base">{cardDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
