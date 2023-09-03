import React, { useState } from 'react';
import "../Styles/quantity.css"

const NumberInput = ({id, label, max, onChange}) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    if (quantity < max) {
        setQuantity(quantity + 1);
        onChange(id, "Add");
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      onChange(id, "Dec");
    }
  };

  return (
    <div className="qn-number-input">
      <h2 className='qn-text'>{label}</h2>
      <div className="quantity-controls">
        <button className="qn-btn decrement" onClick={handleDecrement}>-</button>
        <div className="qn-quantity">{quantity}</div>
        <button className="qn-btn increment" onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
};

export default NumberInput;
