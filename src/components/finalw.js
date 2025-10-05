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
        <div className="">
            
        </div>
    );
}

export default Final;