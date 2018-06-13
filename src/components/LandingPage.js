//LOGIC FLOW:
//1. capture input values via handleLogin
//2. pass those values as an object to submitLoginForm action creator
//3. submitLogForm makes axios backend request
//4. if successful, it dispatches the loginUser action
//5. reducer than updates state with now-logged-in user

import React from 'react';
import './LandingPage.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class LandingPage extends React.Component {

    componentDidMount() {
        //check for logged in user, if he's auth, redirect him to dash
        if(this.props.auth.isLoggedIn) {
            this.props.history.push('/dashboard');
        }

    }
    render() {
        return (
            <div>
                {/* <h1>Bibliophile</h1> */}
                <h2>Do you love to read?  Then you've come to the right place</h2>

                {/* <LoginForm handleLogin={this.handleLogin}/> */}
                {/* <button onSubmit={()=>console.log('hit sign up btn')}>Sign up</button> */}
                {/* <Link to='/login'><button>Login</button></Link>
                <Link to='/register'><button>Sign Up</button></Link> */}
        </div>
        );
    }
}

const mapStateToProps = state => ({ 
    auth: state.auth
});

export default connect(mapStateToProps)(LandingPage);



