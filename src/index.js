import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import "./Styles/slider.css"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "@asgardeo/auth-react";

const clientID = process.env.ASGARDIO_CLIENT_ID;
const baseUrl = process.env.ASGARDIO_BASE_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <AuthProvider
            config={ {
                signInRedirectURL: "http://localhost:3000",
                signOutRedirectURL: "http://localhost:3000",
                clientID: clientID,
                baseUrl: baseUrl,
                scope: [ "openid", "profile", "email", "read_movies"]
            } }
        >
            <App/>
        </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals()