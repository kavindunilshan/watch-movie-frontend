import React, {Component} from 'react'
import "../Styles/home.css"
import Slider from './slider';
import SloganText from './Slogans';
import {withRouter} from './cs';
import {createData} from "../Services/httpService";

class Home extends Component {

    componentDidMount() {
        const {state} = this.props;
        if (state.isAuthenticated) {
            const {email, sub} = state;
            const id = sub.replace(/-/g, "");
            createData("/users", {id: id, email: email});
        }
    }

    handleClick = () => {
        const navigate = this.props.navigate;
        navigate("/movies");
    }
    render() { 
        return (
            <React.Fragment>
                <div className='home-container'>
                    <div className='slider'>
                        <Slider/>
                    </div>
                    <div className='home-content'>
                        <div className='home-slogans'>
                            <SloganText text={"Connecting You to the Best of Sri Lankan Cinema - watchMovie"}/>
                        </div>
                        <button className='explore-btn' onClick={this.handleClick}>Explore Movies</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default withRouter(Home);