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
                <div style={{ height: 'auto', position: 'relative' }} className="bg-gray-900 py-10">
                    <h2 className="text-white text-3xl font-bold text-center mb-8 mt-4">Experience</h2>
                    <div className="mt-12 max-w-4xl mx-auto text-center px-6">
                    <h3 className="text-white text-2xl font-bold mb-4">Professional Summary</h3>
                    <p className="text-gray-300 mb-6">
                    Senior WordPress Developer with over 3 years of hands-on experience delivering 
                    powerful, scalable, and responsive websites for individuals, startups, and 
                    businesses. Skilled in Shopify theme development, WooCommerce customization, 
                    and frontend performance optimization.
                    </p>

                    <h3 className="text-white text-2xl font-bold mb-4">Development Philosophy</h3>
                    <p className="text-gray-300 mb-6">
                    I believe that clean code is not just a standard — it's a responsibility. Whether 
                    building for speed, SEO, or UX, I prioritize long-term maintainability and scalability 
                    over quick fixes.
                    </p>

                    <h3 className="text-white text-2xl font-bold mb-4">Notable Achievements</h3>
                    <ul className="text-gray-300 list-disc list-inside text-left inline-block">
                    <li>Reduced WooCommerce store load time from 6.8s to under 1.5s — boosting conversion by 40%.</li>
                    <li>Completed a 7-day WordPress redesign challenge — mobile-first, multilingual, and Core Web Vitals compliant.</li>
                    <li>Developed a Shopify custom theme that earned a “Top 20 Trending” badge in its niche.</li>
                    </ul>
                </div>
            </div>

            <Projects />
            <Skills />
            <Final />
        </main>
    );
}
