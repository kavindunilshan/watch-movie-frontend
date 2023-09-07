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
import theater from './Components/theater';

class App extends Component {
  state = {}



  render() { 
      return (
      <React.Fragment>
        <NavBar/>
            <Routes>
              <Route path='/movies' element={<Movies/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/logout' element={<Logout/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/customers' element={<Customers/>}/>
              <Route path='/rentals' element={<Rentals/>}/>
              <Route path='/movieForm' element={getCurrentUser() ? <MoviesForm/>:<Navigate to="/login" state={this.props.location}/>}/>
              <Route path='/not-found' element={<NotFound/>}/>
              <Route path='/' exact element={<Navigate to="/movies" replace/>}/>
              <Route path='*' element={<Navigate to="/not-found" replace/>}/>
            </Routes>
      </React.Fragment>
    );
  }
}

export default App;
