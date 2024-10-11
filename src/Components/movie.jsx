import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import IMDB from "../assets/imdb.png"
import "../Styles/movie.css"
import {fetchData} from '../Services/httpService';
import {withRouter} from './cs';

class Movie extends Component {
    state = {movie:[], casts:[], reviews:[]}

    extractVideoId = (url) => {
        const match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu.be\/([^?]+)/) || url.match(/embed\/([^?]+)/) || url.match(/\/v\/([^?]+)/);
        if (match && match[1]) {
            return match[1];
        }
        return null;
        }

    generateEmbedLink = (link) => {
        const videoId = this.extractVideoId(link);
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return null;
        }

    async componentDidMount() {
        const {searchParams} = this.props;
        const mid = searchParams.get("mid");
        console.log("working", mid);

        try {
            const movies = await fetchData("/movies");
            var movie = movies[mid-1];
            const trailer = this.generateEmbedLink(movie.trailer);
            movie.trailer = trailer;
            this.setState({movie});
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
                    {movie.pictures && <img className='movie-picture' src={movie.pictures[1].name}></img>}
                    <div className='movie-links'>
                        <Link to={`${movie.imdb}`} target='_blank'>
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
                            src={movie.trailer}
                            allowFullScreen>
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