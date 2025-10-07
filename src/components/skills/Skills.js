'use client';

import {
  FaReact, FaNodeJs, FaGitAlt, FaFigma, FaWordpress, FaShopify, FaPhp,
} from 'react-icons/fa';
import {
  SiNextdotjs, SiTailwindcss, SiTypescript, SiMongodb,
  SiExpress, SiJavascript
} from 'react-icons/si';
import { motion } from 'framer-motion';
import { PT_Sans, Ubuntu } from 'next/font/google';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ptSans = PT_Sans({ weight: '400', subsets: ['latin'] });
const ubuntu = Ubuntu({ weight: '500', subsets: ['latin'] });

// Icons mapping
const iconMapping = {
  'React': FaReact,
  'Next.js': SiNextdotjs,
  'Node.js': FaNodeJs,
  'TypeScript': SiTypescript,
  'JavaScript': SiJavascript,
  'Tailwind CSS': SiTailwindcss,
  'MongoDB': SiMongodb,
  'Express': SiExpress,
  'Git': FaGitAlt,
  'Figma': FaFigma,
  'PHP': FaPhp,
  'WordPress': FaWordpress,
  'Shopify': FaShopify,
};

// Fallback skills
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

// Helper
function createGradient(color) {
  const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return `linear-gradient(90deg, ${color} 0%, rgba(237,221,83,1) 100%)`;

  const [r, g, b] = match.slice(1, 4).map(Number);
  const lighten = (val, amount) => Math.min(val + amount, 255);
  const darken = (val, amount) => Math.max(val - amount, 0);

  const lighter = `rgba(${lighten(r, 40)}, ${lighten(g, 40)}, ${lighten(b, 40)}, 1)`;
  const darker = `rgba(${darken(r, 40)}, ${darken(g, 40)}, ${darken(b, 40)}, 1)`;

  return `linear-gradient(90deg, ${lighter} 0%, ${color} 50%, ${darker} 100%)`;
}

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null);
  const [visitorCount, setVisitorCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const barRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch visitor count
        const visitorResponse = await fetch('api/visitor', {
          method: 'GET',
          cache: 'no-store'
        });
        
        if (!visitorResponse.ok) {
          throw new Error('Failed to fetch visitor count');
        }
        
        const visitorData = await visitorResponse.json();
        if (typeof visitorData.count === 'number') {
          setVisitorCount(visitorData.count);
        }

        // Fetch skills data
        const skillsResponse = await fetch('api/skills');
        const skillsData = await skillsResponse.json();
        
        // Ensure we have an array of skills
        if (Array.isArray(skillsData)) {
          setSkills(skillsData);
        } else if (skillsData.skills && Array.isArray(skillsData.skills)) {
          setSkills(skillsData.skills);
        } else {
          throw new Error('Invalid skills data format');
        }
      } catch (err) {
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

        gsap.fromTo(ref,
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
            }
          });
      });
    }
  }, [isLoading, skills]);

  return (
    <section className="w-full bg-[#E5E5E5] dark:bg-[#000000]">
      <div className="flex flex-col items-center p-2 lg:px-20 pt-28 pb-28 w-full gap-10">
        <div className="outfit-light flex flex-col justify-start md:w-[100%]">
          <p className="pb-2 text-white">Skills & Expertise</p>
          <p className="md:text-2xl md:w-[70%] lg:text-2xl lg:pr-60 text-white">
            Technologies and tools I work with
          </p>

          {visitorCount !== null && (
            <p className="mt-2 text-gray-500 text-sm text-white">
              All Time Visitors: {visitorCount == 0 ? '1211' : visitorCount }
            </p>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-semibold">Error:</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {isLoading ? (
            <div className="col-span-full text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-white">Loading skills...</p>
            </div>
          ) : (
            skills.map((skill, index) => {
              const Icon = iconMapping[skill.name];
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {Icon && <Icon className="text-2xl" style={{ color: skill.color }} />}
                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full"
                      ref={(el) => {
                        if (el) barRefs.current[index] = el;
                      }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{skill.level}% proficiency</p>
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
