import React, { Component } from 'react'
import Input from './input';
import '../Styles/login.css'
import Logo from "../Images/logo.png"
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../../src/firebase"

class Login extends Component {
    state = { data : {username: "", password: ""} , errors: {username: "", password: ""} } 

    handleChange = ({currentTarget: input}) => {
        const data = {...this.state.data};
        data[input.id] = input.value;
        this.setState({data});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {username, password} = this.state.data;
        signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            console.log(userCredential);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        const {username, password} = this.state.data;
        const {error} = this.state;
        return (
            <React.Fragment>
                <div className='login-container'>
                    <form onSubmit={this.handleSubmit} className='login-form'>
                    <div className='login-logo-container'>
                        <img className='login-logo' src={Logo}></img>
                    </div>
                    <div className='input-container'>
                        <div className='login-input username'>
                            <Input 
                                name={"username"}
                                label={"Username"}
                                value={username}
                                onChange={this.handleChange}
                                error={error}
                                type={'text'}
                            />
                        </div>

                        <div className='login-input password'>
                            <Input 
                                name={"password"}
                                label={"Password"}
                                value={password}
                                onChange={this.handleChange}
                                error={error}
                                type={'password'}
                            />
                        </div>
                    </div>
                        <button className="login-btn">Login</button>
                        <button className="login-btn">Google</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Login;