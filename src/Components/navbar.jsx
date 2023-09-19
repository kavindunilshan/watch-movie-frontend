import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../Images/logo.png';
import '../Styles/navbar.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

function NavBar() {
    const [authUser, setAuthUser] = useState(null);

    useEffect( () => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        }
    }, []
    );

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
      {!authUser && 
        <section className="nav-btns">
            <button className="nav-btn">
            <Link className="btn-link" aria-current="page" to="/login">
                Login
            </Link>
            </button>
            <button className="nav-btn">
            <Link className="btn-link" aria-current="page" to="/register">
                Register
            </Link>
            </button>
        </section>
      }

    {authUser && 
        <section className="nav-btns">
            <button className="nav-btn">
            <Link className="btn-link" aria-current="page" to="/logout">
                LogOut
            </Link>
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
