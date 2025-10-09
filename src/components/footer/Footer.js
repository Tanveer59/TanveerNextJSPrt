'use client';

import { FaGithub, FaLinkedin, FaTwitter, FaDribbble, FaEnvelope } from 'react-icons/fa';
import { SiHashnode } from 'react-icons/si';
import { useEffect, useRef } from 'react';

const Footer = () => {
    const footerRef = useRef(null);

    useEffect(() => {
        // No scroll handler needed anymore
    }, []);

    return (
        <footer
            ref={footerRef}
            className="w-full text-white py-20 relative overflow-hidden bg-black"
        >
            <div className="flex flex-col items-center text-center mb-16">
                <div className="mb-6">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-[0_0_10px_white]">
                        <rect width="48" height="48" rx="8" fill="white" />
                        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="black" fontSize="24" fontWeight="bold">
                            T
                        </text>
                    </svg>
                </div>
                <p className="text-xl text-gray-300 max-w-md">
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
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-black/80 backdrop-blur-sm hover:bg-white text-white hover:text-black transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_white]"
                    >
                        {link.icon}
                    </a>
                ))}
            </div>

            <div className="text-center text-gray-400 text-sm">
                <p>Handcrafted by me © Tanveer Ahmad</p>
            </div>
        </footer>
    );
};

export default Footer;

