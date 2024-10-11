import React, {Component} from 'react'
import Dropdown from './dropdown';
import TheaterCard from './theaterCard';
import "../Styles/theaters.css"
import {withRouter} from './cs';
import {fetchData} from '../Services/httpService';

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
            this.setState({theaters: theaters, AllTheaters: theaters});
            console.log(this.state.theaters);
        } catch {
            console.log("Error has occured");
        }
    }

    handleLanguageSelect = (value) => {
        const selectedVal = value;
        var theaters = this.state.AllTheaters;

        if (selectedVal !== "All Theaters") {
            const filteredTheaters = theaters.filter(theater => {
                return theater.location.district === selectedVal;
            });
            this.setState({theaters: filteredTheaters, selectedVal});
        } else {
            this.setState({theaters: theaters, selectedVal});
        }

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
                            <Dropdown items={this.districts} onSelect={this.handleLanguageSelect} label="Select District"/>
                        </div>
                    </div>

                    <div className='th-right'>
                        <div className='th-search'>
                            <input className='th-search-input' placeholder='Search your theater' type='text' value={this.state.searchValue} onChange={this.handleChange}></input>
                        </div>
                        <div className='theater-cards-list'>
                            {theaters && theaters.map((theater, index) => {
                                return <TheaterCard key={index} id={theater.tid} image={theater.pictures[0].name} name={theater.name} district={theater.location.district} description={theater.slogan} city={theater.location.city} dimension={theater.dimension} ratings={theater.ratings} label="Visit" onClick={this.handleClick}/>
                            })}
                        </div>
                    </div>
                    
                </div>
            </React.Fragment>
        );
    }
}
 
export default withRouter(Theaters);