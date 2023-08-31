import React, { Component } from 'react'
import { logout } from '../services/authService';

class Logout extends Component {
    async componentDidMount() {
        await logout();
        window.location = "/";
    }
    render() { 
        return null;
    }
}
 
export default Logout;