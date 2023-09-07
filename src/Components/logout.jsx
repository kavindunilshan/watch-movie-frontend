import { signOut } from 'firebase/auth';
import React, { Component } from 'react'
import { auth } from '../firebase';


class Logout extends Component {
    async componentDidMount() {
        signOut(auth).then(() => {
            console.log("Log out");
        }).catch((error) => {
            console.log(error);
        });
        window.location = "/";
    }
    render() { 
        return null;
    }
}
 
export default Logout;