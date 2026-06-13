import { Suspense, lazy } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { WhyDNT } from "@/sections/WhyDNT";
import { Portfolio } from "@/sections/Portfolio";
import { Process } from "@/sections/Process";
import { Results } from "@/sections/Results";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";

const UniverseCanvas = lazy(() => import("@/components/three/UniverseCanvas").then((m) => ({ default: m.UniverseCanvas })));

function App() {
  return (
    <SmoothScroll>
      <Suspense fallback={null}>
        <UniverseCanvas />
      </Suspense>
      <Cursor />
      <div className="noise" />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyDNT />
        <Portfolio />
        <Process />
        <Results />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

export default App;
