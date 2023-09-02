import React, { Component } from 'react'
import Dropdown from './dropdown';
import  Pic from "../assets/Transformers.jpg"
import TheaterCard from './theaterCard';
import "../Styles/theaters.css"

class Theaters extends Component {
    state = {AllTheaters:[], theaters:[], selectedVal: "", searchValue: ""};
    
    districts = [
    'All Theaters', 'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya', 'Galle',
    'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu',
    'Batticaloa', 'Ampara', 'Trincomalee', 'Kurunegala', 'Puttalam', 'Anuradhapura',
    'Polonnaruwa', 'Badulla', 'Monaragala', 'Ratnapura', 'Kegalle'
    ];

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

    handleClick = (name) => {
        console.log(name)
    }

    render() { 
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
                        <TheaterCard image={Pic} name="Regal Cinema" description="Get your best cinema experience" district="Matara" city="Akurassa" dimension="2D and 3D" ratings="4.7" label="Visit" onClick={this.handleClick}/>
                        <TheaterCard image={Pic} name="Regal Cinema" description="Get your best cinema experience" district="Matara" city="Akurassa" dimension="2D and 3D" ratings="4.7" label="Visit" onClick={this.handleClick}/>
                        <TheaterCard image={Pic} name="Regal Cinema" description="Get your best cinema experience" district="Matara" city="Akurassa" dimension="2D and 3D" ratings="4.7" label="Visit" onClick={this.handleClick}/>
                        <TheaterCard image={Pic} name="Regal Cinema" description="Get your best cinema experience" district="Matara" city="Akurassa" dimension="2D and 3D" ratings="4.7" label="Visit" onClick={this.handleClick}/>
                        <TheaterCard image={Pic} name="Regal Cinema" description="Get your best cinema experience" district="Matara" city="Akurassa" dimension="2D and 3D" ratings="4.7" label="Visit" onClick={this.handleClick}/>
                        <TheaterCard image={Pic} name="Regal Cinema" description="Get your best cinema experience" district="Matara" city="Akurassa" dimension="2D and 3D" ratings="4.7" label="Visit" onClick={this.handleClick}/>
                        <TheaterCard image={Pic} name="Regal Cinema" description="Get your best cinema experience" district="Matara" city="Akurassa" dimension="2D and 3D" ratings="4.7" label="Visit" onClick={this.handleClick}/>
                        <TheaterCard image={Pic} name="Regal Cinema" description="Get your best cinema experience" district="Matara" city="Akurassa" dimension="2D and 3D" ratings="4.7" label="Visit" onClick={this.handleClick}/>
                        <TheaterCard image={Pic} name="Regal Cinema" description="Get your best cinema experience" district="Matara" city="Akurassa" dimension="2D and 3D" ratings="4.7" label="Visit" onClick={this.handleClick}/>
                        <TheaterCard image={Pic} name="Regal Cinema" description="Get your best cinema experience" district="Matara" city="Akurassa" dimension="2D and 3D" ratings="4.7" label="Visit" onClick={this.handleClick}/>
                        <TheaterCard image={Pic} name="Regal Cinema" description="Get your best cinema experience" district="Matara" city="Akurassa" dimension="2D and 3D" ratings="4.7" label="Visit" onClick={this.handleClick}/>
                        <TheaterCard image={Pic} name="Regal Cinema" description="Get your best cinema experience" district="Matara" city="Akurassa" dimension="2D and 3D" ratings="4.7" label="Visit" onClick={this.handleClick}/>
                        <TheaterCard image={Pic} name="Regal Cinema" description="Get your best cinema experience" district="Matara" city="Akurassa" dimension="2D and 3D" ratings="4.7" label="Visit" onClick={this.handleClick}/>
                        <TheaterCard image={Pic} name="Regal Cinema" description="Get your best cinema experience" district="Matara" city="Akurassa" dimension="2D and 3D" ratings="4.7" label="Visit" onClick={this.handleClick}/>
                        <TheaterCard image={Pic} name="Regal Cinema" description="Get your best cinema experience" district="Matara" city="Akurassa" dimension="2D and 3D" ratings="4.8" label="Visit" onClick={this.handleClick}/>
                        </div>
                    </div>
                    
                </div>
            </React.Fragment>
        );
    }
}
 
export default Theaters;