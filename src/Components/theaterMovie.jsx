import React, { Component } from 'react'
import Pic from "../assets/Transformers.jpg"
import "../Styles/theaterMovie.css"
import Dropdown from './dropdown';
import NumberInput from './quantity';
import SeatSelection from './seatSelection';
import { fetchData } from '../Services/httpService';
import { withRouter } from './cs';
import DateField from './dateField';
import BasicSelect from './materialDropDown';

class TheaterMovie extends Component {
    state = {theater:{}, movie:{}, 
    shows:{}, selectionModel: false,
    total: 0, tickets: {full: 0, half: 0},
    showTime: "", selectedShow: null,
    date: "", seatData: {}
}

    async componentDidMount() { 
        const {searchParams} = this.props;
        const tid = searchParams.get("tid");
        const mid = searchParams.get("mid");

        try {
            const theater = await fetchData(`/theaters/${tid}`);
            const allShows = await fetchData(`/theaterMovies/${tid}`);
            const shows = allShows.filter(show => show.id.mid == mid);
            const movie = await fetchData(`/movies/${mid}`);
            this.setState({theater, movie, shows});
        } catch(e) {
            console.log("Error has occured", e);
        }
     }

    handleTotal = (id, status) => {
        let {tickets} = this.state;
        tickets[id] += 1;
        this.setState({tickets});
    }

     handleClick = async () => {
        const {searchParams} = this.props;
        const tid = searchParams.get("tid");
        const mid = searchParams.get("mid");
        const {showTime, date} = this.state;
        const seatData = await fetchData(`/seatData/${tid}/${mid}/${showTime}/${date}`);
        this.setState({selectionModel:true});
    }

    handleDone = () => {
        this.setState({selectionModel:false});
    }

    handleItemSelect = (event, key) => {
        const selectedShow = key.props.name;
        const showTime = event.target.value;
        this.setState({showTime, selectedShow});
    }

    handleDateSelect = (date) => {
        this.setState({date: `${date.$y}s${date.$M + 1}s${date.$D}`});
    }

    render() {
        const {theater, movie, shows, tickets, selectionModel, showTime, selectedShow, seatData} = this.state;
        return (
            <React.Fragment>
            {theater && movie && shows && 
                <div>
                    <div className={selectionModel ? "tmb tmb-active":"tmb"} onClick={this.handleDone}>
                        <div className='tmb-heading'>
                            <h1 className='tmb-th-name'>{theater.name}</h1>
                            <h4 className='tmb-th-description'>{theater.description}</h4>
                        </div>

                        <div className='tmb-movie-data'>
                            <img className='tmb-movie-picture' src={Pic}></img>
                        </div>
                        <h1 className='tmb-mv-name'>Movie: {movie.title}</h1>

                        <div className='tmb-show-times'>
                            <Dropdown/>
                        </div>

                        <div className='tmb-prices'>
                            <h2 className='tmb-sub-heading'>Ticket Price Details</h2>
                            <div className='tmb-ticket-price'>Full Ticket Price: {selectedShow == null ? "": shows[selectedShow]["fullPrice"]}</div>
                            <div className='tmb-ticket-price'>Half Ticket Price: {selectedShow == null ? "": shows[selectedShow]["halfPrice"]}</div>
                        </div>

                        <h2 className='tmb-sub-heading'>Tickets Selection</h2>
                        <NumberInput id={"full"} label="Number of Full tickets" max={10} onChange={this.handleTotal}/>
                        <NumberInput id={"half"} label="Number of Half tickets" max={10} onChange={this.handleTotal}/>


                        <div className='tmb-date'>
                            <div className='tmb-date-text'>Date Selection</div>
                            <div className='tmb-date-select'>
                                <DateField setDate={this.handleDateSelect}/>
                            </div>
                        </div>

                        <div className='tmb-date'>
                            <div className='tmb-date-text'>Show Time Selection</div>
                            <div className='tmb-date-select'>
                                <BasicSelect value={showTime} items={shows} onChange={this.handleItemSelect} label="Show Time"/>
                            </div>
                        </div>
                    </div>

                    {!selectionModel &&
                    <div className='total-seat-details'>
                            <div className='tmb-total'>
                                Total price: {selectedShow == null ? 0: shows[selectedShow]["fullPrice"] * tickets.full + shows[selectedShow]["halfPrice"] * tickets.half}
                            </div>
                            <button className="tmb-btn" onClick={this.handleClick}>Select Seats</button>
                    </div>
                    }

                    { selectionModel &&
                        <div className='tmb-seat-selection'>
                            <SeatSelection max={tickets.full + tickets.half} totalSeats={Object.keys(seatData).length == 0 ? 0: seatData.numSeats}/>
                        </div>
                    }
                </div>
            }
            </React.Fragment>
        );
    }
}
 
export default withRouter(TheaterMovie);