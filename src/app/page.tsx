import FxCanvas from "@/components/FxCanvas";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Missions from "@/components/sections/Missions";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <FxCanvas />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Missions />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
