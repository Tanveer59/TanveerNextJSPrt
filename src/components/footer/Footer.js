import './footer.css';

const Footer = () => {

    const newDate = new Date();
    let currentYear = newDate.getFullYear();


    return (



        <footer className="footer min-h-96 relative ">
            <div className="">
                
            </div>
            <div className=''>
                <p>Copyrighted from Tanveer in {currentYear}</p>
            </div>
        </footer>
    );
}

export default Footer;
