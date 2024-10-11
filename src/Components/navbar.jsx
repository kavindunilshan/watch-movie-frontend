import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import Logo from '../Images/logo.png';
import '../Styles/navbar.css';
import {useAuthContext} from "@asgardeo/auth-react";

function NavBar() {
    const { state, signIn, signOut } = useAuthContext();

  return (
    <React.Fragment>
      <div className="nav-logo">
        <img className="logo" src={Logo} alt="Logo" />
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/theaters">
              Theaters
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/movies">
              Movies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/about-us">
              About-Us
            </NavLink>
          </li>
        </ul>
      </nav>
      {!state?.isAuthenticated &&
        <section className="nav-btns">
            <button className="nav-btn">
                <div className="btn-link" aria-current="page" onClick={() => signIn()}>
                    Login
                </div>
            </button>
        </section>
      }

    {state?.isAuthenticated &&
        <section className="nav-btns">
            <button className="nav-btn">
            <div className="btn-link" aria-current="page" onClick={() => signOut()}>
                LogOut
            </div>
            </button>
        </section>
      }

      <section className="nav-line">
        <hr />
      </section>
    </React.Fragment>
  );
}

export default NavBar;
