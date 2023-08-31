import React, { Component } from 'react'
import Slider from '../Components/slider';
import { Link } from 'react-router-dom';
import  Pic from "../assets/Transformers.jpg"
import IMDB from "../assets/imdb.png"
import "../Styles/movie.css"

class Movie extends Component {
    state = {movie:[], casts:[], reviews:[]} 
    render() { 
        const {movie, casts, reviews} = this.state;
        return (
            <React.Fragment>
                <div className='movie-page'>
                    <div className='movie-links'>
                        <Link to={`${movie.imdb}`}>
                            <img className='imdb-logo' src={IMDB}></img>
                        </Link>
                    <img className='movie-picture' src={Pic}></img>
                    <button className="movie-theater-btn" onClick={this.handleClick}>Find Your Theater</button>
                    </div>
                                   
                    <div className='movie-details'>
                        <h1 className='movie-topic'>Movie Details</h1>

                        {movie && <div className='movie-details-content'>
                            <div className='movie-details-content-each'>Title: {movie.title}</div>
                            <div className='movie-details-content-each'>Dimention: {movie.title}</div>
                            <div className='movie-details-content-each'>Status: {movie.title}</div>
                            <div className='movie-details-content-each'>Genre: {movie.genre}</div>
                            <div className='movie-details-content-each'>Duration: {movie.title}</div>
                            <div className='movie-details-content-each'>WatchMovie ratings: {movie.ratings}</div>
                        </div>}

                        {/* {movie && <div className='movie-explore'>
                            <div className='explore-image'>
                                <Link to={`${movie.imdb}`}>
                                    <img src='../Images/logo.png'></img>
                                </Link>
                            </div>
                            <div className='explore-image'>
                                <Link to={`${movie.imdb}`}>
                                    <img src='../Images/logo.png'></img>
                                </Link>
                            </div>
                        </div>} */}
                    </div>

                    <div className='movie-trailer-details'>
                        <h1 className='movie-topic'>Movie Trailer</h1>
                        <iframe className='movie-trailer'
                            src="https://www.youtube.com/embed/itnqEauWQZM">
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
 
export default Movie;