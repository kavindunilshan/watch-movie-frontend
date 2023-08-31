import React, { Component } from 'react'
import "../Styles/input.css"

const Input = ({name, label, value, onChange, error, type}) => {
    return (
        <div className="form-group">
            <label className='form-label' htmlFor={name}>{label}</label>
            <input
                value={value}
                onChange={onChange}
                id={name}
                name={name}
                type={type}
                className='form-field'
            />
            {error && <div className='alert alert-danger'>{error}</div>}
        </div>
    );
}
 
export default Input;