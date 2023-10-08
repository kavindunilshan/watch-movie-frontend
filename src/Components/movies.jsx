import React, { Component } from 'react'
import Dropdown from './dropdown';
import  Pic from "../assets/Transformers.jpg"
import TheaterCard from './theaterCard';
import "../Styles/movies.css"
import { MovieCard } from './movieCard';
import { withRouter } from './cs';
import { fetchData } from '../Services/httpService';
import { toast } from 'react-toastify';

class Movies extends Component {
    state = {AllMovies:[], movies:[], images:[], selectedVal: "", searchValue: ""};
    
    languages = ["All Movies", "Sinhala", "English", "Tamil", "Hindi", "Malayalam"];

    async componentDidMount() {
        try {
            const movies = await fetchData("/movies");
            this.setState({movies, AllMovies:movies});
        } catch {
            console.log("Error has occured");
        }
    }

    handleLanguageSelect = (value) => {
        const selectedVal = value;
        var movies = this.state.AllMovies;

        if (selectedVal !== "All Movies") {
            const filteredMovies = movies.filter(movie => {
                return movie.language === selectedVal;
            });
            this.setState({movies: filteredMovies, selectedVal});
        } else {
            this.setState({movies, selectedVal});
        }

    }

    handleChange = ({currentTarget: input}) => {
        const searchValue = input.value;
        this.setState({searchValue});

        var movies = this.state.AllMovies;

        if (searchValue.length !== 0) {
            movies = movies.filter(movie => movie.name.toLowerCase().startsWith(searchValue.toLowerCase()));
        }
        else {
            movies = this.state.AllMovies;
        }
        this.setState({movies: movies, searchValue});
    }

    handleClick = (mid) => {
        const navigate = this.props.navigate;
        navigate(`/movie/?mid=${mid}`);
    }

    render() {
        const {movies} = this.state;
        return (
            <React.Fragment>
                <div className='mv-page'>
                    <div className='mv-left'>
                        <div className='mv-dd'>
                            <Dropdown items={this.languages} label="Language" onSelect={this.handleLanguageSelect} />
                        </div>
                    </div>

                    <div className='mv-right'>
                        <div className='mv-search'>
                            <input className='mv-search-input' placeholder='Search Movie by name' type='text' value={this.state.searchValue} onChange={this.handleChange}></input>
                        </div>
                        <div className='mv-cards-list'>
                            {this.state.movies && this.state.movies.map((movie, index) => 
                                {
                                   return <MovieCard key={index} id={movie.mid} image={movie.pictures[1].name} status={movie.status} name={movie.name} language={movie.language} dimension={movie.dimesion} genre={movie.genre} ratings={movie.rating} label="Watch" onClick={this.handleClick}/>
                                })
                            }
                        </div>
                    </div>
                    
                </div>
            </React.Fragment>
        );
    }
}
 
export default withRouter(Movies);