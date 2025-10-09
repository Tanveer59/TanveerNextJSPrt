'use client';

import { FaGithub, FaLinkedin, FaTwitter, FaDribbble, FaEnvelope } from 'react-icons/fa';
import { SiHashnode } from 'react-icons/si';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const Footer = () => {
    const footerRef = useRef(null);

    useEffect(() => {
        const footer = footerRef.current;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const angle = (scrollY * 0.2) % 360;

            const hue1 = (scrollY * 0.4) % 360;
            const hue2 = (hue1 + 180) % 360;

            const color1 = `hsl(${hue1}, 0%, 100%)`; // white
            const color2 = `hsl(${hue2}, 0%, 0%)`;   // black

            if (footer) {
                footer.style.background = `
                    linear-gradient(
                        ${angle}deg,
                        ${color1} 0%,
                        #ffffff 25%,
                        ${color2} 50%,
                        #ffffff 75%,
                        ${color1} 100%
                    )
                `;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <footer
            ref={footerRef}
            className="w-full text-black py-20 relative overflow-hidden"
            style={{
                background: `
                    linear-gradient(
                        0deg,
                        #ffffff 0%,
                        #ffffff 25%,
                        #000000 50%,
                        #ffffff 75%,
                        #ffffff 100%
                    )
                `
            }}
        >
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="mb-6">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-[0_0_10px_black]">
                            <rect width="48" height="48" rx="8" fill="black" />
                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">
                                T
                            </text>
                        </svg>
                    </div>
                    <p className="text-xl text-gray-600 max-w-md">
                        Living, learning, & leveling up<br />
                        one scroll at a time.
                    </p>
                </div>

                <div className="flex justify-center items-center gap-6 mb-12 flex-wrap">
                    {[
                        { icon: <FaTwitter size={20} />, href: 'https://twitter.com' },
                        { icon: <FaDribbble size={20} />, href: 'https://dribbble.com' },
                        { icon: <FaLinkedin size={20} />, href: 'https://linkedin.com' },
                        { icon: <SiHashnode size={20} />, href: 'https://hashnode.com' },
                        { icon: <FaGithub size={20} />, href: 'https://github.com' },
                        { icon: <FaEnvelope size={20} />, href: 'mailto:contact@example.com' }
                    ].map((link, i) => (
                        <a
                            key={i}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-black text-black hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_black]"
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                <div className="text-center text-gray-600 text-sm">
                    <p>Handcrafted by me © Tanveer Ahmad</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
