'use client';
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
    const language = [
        'JavaScript', 'ReactJs', 'NextJs', 'NodeJs', 'ExpressJs', 'Python', 'PhotoShop', 'Illustrator', 'AI Software', 'WordPress'
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true
    };

    return (
        <div className="bg-yellow-500 p-2 z-40">
            <Slider {...settings}>
                {language.map((name, index) => (
                    <div key={index} className="text-center">
                        <h1 className=" md:text-2xl gap-9 outfit-light text-white capitalize">{name}</h1>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Banner;
