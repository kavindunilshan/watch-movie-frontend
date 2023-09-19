import React, { Component } from 'react'
import Dropdown from './dropdown';
import  Pic from "../assets/Transformers.jpg"
import TheaterCard from './theaterCard';
import "../Styles/theaters.css"
import { withRouter } from './cs';
import { fetchData } from '../Services/httpService';

class Theaters extends Component {
    state = {AllTheaters:[], theaters:[], selectedVal: "", searchValue: ""};
    
    districts = [
    'All Theaters', 'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya', 'Galle',
    'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu',
    'Batticaloa', 'Ampara', 'Trincomalee', 'Kurunegala', 'Puttalam', 'Anuradhapura',
    'Polonnaruwa', 'Badulla', 'Monaragala', 'Ratnapura', 'Kegalle'
    ];

    async componentDidMount() {
        try {
            const theaters = await fetchData("/theaters");
            this.setState({movies: theaters});
            console.log(this.state.movies);
        } catch {
            console.log("Error has occured");
        }
    }

    handleSelect = (value) => {
        const selectedVal = value;
        var theaters = this.state.AllTheaters;

        if (selectedVal !== "All Theaters") {
            theaters.filter(theater => theater.district === selectedVal);
        }

        this.setState({theaters, selectedVal});

    }

    handleChange = ({currentTarget: input}) => {
        const searchValue = input.value;
        this.setState({searchValue});
    }

    handleClick = (id) => {
        const navigate = this.props.navigate;
        navigate(`/theater/?tid=${id}`)
    }

    render() {
        const {theaters} = this.state;
        return (
            <React.Fragment>
                <div className='th-page'>
                    <div className='th-left'>
                        <div className='th-dd'>
                            <Dropdown items={this.districts} onSelect={this.handleSelect} label="Select District"/>
                        </div>
                    </div>

                    <div className='th-right'>
                        <div className='th-search'>
                            <input className='th-search-input' placeholder='Search your theater' type='text' value={this.state.searchValue} onChange={this.handleChange}></input>
                        </div>
                        <div className='theater-cards-list'>
                            {theaters && theaters.map(theater => {
                                <TheaterCard id={theater.tid} image={theater.image} name={theater.name} description={theater.description} district={theater.district} city={theater.city} dimension={theater.dimension} ratings={theater.ratings} label="Visit" onClick={this.handleClick}/>
                            })}
                        </div>
                    </div>
                    
                </div>
            </React.Fragment>
        );
    }
}
 
export default withRouter(Theaters);