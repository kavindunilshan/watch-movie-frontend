import React, { Component } from 'react'
import './App.css';
import Login from './Components/login';
import NavBar from './Components/navbar';
import Slider from './Components/slider';
import Movie from './Components/movie';
import Theater from './Components/theater';
import Theaters from './Components/theaters';
import Movies from './Components/movies';
import { Route, Router, Routes } from 'react-router-dom';
import TheaterMovie from './Components/theaterMovie';
import Register from './Components/register';

class App extends Component {
  state = { items:[
    { _id: "5b21ca3eeb7f6fbccd471rt18", name: "All theaters" },
    { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" }
  ], selected: { _id: "5b21ca3eeb7f6fbccd471rt18", name: "All theaters" }}

  onSelect = (item) => {
    this.setState({selected:item})
  }

  render() { 
      return (
      <React.Fragment>
        <Register/>
      </React.Fragment>
    );
  }
}

export default App;
