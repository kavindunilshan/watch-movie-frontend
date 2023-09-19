import React, { Component } from 'react'
import Slider from '../Components/slider';
import { Link } from 'react-router-dom';
import "../Styles/theater.css"
import  Pic from "../assets/Transformers.jpg"
import IMDB from "../assets/imdb.png"
import { AddressMap } from './map';
import { withRouter } from './cs';
import { MovieCard } from './movieCard';
import { fetchData } from '../Services/httpService';

class Theater extends Component {
    constructor(props) {
        super(props);
        this.targetRef1 = React.createRef();
        this.targetRef2 = React.createRef();
  }

    state = {theater:{}, location:[], reviews:[], showDetails:false, showLocation:false};

    async componentDidMount() { 
        const {searchParams} = this.props;
        const tid = searchParams.get("tid");

        try {
            const theaters = await fetchData("/theaters");
            this.setState({theater: theaters[tid]});
            console.log(this.state.theater);
        } catch {
            console.log("Error has occured");
        }
     }
    
    handleDetails = () => {
        const showDetails = !this.state.showDetails;
        this.setState({showDetails, showLocation:false});

        if(showDetails)
            this.targetRef2.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
    }

    handleLocation = () => {
        const showLocation = !this.state.showLocation;
        this.setState({showLocation, showDetails:false});

        if (showLocation)
            this.targetRef1.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
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

                    <div className='theater-links'>
                        <button className="theater-btn theater-details-btn" onClick={this.handleDetails}>Theater Details</button>
                        <img className='theater-picture' src={Pic}></img>
                        <button className="theater-btn theater-location-btn" onClick={this.handleLocation}>Theater Location</button>
                    </div>

                    <div ref={this.targetRef2}>
                        {   theater && showDetails &&
                            <div className='theater-details'>
                                <h1 className='theater-topic'>Theater Details</h1>
                                <div className='theater-details-content'>
                                    <div className='theater-details-content-each'>Name: {theater.name}</div>
                                    <div className='theater-details-content-each'>Dimention: {theater.dimension}</div>
                                    <div className='theater-details-content-each'>City: {theater.city}</div>
                                    <div className='theater-details-content-each'>WatchMovie ratings: {theater.ratings}</div>
                                </div>
                            </div>
                        }
                    </div>

                    <div ref={this.targetRef1}>
                        {   theater && showLocation && 
                            <div className='theater-details'>
                                <h1 className='theater-topic'>Theater Location</h1>

                                <div className='theater-maps'>
                                    <AddressMap/>
                                </div>
                            </div>
                        }
                    </div>

                    <div className='theater-movies-list'>
                        <h1 className='theater-topic'>PREMIERING NOW</h1>
                        <div className='theater-movie-cards-list'>
                            <MovieCard image={Pic} status="18+" name="Transformers" genre="Action Thriller" ratings="4.6"/>
                            <MovieCard image={Pic} status="18+" name="Transformers" genre="Action Thriller" ratings="4.6"/>
                            <MovieCard image={Pic} status="18+" name="Transformers" genre="Action Thriller" ratings="4.6"/>
                            <MovieCard image={Pic} status="18+" name="Transformers" genre="Action Thriller" ratings="4.6"/>
                            <MovieCard image={Pic} status="18+" name="Transformers" genre="Action Thriller" ratings="4.6"/>
                            <MovieCard image={Pic} status="18+" name="Transformers" genre="Action Thriller" ratings="4.6"/>
                            <MovieCard image={Pic} status="18+" name="Transformers" genre="Action Thriller" ratings="4.6"/>
                        </div>
                    </div>

                    <div className='theater-details'>
                        <h1 className='theater-topic'>Share your thoughts with Us...</h1>

                        <h2 className='theater-review'>We will highly appriciate that if you could share
                        your thoughts with us.</h2>
                        <button className="theater-btn theater-review-btn" onClick={this.handleClick}>Add Review</button>

                    </div>

                    <div className='theater-details'>
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