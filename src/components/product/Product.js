"use client";
import { Montserrat, Outfit } from 'next/font/google';
import PlaceholderImage from '../PlaceholderImage';
import { useRef, useEffect } from "react";
import gsap from "gsap";
import './product.css';

const linkfont = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600'],
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
});

const Product = (props) => {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    const card = cardRef.current;
    const image = imageRef.current;

    if (!container || !overlay || !card || !image) return;

    // Set initial states
    gsap.set(overlay, { opacity: 0, y: 20 });
    gsap.set(card, { boxShadow: "0 4px 20px rgba(0,0,0,0.08)" });

    const handleMouseEnter = () => {
      const tl = gsap.timeline();
      tl.to(overlay, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      })
      .to(card, {
        boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
        y: -5,
        duration: 0.3,
        ease: 'power2.out',
      }, 0)
      .to(image, {
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out',
      }, 0);
    };

    const handleMouseLeave = () => {
      const tl = gsap.timeline();
      tl.to(overlay, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.in',
      })
      .to(card, {
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      }, 0)
      .to(image, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      }, 0);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="border-0 flex flex-col justify-between p-4 rounded-xl relative bg-[#2A2A2A] overflow-hidden transition-all duration-300 min-h-[520px] group"
    > 
      {/* Background gradient effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top left label with improved styling */}
      <div className="absolute top-3 left-3 z-20">
        <div className="flex justify-start items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
          <div className={`w-3 txt-black h-3 rounded-full ${props.clr || 'bg-gray-400'}`}></div>
          <p className={`txt-black text-sm font-semibold capitalize text-black ${outfit.className}`}>
            {props.status || props.st || 'Featured'}
          </p>
        </div>
      </div>

      {/* Image container with enhanced hover effects */}
      <div ref={containerRef} className="relative w-full mx-auto overflow-hidden rounded-lg bg-gray-100">
        <div ref={imageRef} className="transform transition-transform duration-400">
          <PlaceholderImage
            src={props.src}
            alt={props.alt || `${props.tool} project`}
            width={400}
            height={300}
            className="w-full h-[300px] object-cover"
          />
        </div>
        
        {/* Enhanced overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center p-6 z-10"
        >
          <div className="flex gap-3 w-full">
            <a
              href={props.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 bg-white text-gray-900 text-sm px-4 py-3 rounded-lg font-semibold text-center shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 ${outfit.className}`}
            >
              Live Demo
            </a>
            {props.github && (
              <a
                href={props.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-gray-900 text-black text-sm px-4 py-3 rounded-lg font-semibold text-center shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 ${outfit.className}`}
              >
                Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="flex-1 flex flex-col pt-5 pb-4 relative z-10">
        {/* Project title */}
        <h3 className={`text-xl font-semibold text-white mb-2 txt-black ${outfit.className}`}>
          {props.title || `${props.tool} Project`}
        </h3>
        
        {/* Project description */}
        <p className="text-[#EAEAEA] leading-relaxed mb-4 flex-1 txt-black">
          {props.description || `A showcase of my expertise in ${props.tool}, featuring modern design and optimal performance.`}
        </p>

        {/* Tech stack tags */}
        {props.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {props.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 text-[#EAEAEA] text-xs rounded-md font-medium txt-black"
              >
                {tag}
              </span>
            ))}
            {props.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-[#EAEAEA] text-xs rounded-md font-medium txt-black">
                +{props.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer with enhanced actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg txt-black ${outfit.className}`}>
              {props.tool}
            </span>
            {props.duration && (
              <span className="text-xs text-gray-500 font-medium txt-black">
                {props.duration}
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            <a
              href={props.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 bg-gray-900 text-[#EAEAEA] text-sm font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-sm ${linkfont.className}`}
            >
              View Project
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;