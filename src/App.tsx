import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Pricing } from "@/components/Pricing";
import { Process } from "@/components/Process";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";

export default function App() {
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
