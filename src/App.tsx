import { useEffect, useState } from "react";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Pricing } from "@/components/Pricing";
import { Process } from "@/components/Process";
import { ResendInfo } from "@/components/ResendInfo";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";

type Route = "home" | "resend";

function parseRoute(): Route {
  const hash = window.location.hash;
  if (hash.startsWith("#/resend")) return "resend";
  return "home";
}

export default function App() {
  const [route, setRoute] = useState<Route>(parseRoute);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseRoute());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (route === "resend") {
    return <ResendInfo />;
  }

  return (
    <main id="top" className="min-h-screen overflow-x-clip bg-background">
      <CinematicHero />
      <Pricing />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
