"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import './menu.css';
import gsap from "gsap";
import useScrollPosition from '../scroll';

const menuLinks = [
    { path: "/" ,label: "Home" },    
    { path: "/about" ,label: "About" },
    { path: "/contact" ,label: "Contact" },
    { path: "/resume" ,label: "Resume" },
    { path: "/projects",label: "Projects"},
    { path: "/certificate" ,label: "Certificate" },
];

const Menu = () => {
    const container = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const scrollY = useScrollPosition();
    let scrolled = scrollY > 10;
    // Define color based on scroll position

    useEffect(() => {
        if (isMenuOpen) {
            gsap.fromTo(".menu-link-item-holder, .info", {
                x: -100,
                opacity: 0,
            }, {
                x: 0,
                opacity: 1,
                duration: 0.75,
                stagger: 0.1,
                ease: "power4.out"
            });
        }
    }, [isMenuOpen]);

    useEffect(() => {
        if (isMenuOpen) {
            gsap.fromTo(".menu-overlay", {
                y: -100,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.75,
                stagger: 0.1,
                ease: "power4.out"
            });
        }
    }, [isMenuOpen]);

    const toggle = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className={` top-0 menu-container menu-overlay z-[100] w-full ${ scrolled ? "stick" : "absolute" } `}>
            <div
                className={`flex justify-between  items-center  lg:pl-20 lg:pr-20 ${ scrolled ? 'p-1 shadow-sm' : "p-2" }`}
            >
                <div>
                    <Link href="/"><img className={` rotate ${scrolled ? 'w-6 md:w-10' : "w-10 md:w-16" } `} src="./TLOGO-1.svg" alt="Logo" /></Link>
                </div>
                <div className="flex justify-center items-center gap-2 md:gap-6 menu-open">
                    <button className="p-1 pl-2 pr-2 md:p-2 rounded-sm shadow-sm bg-white hover:bg-black hover:text-white transition-all">GitHub Repo &#8599;</button>
                    <img onClick={toggle} className="w-8 md:w-12 shadow-md bg-white p-2 rounded-full hover:cursor-pointer" src="./bars.svg" alt="Menu" />
                </div>
            </div>
            {isMenuOpen && (
                <div className="absolute top-0 left-0 bg-slate-300 w-[100vw] h-[100vh] text-white gradient p-2 md:p-4 lg:pl-10 lg:pr-10">
                    <div className="flex justify-between items-center">
                        <div className="menu-logo">
                            <Link href="/"><img className="w-10 md:w-16 rotate" src="TLOGOw.svg" alt="Logo" /></Link>
                        </div>
                        <div onClick={toggle} className="menu-overlay">
                            <p className="outfit-light uppercase md:text-2xl hover:cursor-pointer">Close</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between min-h-[100%]">
                        <div className="mt-10" ref={container}>
                            {menuLinks.map((link, index) => (
                                <div className="menu-link-item" key={index}>
                                    <div className="menu-link-item-holder">
                                        <Link href={link.path} className="text-3xl md:text-4xl lg:text-4xl outfit-sami capitalize">
                                            {link.label}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center mb-10 md:mb-20">
                            <div className="flex flex-col">
                                <div className="outfit-light md:text-xl flex gap-4">
                                    <a href="#" className="menu-overlay menu-link-item-holder">X &#8599;</a>
                                    <a href="#" className="menu-overlay menu-link-item-holder">Instagram &#8599;</a>
                                    <a href="#" className="menu-overlay menu-link-item-holder">LinkedIn &#8599;</a>
                                    <a href="#" className="menu-overlay menu-link-item-holder">Facebook &#8599;</a>
                                </div>
                                <div className="outfit-light md:text-xl menu-link-item-holder">
                                    <p>tanveerwebdev@gmail.com</p>
                                    <p>+92 3454249682</p>
                                </div>
                            </div>
                            <div className="hidden md:block lg:block">
                                <p onClick={toggle} className="text-4xl lg:text-5xl hover:cursor-pointer">&#x2715;</p>
                            </div>
                        </div>
                    </div>
                    <div className="menu-preview"></div>
                </div>
            )}
        </div>
    );
}

export default Menu;
