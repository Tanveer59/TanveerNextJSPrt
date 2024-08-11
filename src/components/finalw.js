'use client';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaFacebook,FaInstagramSquare,FaFacebookSquare    } from "react-icons/fa";
import { FaSquareXTwitter,FaLinkedin,FaSquarePinterest,FaSquareReddit,FaSquareWhatsapp    } from "react-icons/fa6";
import { BiLogoTelegram } from "react-icons/bi";
import { Link } from 'theme-ui';



const socialMediaIcons = {
    Facebook: {
        icon: <FaFacebookSquare size={"2rem"} />,
        url: "https://www.facebook.com/yourprofile"
    },
    Instagram: {
        icon: <FaInstagramSquare size={"2rem"} />,
        url: "https://www.instagram.com/yourprofile"
    },
    Twitter: {
        icon: <FaSquareXTwitter size={"2rem"} />,
        url: "https://www.twitter.com/yourprofile"
    },
    LinkedIn: {
        icon: <FaLinkedin size={"2rem"} />,
        url: "https://www.linkedin.com/yourprofile"
    },
    Pinterest: {
        icon: <FaSquarePinterest size={"2rem"} />,
        url: "https://www.pinterest.com/yourprofile"
    },
    Reddit: {
        icon: <FaSquareReddit size={"2rem"} />,
        url: "https://www.reddit.com/user/yourprofile"
    },
    WhatsApp: {
        icon: <FaSquareWhatsapp size={"2rem"} />,
        url: "https://wa.me/yourphonenumber"
    },
    Telegram: {
        icon: <BiLogoTelegram size={"2rem"} />,
        url: "https://t.me/yourprofile"
    }
  };
  
  

const Final = () => {
    return (
        <div className="flex flex-col justify-between items-start p-2 lg:pl-20 lg:pr-20 pb-20 w-[100%] ">
            <p className="pb-2 text-gray-400">About Me</p>
            <div className="  w-[90%] ">
                <p className="oufit-light">I am writing to express my interest in the Web Developer position at joiner developer,  With 1 years of experience in MERN stack web development and a specialized skill set in the MERN stack and WordPress, I am excited about the opportunity to contribute to your team.</p>
            </div>
            <div className="flex justify-evenly items-start pt-10 gap-20 relative">
                <div className="gap-10 flex md:flex-row lg:flex-col">
                    <p className="hidden md:hidden lg:block" >
                        I hold a degree in Software engineering from the Virtual University of Pakistan and have furthered my practical knowledge at the London App Brewery. My technical skills include proficiency in React, HTML, CSS, JavaScript, Node.js, Express, MongoDB, and the use of tools such as Git, Webpack, and RESTful APIs. Additionally, my experience with Agile methodology has enabled me to work effectively in fast-paced environments, ensuring timely and successful project completions.
                    </p>
                    <p className="pb-16">
                        I look forward to the possibility of discussing how my skills and experiences align with the needs of your team. Thank you for considering my application. I am available at your earliest convenience for an interview and can be reached at 303 4912761 or via email at tanveer1234awan@gmail.com.
                    </p>

                    <div className='flex bottom-0 absolute gap-4 w-full'>
                    {Object.keys(socialMediaIcons).map((key, index) => (
                        <Link href={socialMediaIcons[key].url} key={index}>
                            {socialMediaIcons[key].icon}
                        </Link>
                    ))}
                    </div>
                </div>
                    <img className="w-80 md:block" src="logos/tanveer.png" alt="Test Image"/>
                </div>
        </div>
    );
}

export default Final;