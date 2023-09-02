import React, { Component } from 'react'
import  Pic from "../assets/Transformers.jpg"
import theater from './theater';
import Dropdown from './dropdown';

class TheaterMovie extends Component {
    state = {theater:{}, movie:{}, theaterMovie:{}} 
    render() { 
        return (
            <React.Fragment>
                <div className='tmb-heading'>
                    <h1 className='tmb-th-name'>{theater.name}</h1>
                    <h2 className='tmb-th-description'>{theater.description}</h2>
                </div>

                <div className='tmb-movie-data'>
                    <img className='tmb-movie-picture' src={Pic}></img>
                    <h1 className='tmb-mv-name'>{movie.name}</h1>
                </div>

                <div className='tmb-show-times'>
                    <Dropdown/>
                </div>

                <div className='tmb-ticket-price'>{theaterMovie.price}</div>

                <div className='tmb-adult-tickets'>
                    <label>Number of adult tickets</label>
                    <input type='number'/>
                </div>

                <div className='tmb-child-tickets'>
                    <label>Number of child tickets</label>
                    <input type='number'/>
                </div>

                <div className='tmb-total'>
                    Total price: 
                </div>

                <button className="movie-theater-btn" onClick={this.handleClick}>Select Seats</button>

                <div className='tmb-seat-selection'></div>
            </React.Fragment>
        );
    }
}
 
export default TheaterMovie;