'use client';
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaFigma,
  FaWordpress,
  FaShopify,
  FaPhp,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiJavascript,
} from 'react-icons/si';
import { motion } from 'framer-motion';
import { PT_Sans, Ubuntu } from 'next/font/google';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ptSans = PT_Sans({ weight: '400', subsets: ['latin'] });
const ubuntu = Ubuntu({ weight: '500', subsets: ['latin'] });

const iconMapping = {
  React: FaReact,
  'Next.js': SiNextdotjs,
  'Node.js': FaNodeJs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  'Tailwind CSS': SiTailwindcss,
  MongoDB: SiMongodb,
  Express: SiExpress,
  Git: FaGitAlt,
  Figma: FaFigma,
  PHP: FaPhp,
  WordPress: FaWordpress,
  Shopify: FaShopify,
};

const fallbackSkills = [
  { name: 'Next.js', level: 75, color: 'rgba(0, 0, 0, 1)' },
  { name: 'Node.js', level: 60, color: 'rgba(22, 163, 74, 1)' },
  { name: 'JavaScript', level: 85, color: 'rgba(234, 179, 8, 1)' },
  { name: 'Tailwind CSS', level: 100, color: 'rgba(6, 182, 212, 1)' },
  { name: 'MongoDB', level: 20, color: 'rgba(34, 197, 94, 1)' },
  { name: 'Express', level: 55, color: 'rgba(31, 41, 55, 1)' },
  { name: 'Figma', level: 70, color: 'rgba(168, 85, 247, 1)' },
  { name: 'PHP', level: 60, color: 'rgba(136, 146, 190, 1)' },
  { name: 'WordPress', level: 100, color: 'rgba(33, 117, 155, 1)' },
  { name: 'Shopify', level: 90, color: 'rgba(79, 91, 147, 1)' },
];

function createGradient(color: string) {
  const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match)
    return `linear-gradient(90deg, ${color} 0%, rgba(237,221,83,1) 100%)`;

  const [r, g, b] = match.slice(1, 4).map(Number);
  const lighten = (val: number, amount: number) => Math.min(val + amount, 255);
  const darken = (val: number, amount: number) => Math.max(val - amount, 0);

  const lighter = `rgba(${lighten(r, 40)}, ${lighten(g, 40)}, ${lighten(
    b,
    40
  )}, 1)`;
  const darker = `rgba(${darken(r, 40)}, ${darken(g, 40)}, ${darken(b, 40)}, 1)`;

  return `linear-gradient(90deg, ${lighter} 0%, ${color} 50%, ${darker} 100%)`;
}

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const barRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const visitorResponse = await fetch('api/visitor', {
          method: 'GET',
          cache: 'no-store',
        });

        if (!visitorResponse.ok) throw new Error('Failed to fetch visitor count');

        const visitorData = await visitorResponse.json();
        if (typeof visitorData.count === 'number') setVisitorCount(visitorData.count);

        const skillsResponse = await fetch('api/skills');
        const skillsData = await skillsResponse.json();

        if (Array.isArray(skillsData)) {
          setSkills(skillsData);
        } else if (skillsData.skills && Array.isArray(skillsData.skills)) {
          setSkills(skillsData.skills);
        } else {
          throw new Error('Invalid skills data format');
        }
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setSkills(fallbackSkills);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading && barRefs.current.length > 0) {
      barRefs.current.forEach((ref, index) => {
        const skill = skills[index];
        if (!ref || !skill) return;

        gsap.fromTo(
          ref,
          { width: '0%' },
          {
            width: `${skill.level}%`,
            duration: 2.5,
            ease: 'expo.out',
            background: createGradient(skill.color),
            scrollTrigger: {
              trigger: ref,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  }, [isLoading, skills]);

  return (
    <section className="w-full bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a] text-white">
      <div className="flex flex-col items-center px-4 md:px-10 lg:px-20 py-28 w-full gap-12">
        <div className="text-center md:text-left md:w-full">
          <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Skills & Expertise
          </h2>
          <p className="mt-2 text-gray-400 text-lg">
            Technologies and tools I work with
          </p>

          {visitorCount !== null && (
            <p className="mt-3 text-sm text-gray-500">
              All Time Visitors:{' '}
              <span className="text-gray-300 font-medium">
                {visitorCount === 0 ? '1211' : visitorCount}
              </span>
            </p>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-900/30 border border-red-600 text-red-400 rounded-lg">
              <p className="font-semibold">Error:</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {isLoading ? (
            <div className="col-span-full flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
              <p className="mt-2 text-gray-400">Loading skills...</p>
            </div>
          ) : (
            skills.map((skill: any, index: number) => {
              const Icon = iconMapping[skill.name];
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#111111]/70 border border-[#1f1f1f] hover:border-cyan-500/40 p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/10 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {Icon && (
                      <Icon className="text-3xl" style={{ color: skill.color }} />
                    )}
                    <h3 className="text-lg font-semibold text-gray-200">
                      {skill.name}
                    </h3>
                  </div>
                  <div className="w-full bg-[#222222] rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full"
                      ref={(el) => {
                        if (el) barRefs.current[index] = el;
                      }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {skill.level}% proficiency
                  </p>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
