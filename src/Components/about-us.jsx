import React, { Component } from 'react'
import "../Styles/about-us.css"
import Logo from '../Images/logo.png';

const AboutUs = () => {
    return (
        <React.Fragment>
            <div className='abt'>
            
            </div>
            <div className='abt-contents'></div>
        <div className='abt-content'>
            <img className="abt-logo" src={Logo} alt="Logo" />
            <h1 className='abt-text'>Email: kavindunilshanliyanage@gmail.com</h1>
            <h1 className='abt-text'>Main Branch: Colombo Sri Lanka</h1>
            <h1 className='abt-text'>Tel: 0702586683</h1>
        </div>
        </React.Fragment>
    );
}
 
export default AboutUs;