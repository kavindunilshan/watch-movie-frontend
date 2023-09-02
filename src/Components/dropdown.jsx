import React, { useState } from 'react';
import "../Styles/dropDown.css"

const Dropdown = ({items, label, onSelect}) => {
  const [selectedItem, setSelectedItem] = useState("");
  
  const handleChange = (event) => {
    setSelectedItem(event.target.value);
    onSelect(event.target.value);
  };

  return (
    <div className='dd'>
      <label className='dd-label' htmlFor="itemSelect">Select {label}:</label>
      <select className='dd-container' id="itemSelect" value={selectedItem} onChange={handleChange}>
        {items.map((item, index) => (
          <option className='dd-option' key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
