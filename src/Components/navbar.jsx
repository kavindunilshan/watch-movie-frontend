import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import Logo from "../Images/logo.png"
import "../Styles/navbar.css"

class NavBar extends Component {
    render() { 
        return(
            <React.Fragment>
                <div className='nav-logo'>
                        <img className='logo' src={Logo}></img>
                </div>
                <nav className='navbar'>
                        <ul className='nav-list'>
                            <li className='nav-item'>
                                <NavLink className="nav-link" aria-current="page" to="/movies">Home</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className="nav-link" aria-current="page" to="/movies">Theaters</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className="nav-link" aria-current="page" to="/movies">Movies</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className="nav-link" aria-current="page" to="/movies">About-Us</NavLink>
                            </li>
                        </ul>
                </nav>
                <section className='nav-btns'>
                    <button className='nav-btn'>
                        <Link className="btn-link" aria-current="page" to="/movies">Login</Link>
                    </button>
                    <button className='nav-btn'>
                        <Link className="btn-link" aria-current="page" to="/movies">Register</Link>
                    </button>
                </section>
                <section className='nav-line'>
                    <hr></hr>
                </section>
            </React.Fragment>
        );
    }
}
 
export default NavBar;