import React, {useState} from 'react';
import "../Styles/seatSelection.css";

const SeatSelection = ({ max, seatData, onClick }) => {
  const [seats, setSeats] = useState(seatData.split(""));

  const toggleSeat = (index) => {
    const updatedSeats = [...seats];
    const selected = seats.filter((item) => item === "2").length;

    if ((max <= selected && updatedSeats[index] === "0") || updatedSeats[index] === "1") {

    } else {
      updatedSeats[index] = updatedSeats[index] === "0" ? "2": "0";
    }
    setSeats(updatedSeats);
  };

  return (
    <div className='seat-selection'>
      <h1 className="screen">Screen is Here</h1>
      <div className="seat-grid">
        {seats.map((item, index) => (
          <div
            key={index}
            // className={item === "2" && ((index-6) % 15 == 0) ? "seat selected-seat cornar-seat": item === "2" ? "seat selected-seat": ((index-6) % 15 == 0) ? "seat cornar-seat": "seat"}
            className={`seat ${item === "2" ? "selected-seat": ""} ${((index-6) % 15 == 0) ? "cornar-seat":""} ${item === "1" ? "desabled-seat": ""}`}
            onClick={() => toggleSeat(index)}
          >
          {index}
          </div>
        ))}
      </div>
      <h2 className='selected-items'>
        Selected Seats: {seats.filter((isSelected) => isSelected).length}
      </h2>

      <h6 className='selected-items'>
        You can select maximum of {max} seats.
      </h6>
      <button className="seats-btn" onClick={() => onClick(seats)}>Proceed To paymant</button>
    </div>
  );
};

export default SeatSelection;
