import Menu from "@/components/menu/Menu";
import Hero from "@/components/hero/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/skills/Skills";
import Final from "@/components/finalw";
import SmoothScroll from '@/components/smoothscroll';
import CardSwap, {Card} from "@/components/experince/exp";
export default function Home() {
    return (
        <main className="bg-[#060010] inner-shadow min-h-[100vh]">
            <SmoothScroll />
            <Menu />
            <Hero />
            <Projects />
            <Skills />
            <Final />
        </main>
    );
}
