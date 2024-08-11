'use client';
import Product from "./product/Product";
import { useState } from "react";
import { projectsList } from "./Json.OB";


const Projects = () => {  
    const [displayedProjects, setDisplayedProjects] = useState([projectsList.slice(0, 4)]);
    const [currentIndex, setCurrentIndex] = useState(4);
    const itemsPerPage = 4;

    const loadMoreProjects = () => {
        const nextIndex = currentIndex + itemsPerPage;
        let newProjects = projectsList.slice(currentIndex, nextIndex);
        
        // If there are fewer than 4 projects left, wrap around and take projects from the start
        if (newProjects.length < itemsPerPage) {
            newProjects = newProjects.concat(projectsList.slice(0, itemsPerPage - newProjects.length));
        }

        setDisplayedProjects([...displayedProjects, newProjects]);
        setCurrentIndex(nextIndex);
    };

    return (
        <div className="flex flex-col justify-between items-center p-2 lg:pl-20 lg:pr-20 pt-28 pb-28 w-[100%]">
            <div className="outfit-light flex flex-col justify-start md:w-[100%]">
                <p className="pb-2 text-gray-400">Feature Projects</p>
                <p className="md:text-2xl md:w-[70%] lg:text-2xl lg:pr-60 ">
                I crafted digital solutions that showcase my passion and expertise in Web Design & Development!
                </p>
                <div className="md:w-[50%]"></div>
            </div>

            <div className="flex flex-col w-full mt-10 gap-10">
                {displayedProjects.map((projectSet, setIndex) => (
                        <div key={setIndex} className="flex flex-col md:flex-row w-full justify-between gap-2 md:flex-wrap lg:flex-nowrap">
                            {projectSet.map((item, index) => (
                                <div key={`${setIndex}-${index}`} className="w-full md:w-1/2 lg:w-1/4">
                                    <Product src={item.src} tool={item.tool} link={item.link} st={item.state} clr={item.color}/>
                                </div>
                            ))}
                        </div>
                ))}
            </div>

            {currentIndex < projectsList.length && (

                <div className="flex justify-end pt-2 items-end mt-4 w-[100%]">
                    <button
                        onClick={loadMoreProjects}
                        className=" bg-black text-white hover:bg-white hover:text-black p-[0.7em] shadow-md"
                    >
                        Explore More 
                    </button>
                </div>
            )}
        </div>
    );
};

export default Projects;
