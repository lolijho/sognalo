import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Pricing } from "@/components/Pricing";
import { Process } from "@/components/Process";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";

export function LandingPage() {
  return (
    <main id="top" className="min-h-screen overflow-x-clip bg-background">
      <CinematicHero />
      <Pricing />
      <Process />
      <ContactForm />
      <Footer />
    </main>
  );
}
