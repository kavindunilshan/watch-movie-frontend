import React, { Component } from 'react'
import "../Styles/footer.css";
import { FaHome, FaFacebook } from 'react-icons/fa';

const Footer = () => {
    return (
        <React.Fragment>
            <div className='footer'>
                <div className='footer-content'>
                    <FaFacebook/>
                </div>
            </div>
        </React.Fragment>
    );
}
 
export default Footer;