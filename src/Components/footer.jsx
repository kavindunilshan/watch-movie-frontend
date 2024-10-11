import React from 'react'
import "../Styles/footer.css";
import {FaFacebook, FaInstagram, FaLinkedin, FaRegCopyright, FaTwitter} from 'react-icons/fa';

const Footer = () => {
    const theame = {backgroundColor: "none", color: "white"};
    return (
        <React.Fragment>
            <div className='footer'>
                <div className='footer-tags'>
                    <FaFacebook size={30} style={theame}/>
                    <FaLinkedin size={30} style={theame}/>
                    <FaTwitter size={30} style={theame}/>
                    <FaInstagram size={30} style={theame}/>
                </div>
                <div className='footer-end'>
                    <FaRegCopyright size={30} style={theame}/>
                    <div className='footer-text'>All Rights Reserved</div>
                </div>
            </div>
        </React.Fragment>
    );
}
 
export default Footer;