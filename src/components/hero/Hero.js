"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import './hero.css';

const Hero = () => {

    return (
        <main className='p-2 lg:pl-20 lg:pr-20 background bg-cover bg-fixed'>
            <div className='flex flex-col md:flex-row justify-between md:items-center content'>
                <div className='flex flex-col md:w-[100vw] lg:w-[50vw] justify-center md:items-center lg:items-start lg:pr-6 min-h-[91vh]'>
                    <h1 className='outfit-bold text-3xl md:text-45xl md:text-center lg:text-left lg:text-41xl leading-normal pb-4 md:pb-6 lg:w-[45vw]'>Innovative Visionary Dynamic Web Developer.</h1>
                    <p className={`pt-6 pb-8 md:text-center lg:text-left md:pl-20 lg:pl-0 md:pr-20 md:text-2xl lg:text-base lg:pr-52`}>
                    I'm Tanveer, MERN Stack Web Developer that enhance user experience and drive business grow.                    </p>
                    <div className='flex gap-4 md:gap-8 lg:gap-6 '>
                        <div className='transition delay-150 duration-300 ease-in-out shadow-md bg-white rounded-sm hover:bg-black hover:text-white p-2 md:p-4 lg:p-3 cursor-pointer md:text-2xl lg:text-base oufit-light'>Contact Us  &#8599;</div>
                        <a target='_blank' href='https://linkedin.com/in/tanveer-ahmad-9620a12b5' className='transition delay-150 duration-300 ease-in-out shadow-md bg-black rounded-sm text-white hover:bg-white hover:text-black p-2 md:p-4 lg:p-3 cursor-pointer md:text-2xl lg:text-base oufit-light'>LinkedIn &#8599;</a>
                    </div>
                </div>
                <div className='bg-black hidden lg:block lg:w-[50vw] '>
                 
                </div>
            </div>
        </main>
    );
}

export default Hero;
