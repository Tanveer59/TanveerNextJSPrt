"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./projects.css";

const Projects = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const ctx = gsap.context(() => {
            // Create a timeline for the entire section
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    toggleActions: "play none none reverse",
                    markers: true
                }
            });

            // Add animations to the timeline
            tl
                .from(titleRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out"
                })
                .from(cardsRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out"
                }, "-=0.4");

            // Add hover effects to project cards
            cardsRef.current.forEach(card => {
                if (card) {
                    card.addEventListener("mouseenter", () => {
                        gsap.to(card, {
                            scale: 1.02,
                            duration: 0.3,
                            ease: "power2.out",
                        });
                    });

                    card.addEventListener("mouseleave", () => {
                        gsap.to(card, {
                            scale: 1,
                            duration: 0.3,
                            ease: "power2.out",
                        });
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="projects-container">
            <motion.h1 
                ref={titleRef}
                className="projects-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Featured Projects
            </motion.h1>
            
            <div className="projects-grid">
                <div 
                    ref={el => cardsRef.current[0] = el}
                    className="project-card"
                >
                    <div className="project-image">
                        <img src="/project1.jpg" alt="Project 1" />
                    </div>
                    <div className="project-content">
                        <h3 className="project-title">Project 1</h3>
                        <p className="project-description">
                            Description of Project 1 goes here. This is a brief overview of what the project is about.
                        </p>
                        <div className="project-links">
                            <a href="#" className="project-link">View Project</a>
                            <a href="#" className="project-link">GitHub</a>
                        </div>
                    </div>
                </div>

                <div 
                    ref={el => cardsRef.current[1] = el}
                    className="project-card"
                >
                    <div className="project-image">
                        <img src="/project2.jpg" alt="Project 2" />
                    </div>
                    <div className="project-content">
                        <h3 className="project-title">Project 2</h3>
                        <p className="project-description">
                            Description of Project 2 goes here. This is a brief overview of what the project is about.
                        </p>
                        <div className="project-links">
                            <a href="#" className="project-link">View Project</a>
                            <a href="#" className="project-link">GitHub</a>
                        </div>
                    </div>
                </div>

                <div 
                    ref={el => cardsRef.current[2] = el}
                    className="project-card"
                >
                    <div className="project-image">
                        <img src="/project3.jpg" alt="Project 3" />
                    </div>
                    <div className="project-content">
                        <h3 className="project-title">Project 3</h3>
                        <p className="project-description">
                            Description of Project 3 goes here. This is a brief overview of what the project is about.
                        </p>
                        <div className="project-links">
                            <a href="#" className="project-link">View Project</a>
                            <a href="#" className="project-link">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects; 