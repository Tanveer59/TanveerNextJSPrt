import Image from "next/image";
import Menu from "@/components/menu/Menu";
import Hero from "@/components/hero/Hero";
import Banner from "@/components/banner";
import Projects from "@/components/Projects";
import Skills from "@/components/skills";
import Final from "@/components/finalw";
import Footer from "@/components/footer/Footer";
export default function Home() {

  return (
  <main
  className="
  bg
  inner-shadow
  min-h-[100vh]">
    <Menu />
    <Hero />
    <Banner />
    <Projects />
    <Skills />
    <Final />
    <Footer />


  </main>
  
);
}
