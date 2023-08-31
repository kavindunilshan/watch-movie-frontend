import React, { Component } from 'react'
import Slider from '../Components/slider';
import { Link } from 'react-router-dom';
import "../Styles/theater.css"
import { AddressMap } from './map';
import { withRouter } from './cs';

class Theater extends Component {
    state = {theater:[], location:[], reviews:[], showDetails:false, showLocation:false};
    
    handleDetails = () => {
        const showDetails = !this.state.showDetails;
        this.setState({showDetails});
    }

    handleLocation = () => {
        const showLocation = !this.state.showLocation;
        this.setState({showLocation});
    }

    handleMap = () => {
        const navigate = this.props.navigate;
        navigate("https://www.google.com");
    }

    render() { 
        const {theater, casts, reviews, showDetails, showLocation} = this.state;
        return (
            <React.Fragment>
                <div className='theater-page'>  
                    <Slider/>

                    <button className='theater-btn theater-details-btn' onClick={() => this.handleDetails}>Theater Details</button>                 
                    {   theater && showDetails &&
                        <div className='theater-details'>
                            <h1 className='theater-topic'>Theater Details</h1>
                            
                            <div className='theater-details-content'>
                                <div className='theater-details-content-each'>Name: {theater.name}</div>
                                <div className='theater-details-content-each'>Dimension: {theater.dimension}</div>
                                <div className='theater-details-content-each'>Screen resolution: {theater.resolutiom}</div>
                                <div className='theater-details-content-each'>Seating Capacity: {theater.capacirty}</div>
                                <div className='theater-details-content-each'>WatchMovie ratings: {theater.ratings}</div>
                            </div>
                        </div>
                    }

                    <button className='theater-btn theater-location-btn' onClick={() => this.handleLocation}>Theater Location</button>
                    {   theater && showLocation && 
                        <div className='theater-cast-details'>
                            <h1 className='theater-topic'>Theater Location</h1>

                            <div className='theater-map'>
                                <AddressMap/>
                            </div>

                            <button className="theater-btn" onClick={() => this.handleClick}>Use Google Map</button>
                        </div>
                    }

                    <div className='theater-cast-details'>
                        <h1 className='theater-topic'>Share your thoughts with Us...</h1>

                        <h2 className='theater-review'>We will highly appriciate that if you could share
                        your thoughts with us.</h2>
                        <button className="theater-btn" onClick={this.handleClick}>Add Review</button>

                    </div>

                    <div className='theater-user-reviews'>
                        <h1 className='theater-topic'>User Reviews on {theater.name}</h1>
                        {reviews.map(review => {review &&
                                <div className='each-review-detail'>
                                    <h1 className='review-username'>{review.username}</h1>
                                    <h1 className='review-data'>{review.data}</h1>
                                </div>
                        })}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default withRouter(Theater);