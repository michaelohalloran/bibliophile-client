import React, { Component } from 'react';
import axios from 'axios';
import {registerUser} from '../../actions/authActions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


class RegisterForm extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
     
        const newUser = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            password2: e.target.password2.value
        }
    
        console.log(newUser);
        this.props.registerUser(newUser, this.props.history);
        //clear inputs
        e.target.name.value = '';
        e.target.email.value = '';
        e.target.password.value = '';
        e.target.password2.value = '';
    }

  render() {
      
    return (
      <div>
        <form onSubmit={this.onSubmit}>
            <input 
                type="text" 
                name="name" 
                placeholder="Name"
                required
            />
            <br/>
            <input 
                type="email" 
                name="email" 
                placeholder="Email"
                required
            />
            <br/>
            <input 
                type="password" 
                name="password" 
                placeholder="Password"
                required
            />
            <br/>
            <input 
                type="password" 
                name="password2" 
                placeholder="Confirm Password"
                required
            />
            <br/>
            <button>Sign Up</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state=> ({
    auth: state.auth
});

export default connect(mapStateToProps, {registerUser})(withRouter(RegisterForm));