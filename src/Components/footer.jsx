import React, { Component } from 'react'
import "../Styles/footer.css";
import { FaHome, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaRegCopyright } from 'react-icons/fa';

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