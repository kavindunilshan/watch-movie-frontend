import React, {Component} from 'react'
import "../Styles/theaterMovie.css"
import Dropdown from './dropdown';
import NumberInput from './quantity';
import SeatSelection from './seatSelection';
import {fetchData, updateData} from '../Services/httpService';
import {withRouter} from './cs';
import DateField from './dateField';
import BasicSelect from './materialDropDown';
import {toast} from 'react-toastify';

class TheaterMovie extends Component {
    state = {theater:{}, movie:{}, 
    shows:{}, selectionModel: false,
    total: 0, tickets: {full: 0, half: 0},
    showTime: "", showTimes:[], selectedShow: null,
    date: "", seatData: {}
}
    

    async componentDidMount() {

        if (!this.props.state.isAuthenticated) {
            this.props.signIn();
        }


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
            
        }
     }

    handleTotal = (id, status) => {
        let {tickets} = this.state;

        if (status === "Add") {
            tickets[id] += 1;
        } else {
            tickets[id] -= 1;
        }
        this.setState({tickets});
    }

     handleClick = async () => {
        const {searchParams} = this.props;
        const tid = searchParams.get("tid");
        const mid = searchParams.get("mid");
        const {showTime, date} = this.state;

        const show = this.state.shows.find(show => show.id.timeSlot == showTime);
        

        let seatData = await fetchData(`/seatData/${tid}/${mid}/${showTime}/${date}`);

        console.log("Seat Data", seatData);
        
        if (!seatData?.id) {
            const hallData = await fetchData(`/halls/${tid}/${show.hid}`);
            
            const numSeats = hallData.seats;
            const seats = "0".repeat(numSeats);

            const newSeatData = {
                id: {
                    tid: tid,
                    mid: mid,
                    timeSlot: showTime,
                    date: date,
                },
                numSeats: numSeats,
                seats: seats,
                hid: show.hid,
            }

            

             seatData = await updateData("/seatData", newSeatData);

        }

        
        this.setState({seatData, selectionModel:true});
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

    handleSeatBooking = async (seatsList) => {
        const navigate = this.props.navigate;
        const seats = seatsList.join("").replace(/2/g, "1");
        const seatData = {...this.state.seatData}
        seatData["seats"] = seats;

        
        try{
            const data = await updateData("/seatData", seatData);
            toast("Payment Successful!");
        } catch {
            toast.error("Payment Unsuccessful!");
        }
        navigate("/");
    }

    render() {
        const {theater, movie, shows, tickets, selectionModel, showTime, selectedShow, seatData} = this.state;
        return (
            <React.Fragment>
            {this.props.state.isAuthenticated && theater && movie && shows &&
                <div>
                    <div className={selectionModel ? "tmb tmb-active" : "tmb"} onClick={this.handleDone}>
                        <div className='tmb-heading'>
                            <h1 className='tmb-th-name'>{theater.name}</h1>
                            <h4 className='tmb-th-description'>{theater.slogan}</h4>
                        </div>

                        <div className='tmb-movie-data'>
                            {theater.pictures && <img className='theater-picture' src={theater.landscape}></img>}
                        </div>
                        <h1 className='tmb-mv-name'>Movie: {movie.name}</h1>

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
                                <BasicSelect value={showTime} items={shows} onChange={this.handleItemSelect}
                                             label="Show Time"/>
                            </div>
                        </div>

                        <div className='tmb-prices'>
                            <h2 className='tmb-sub-heading'>Ticket Price Details</h2>
                            <div className='tmb-ticket-price'>Full Ticket
                                Price: {selectedShow == null ? "" : shows[selectedShow]["fullPrice"]}</div>
                            <div className='tmb-ticket-price'>Half Ticket
                                Price: {selectedShow == null ? "" : shows[selectedShow]["halfPrice"]}</div>
                        </div>

                    </div>

                    {!selectionModel &&
                        <div className='total-seat-details'>
                            <div className='tmb-total'>
                                Total
                                price: {selectedShow == null ? 0 : shows[selectedShow]["fullPrice"] * tickets.full + shows[selectedShow]["halfPrice"] * tickets.half}
                            </div>
                            <button className="tmb-btn" onClick={this.handleClick}>Select Seats</button>
                        </div>
                    }

                    {selectionModel &&
                        <div className='tmb-seat-selection'>
                            <SeatSelection max={tickets.full + tickets.half}
                                           totalSeats={seatData == null ? 0 : seatData.numSeats}
                                           seatData={seatData == null ? "0" : seatData.seats}
                                           onClick={this.handleSeatBooking}/>
                        </div>
                    }
                </div>
            }
            </React.Fragment>
        );
    }
}

export default withRouter(TheaterMovie);