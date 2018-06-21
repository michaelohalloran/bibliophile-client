//LOGIC FLOW:
//1. capture input values via handleLogin
//2. pass those values as an object to submitLoginForm action creator
//3. submitLogForm makes axios backend request
//4. if successful, it dispatches the loginUser action
//5. reducer than updates state with now-logged-in user

import React from 'react';
import './LandingPage.css';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


class LandingPage extends React.Component {

    componentDidMount() {
        //check for logged in user, if he's auth, redirect him to dash
        if(this.props.auth.isLoggedIn) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        //check for logged in user, if he's auth, redirect him to dash
        if(nextProps.auth.isLoggedIn) {
            this.props.history.push('/dashboard');
        }
    }


    render() {
        return (
            <div>
                <h2 id="landing-intro">Do you love to read?<br />  
                Then you've come to the right place</h2>
                <p id="demo">Demo login: email: kevin@gmail.com, password: 123456</p>
        </div>
        );
    }
}

const mapStateToProps = state => ({ 
    auth: state.auth
});

export default connect(mapStateToProps)(withRouter(LandingPage));



