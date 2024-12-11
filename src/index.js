import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import "./Styles/slider.css"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "@asgardeo/auth-react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <AuthProvider
            config={ {
                signInRedirectURL: "http://localhost:3000",
                signOutRedirectURL: "http://localhost:3000",
                clientID: "7sZC7Fcd92FffmUW5lA6cXwwTA4a",
                baseUrl: "https://api.asgardeo.io/t/spendwise",
                scope: [ "openid", "write_movies", "profile", "email", "read_movies", "read_theaters", "write_theater"]
            } }
        >
            <App/>
        </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals()