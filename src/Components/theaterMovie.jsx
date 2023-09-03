import React, { Component } from 'react'
import Pic from "../assets/Transformers.jpg"
import "../Styles/theaterMovie.css"
import Dropdown from './dropdown';
import NumberInput from './quantity';
import SeatSelection from './seatSelection';

class TheaterMovie extends Component {
    state = {theater:{}, movie:{}, theaterMovie:{}, selectionModel: false, viewModel: false, total:0, tickets: 0}

    componentDidMount() {
        const theater = {name:"Regal Cinema", description:"Get your best movie experiance"};
        const movie = {name:"Pushpa 2"};
        const theaterMovie = {1: 750, 2: 650}

        this.setState({theater, movie, theaterMovie});
    }

    handleTotal = (id, status) => {
        let {total, theaterMovie, tickets} = this.state;
        if (status === "Add") {
            total = total + theaterMovie[id]
            tickets += 1;
        } else {
            total = total - theaterMovie[id]
            tickets -= 1;
        }
        this.setState({total, tickets});
    }

     handleClick = () => {
        this.setState({selectionModel:true});
    }

    handleDone = () => {
        this.setState({selectionModel:false});
    }
    render() {
        const {theater, movie, theaterMovie, total, tickets, selectionModel, viewModel} = this.state;
        return (
            <React.Fragment>
                <div className={selectionModel ? "tmb tmb-active":"tmb"} onClick={this.handleDone}>
                    <div className='tmb-heading'>
                        <h1 className='tmb-th-name'>{theater.name}</h1>
                        <h4 className='tmb-th-description'>{theater.description}</h4>
                    </div>

                    <div className='tmb-movie-data'>
                        <img className='tmb-movie-picture' src={Pic}></img>
                    </div>
                    <h1 className='tmb-mv-name'>Movie: {movie.name}</h1>

                    <div className='tmb-show-times'>
                        <Dropdown/>
                    </div>

                    <div className='tmb-prices'>
                        <h2 className='tmb-sub-heading'>Ticket Price Details</h2>
                        <div className='tmb-ticket-price'>Full Ticket Price: {theaterMovie[1]}</div>
                        <div className='tmb-ticket-price'>Half Ticket Price: {theaterMovie[2]}</div>
                    </div>

                    <h2 className='tmb-sub-heading'>Tickets Selection</h2>
                    <NumberInput id={1} label="Number of Full tickets" max={10} onChange={this.handleTotal}/>
                    <NumberInput id={2} label="Number of Full tickets" max={10} onChange={this.handleTotal}/>
                </div>

                {!selectionModel &&
                <div className='total-seat-details'>
                        <div className='tmb-total'>
                            Total price: {total}
                        </div>
                        <button className="tmb-btn" onClick={this.handleClick}>Select Seats</button>
                </div>
                }

                { selectionModel &&
                    <div className='tmb-seat-selection'>
                        <SeatSelection max={tickets} totalSeats={200}/>
                    </div>
                }
            </React.Fragment>
        );
    }
}
 
export default TheaterMovie;