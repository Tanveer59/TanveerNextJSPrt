"use client";
import { Link } from "theme-ui";

const Product = (props) => {
    return (
        <div className="border p-2 rounded-md relative shadow-sm fadeOut" width="300px" height="300px">
            <div className="absolute bg-white p-2 rounded-sm">
                <div className="flex justify-start items-center gap-2">
                    <div className={`${props.clr} w-4 h-4 rounded-full`}></div>
                    <p className="outfit-bold capitalize">{props.st}</p>
                </div> 
            </div>
            <img src={props.src}/>
            <p className=" text-black pt-4 outfit-light">Project that discribe my skills in {props.tool}.</p>
            <div className="flex flex-row justify-between w-[100%] pt-6">
                <div className="flex justify-between w-[100%] items-end">
                    <p className=" border text-black p-[0.5em] outfit-sami ">{props.tool}</p>
                    <div className="flex gap-1">
                        <p>{props.index}</p>
                        <Link className=" border text-black p-[.5em] outfit-sami" href={props.link}> View Project &#8599;</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Product;