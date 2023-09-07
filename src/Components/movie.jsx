import React, { Component } from 'react'
import Slider from '../Components/slider';
import { Link } from 'react-router-dom';
import  Pic from "../assets/Transformers.jpg"
import IMDB from "../assets/imdb.png"
import "../Styles/movie.css"
import { fetchData } from '../Services/httpService';
import { withRouter } from './cs';

class Movie extends Component {
    state = {movie:[], casts:[], reviews:[]}

    async componentDidMount() {
        try {
            const movie = await fetchData();
            this.setState({movie: movie[0]});
        } catch {
            console.log("Error has occured");
        }
    }

    handleClick = () => {
        const navigate = this.props.navigate;
        navigate("/theaters")
    }

    render() { 
        const {movie, casts, reviews} = this.state;
        return (
            <React.Fragment>
                <div className='movie-page'>
                    <img className='movie-picture' src={movie.image}></img>
                    <div className='movie-links'>
                        <Link to={`${movie.imdb}`}>
                            <button className="movie-btn">IMDB Profile</button>
                        </Link>

                        <button className="movie-btn" onClick={this.handleClick}>Find Your Theater</button>
                    </div>
                                   
                    <div className='movie-details'>
                        <h1 className='movie-topic'>Movie Details</h1>

                        {movie && <div className='movie-details-content'>
                            <div className='movie-details-content-each'>Title: {movie.name}</div>
                            <div className='movie-details-content-each'>Dimention: {movie.dimesion}</div>
                            <div className='movie-details-content-each'>Status: {movie.status}</div>
                            <div className='movie-details-content-each'>Genre: {movie.genre}</div>
                            <div className='movie-details-content-each'>Duration: {movie.duration}</div>
                            <div className='movie-details-content-each'>WatchMovie ratings: {movie.ratings}</div>
                        </div>}
                    </div>

                    <div className='movie-trailer-details'>
                        <h1 className='movie-topic'>Movie Trailer</h1>
                        <iframe className='movie-trailer'
                            src={movie.trailer}>
                        </iframe>
                    </div>

                    <h1 className='movie-topic'>Cast Details</h1>
                    <div className='movie-cast-card'>
                            {casts.map(cast => {cast &&
                                <div className='cast-card'>
                                    <img src={IMDB} alt="Cast Member" className="cast-image" />
                                    <p className="cast-name">name</p>
                                </div>
                            })}
                    </div>

                    <div className='movie-review-details'>
                        <h1 className='movie-topic'>Share your thoughts with Us...</h1>

                        <h2 className='movie-review'>We will highly appriciate that if you could share
                        your thoughts with us.</h2>
                        <button className="movie-btn" onClick={this.handleClick}>Add Review</button>

                    </div>

                    <div className='movie-user-reviews'>
                        <h1 className='movie-topic'>User Reviews</h1>
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
 
export default withRouter(Movie);