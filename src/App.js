import React, { Component } from 'react'
import './App.css';
import Login from './Components/login';
import NavBar from './Components/navbar';
import Slider from './Components/slider';
import Movie from './Components/movie';
import Theater from './Components/theater';
import Theaters from './Components/theaters';
import Movies from './Components/movies';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import TheaterMovie from './Components/theaterMovie';
import Register from './Components/register';
import theater from './Components/theater';
import NotFound from './Components/not-found';
import Logout from './Components/logout';
import Home from './Components/home';
import AboutUs from './Components/about-us';

class App extends Component {
  state = {}



  render() { 
      return (
      <React.Fragment>
        <NavBar/>
            <Routes>
              <Route path='/movies' element={<Movies/>}/>
              <Route path='/theaters' element={<Theaters/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/logout' element={<Logout/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/movie' element={<Movie/>}/>
              <Route path='/about-us' element={<AboutUs/>}/>
              <Route path='/theater' element={<Theater/>}/>
              <Route path='/theater-movie' element={<TheaterMovie/>}/>
              {/* <Route path='/movieForm' element={getCurrentUser() ? <MoviesForm/>:<Navigate to="/login" state={this.props.location}/>}/> */}
              <Route path='/not-found' element={<NotFound/>}/>
              <Route path='/' exact element={<Home/>}/>
              <Route path='*' element={<Navigate to="/not-found" replace/>}/>
            </Routes>
      </React.Fragment>
    );
  }
}

export default App;
