import React from 'react';
import "../Styles/map.css"

const AddressMap=()=>{
    return (
        <div className="google-map-code">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4136.6338204711365!2d79.89784477761688!3d6.7965819943338985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae245416b7f34b5%3A0x7bd32721ab02560e!2sUniversity%20of%20Moratuwa!5e0!3m2!1sen!2slk!4v1693468532919!5m2!1sen!2slk"
            frameBorder="0"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
            className='theater-map'
            >
          </iframe>
        </div>
    );
 }
 export{AddressMap}