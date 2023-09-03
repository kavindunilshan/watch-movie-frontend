import React, { useState } from 'react';
import "../Styles/seatSelection.css";

const SeatSelection = ({ max, totalSeats, onClick }) => {
  const [seats, setSeats] = useState(Array(totalSeats).fill(false));

  const toggleSeat = (index) => {
    const updatedSeats = [...seats];
    const selected = seats.filter((isSelected) => isSelected).length;

    if (max <= selected && !updatedSeats[index]) {

    } else {
      updatedSeats[index] = !updatedSeats[index];
    }
    setSeats(updatedSeats);
  };

  return (
    <div className='seat-selection'>
      <h1 className="screen">Screen is Here</h1>
      <div className="seat-grid">
        {seats.map((isSelected, index) => (
          <div
            key={index}
            className={isSelected && ((index-6) % 15 == 0) ? "seat selected-seat cornar-seat": isSelected ? "seat selected-seat": ((index-6) % 15 == 0) ? "seat cornar-seat": "seat"}
            onClick={() => toggleSeat(index)}
          >
          </div>
        ))}
      </div>
      <h2 className='selected-items'>
        Selected Seats: {seats.filter((isSelected) => isSelected).length}
      </h2>

      <h6 className='selected-items'>
        You can select maximum of {max} seats.
      </h6>
      <button className="seats-btn" onClick={onClick}>Proceed To paymant</button>
    </div>
  );
};

export default SeatSelection;
