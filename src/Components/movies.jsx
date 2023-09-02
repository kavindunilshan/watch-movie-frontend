import React, { Component } from 'react'
import Dropdown from './dropdown';
import  Pic from "../assets/Transformers.jpg"
import TheaterCard from './theaterCard';
import "../Styles/movies.css"
import { MovieCard } from './movieCard';
import { withRouter } from './cs';

class Movies extends Component {
    state = {AllMovies:[], movies:[], selectedVal: "", searchValue: ""};
    
    languages = ["All Movies", "Sinhala", "English", "Tamil", "Hindi", "Malayalam"];

    handleSelect = (value) => {
        const selectedVal = value;
        var movies = this.state.AllMovies;

        if (selectedVal !== "All Movies") {
            movies.filter(theater => theater.district === selectedVal);
        }

        this.setState({theaters: movies, selectedVal});

    }

    handleChange = ({currentTarget: input}) => {
        const searchValue = input.value;
        this.setState({searchValue});
    }

    handleClick = () => {
        console.log("working");
        const navigate = this.props.navigate;
        navigate("/theaters");
    }

    render() { 
        return (
            <React.Fragment>
                <div className='mv-page'>
                    <div className='mv-left'>
                        <div className='mv-dd'>
                            <Dropdown items={this.languages} label="Language" onSelect={this.handleSelect} />
                        </div>
                    </div>

                    <div className='mv-right'>
                        <div className='mv-search'>
                            <input className='mv-search-input' placeholder='Search Language' type='text' value={this.state.searchValue} onChange={this.handleChange}></input>
                        </div>
                        <div className='mv-cards-list'>
                            <MovieCard image={Pic} status="18+" name="Transformers" genre="Action Thriller" ratings="4.6" label="Watch" onClick={this.handleClick}/>
                            <MovieCard image={Pic} status="18+" name="Transformers" genre="Action Thriller" ratings="4.6" label="Watch" onClick={this.handleClick}/>
                            <MovieCard image={Pic} status="18+" name="Transformers" genre="Action Thriller" ratings="4.6" label="Watch" onClick={this.handleClick}/>
                            <MovieCard image={Pic} status="18+" name="Transformers" genre="Action Thriller" ratings="4.6" label="Watch" onClick={this.handleClick}/>
                            <MovieCard image={Pic} status="18+" name="Transformers" genre="Action Thriller" ratings="4.6" label="Watch" onClick={this.handleClick}/>
                            <MovieCard image={Pic} status="18+" name="Transformers" genre="Action Thriller" ratings="4.6" label="Watch" onClick={this.handleClick}/>
                            <MovieCard image={Pic} status="18+" name="Transformers" genre="Action Thriller" ratings="4.6" label="Watch" onClick={this.handleClick}/>
                        </div>
                    </div>
                    
                </div>
            </React.Fragment>
        );
    }
}
 
export default withRouter(Movies);