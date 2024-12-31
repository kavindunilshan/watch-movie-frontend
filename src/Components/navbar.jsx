import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import Logo from '../Images/logo.png';
import '../Styles/navbar.css';
import {useAuthContext} from "@asgardeo/auth-react";
import {fetchData} from "../Services/admin-services";

function NavBar() {
    const { state, signIn, signOut, getBasicUserInfo, getAccessToken } = useAuthContext();

    useEffect(() => {
        async function fetchData() {
            const userInfo = await getBasicUserInfo();
            const accessToken = await getAccessToken();
        }
        if (state?.isAuthenticated) {
            fetchData();
        }
    }, [state]);

    const handleSignIn = async () => {
        signIn().then(() => {
            fetchData("/users");
        });
    }


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
                <div className="btn-link" aria-current="page" onClick={() => handleSignIn()}>
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
