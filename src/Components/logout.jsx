import {signOut} from 'firebase/auth';
import {Component} from 'react'
import {auth} from '../firebase';


class Logout extends Component {
    async componentDidMount() {
        signOut(auth).then(() => {
            
        }).catch((error) => {
            
        });
        window.location = "/";
    }
    render() { 
        return null;
    }
}
 
export default Logout;