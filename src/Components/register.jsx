import React, { Component } from 'react'
import Input from './input';
import '../Styles/register.css'
import Logo from "../Images/logo.png"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

class Register extends Component {
    state = { data : {name: "", username: "", password1: "", password2: ""} , errors: {name: "", username: "", password: "", password2: ""} } 

    handleChange = ({currentTarget: input}) => {
        const data = {...this.state.data};
        data[input.id] = input.value;
        this.setState({data});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {username, password1} = this.state.data;
        createUserWithEmailAndPassword(auth, username, password1)
        .then((userCredential) => {
            console.log(userCredential);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        const {name, username, password, password2} = this.state.data;
        const {error} = this.state;
        return (
            <React.Fragment>
                <div className='register-container'>
                    <form onSubmit={this.handleSubmit} className='register-form'>
                    <div className='register-logo-container'>
                        <img className='register-logo' src={Logo}></img>
                    </div>
                    <div className='input-container'>
                        <div className='register-input name'>
                            <Input 
                                name={"name"}
                                label={"Name"}
                                value={name}
                                onChange={this.handleChange}
                                error={error}
                                type={'text'}
                            />
                        </div>
                        <div className='register-input username'>
                            <Input 
                                name={"username"}
                                label={"Username"}
                                value={username}
                                onChange={this.handleChange}
                                error={error}
                                type={'text'}
                            />
                        </div>

                        <div className='register-input password'>
                            <Input 
                                name={"password1"}
                                label={"Password"}
                                value={password}
                                onChange={this.handleChange}
                                error={error}
                                type={'password'}
                            />
                        </div>
                        <div className='register-input password'>
                            <Input 
                                name={"password2"}
                                label={"Confirm Password"}
                                value={password2}
                                onChange={this.handleChange}
                                error={error}
                                type={'password'}
                            />
                        </div>
                    </div>
                        <button className="register-btn">Register</button>
                        <button className="register-btn">Google</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Register;