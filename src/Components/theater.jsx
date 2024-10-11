import React, {Component} from 'react'
import "../Styles/theater.css"
import {AddressMap} from './map';
import {withRouter} from './cs';
import {MovieCard} from './movieCard';
import {fetchData} from '../Services/httpService';

class Theater extends Component {
    constructor(props) {
        super(props);
        this.targetRef1 = React.createRef();
        this.targetRef2 = React.createRef();
  }

    state = {theater:{}, location:[], reviews:[], movies:[], shows:[], showDetails:false, showLocation:false};

    getMovies = (movies) => {
        const MovieSet = new Set();
        movies.forEach(element => {
            MovieSet.add(element.id.mid);
        });
        console.log(Array.from(MovieSet));
        return [...MovieSet];
    }

    async componentDidMount() { 
        const {searchParams} = this.props;
        const tid = searchParams.get("tid");

        try {
            const theater = await fetchData(`/theaters/${tid}`);
            const shows = await fetchData(`/theaterMovies/${tid}`);
            const filterShows = this.getMovies(shows).join(",");
            const movies = await fetchData(`/movies/list?items=${filterShows}`);
            this.setState({theater, movies, shows});
        } catch(e) {
            console.log("Error has occured", e);
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

    handleClick = (mid) => {
        const navigate = this.props.navigate;
        const {searchParams} = this.props;
        const tid = searchParams.get("tid");
        navigate(`/theater-movie/?tid=${tid}&mid=${mid}`);
    }

    render() { 
        const {theater, casts, reviews, movies, showDetails, showLocation} = this.state;
        return (
            <React.Fragment>
                {
                    theater && 
                <div className='theater-page'>
                    {theater.pictures && <img className='theater-picture' src={theater.pictures[1].name}></img>}
                    <div className='theater-links'>
                        <button className="theater-btn theater-details-btn" onClick={this.handleDetails}>Theater Details</button>
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
                        {movies && movies.map((movie, index) => {
                            return <MovieCard key={index} id={movie.mid} image={movie.pictures[1].name} status={movie.status} name={movie.name} language={movie.language} dimension={movie.dimesion} genre={movie.genre} ratings={movie.rating} label="Book" onClick={this.handleClick}/>
                        })}
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
                }
            </React.Fragment>
        );
    }
}
 
export default withRouter(Theater);