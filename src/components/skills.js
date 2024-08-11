"use client";
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faJs, faPython } from '@fortawesome/free-solid-svg-icons';
import techStack from './Json.OB';

const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const techStackValue = Object.values(techStack);

  return (
    <div className="flex flex-col justify-between items-center p-2 lg:pl-20 lg:pr-20 pb-28 w-[100%]">
      <div className="outfit-light flex flex-col justify-start md:w-[100%]">
        <p className="pb-2 text-gray-400 capitalize">What Do I Do and How?</p>
        <p className="md:text-2xl md:w-[70%] lg:text-2xl lg:pr-60">
        <FontAwesomeIcon icon="fa-brands fa-python" />
          I have crafted functional solutions for unique problems. These are some skills I have picked up over my career.
        </p>
        <div className="md:w-[50%]"></div>
      </div>

      <div className="mt-10 z-40 w-full text-white">
        <Carousel customTransition="transform 300ms ease-in-out" keyBoardControl={true} swipeable={true} draggable={true} slidesToSlide={1} shouldResetAutoplay={true} rewindWithAnimation={true} rewind={true} focusOnSelect={true} showDots={true} autoPlay={true} responsive={responsive} itemClass="carousel-item-spacing">
          {techStackValue.map((item, index) => (
            <div className="border relative mr-4 p-2 rounded-sm min-h-[500px] "  style={{ backgroundColor: item.logoColor, zIndex:index }} key={index}>
              <div className='w-8 h-8 items-center flex justify-center caffeeBg rounded-full'> <FontAwesomeIcon className="text-[#9e6e35] fa-triangle-exclamation " icon={faCoffee} /> </div>
              <div className="gap-8 absolute bottom-10">
                <p className="text-2xl outfit-sami">{item.name}</p>
                <p className="outfit-light"> I'm expert in {item.name} ,{item.statement}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Skills;
