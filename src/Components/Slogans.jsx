import React, { Component } from 'react'
import { useInView } from 'react-intersection-observer';
import "../Styles/slogan.css"

const SloganText = ({text}) => {
    const [slogan, isStart] = useInView({});
    return (
        <div ref={slogan} className={`slogan-container ${isStart ? "annimate-slogan" : ""}`}>
            <p className='slogan-text'>{text}</p>
        </div>
    );
}
 
export default SloganText;