import React, { Component } from 'react';
import {registerUser} from '../../actions/authActions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


class RegisterForm extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.auth.isLoggedIn) {
            this.props.history.push('/dashboard');
        }
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
      const {errors} = this.props;
      console.log('errors in register are ', errors);
    return (
      <div>
        <form onSubmit={this.onSubmit}>
            <input 
                type="text" 
                name="name" 
                placeholder="Name"
                // required
                // error={errors.name}
            />
            <br/>
            {errors.name && <p className="error-msg">{JSON.stringify(errors.name)}</p>}
            <br/>
            <input 
                type="email" 
                name="email" 
                placeholder="Email"
                error={errors.email}
            />
            <br/>
            {errors.email && <p className="error-msg">{JSON.stringify(errors.email)}</p>}
            <br/>
            <input 
                type="password" 
                name="password" 
                placeholder="Password"
                error={errors.password}
            />
            <br/>
            {errors.password && <p className="error-msg">{JSON.stringify(errors.password)}</p>}
            <br/>
            <input 
                type="password" 
                name="password2" 
                placeholder="Confirm Password"
                error={errors.password2}
            />
            <br/>
            {errors.password2 && <p className="error-msg">{JSON.stringify(errors.password2)}</p>}
            <br/>
            <button>Sign Up</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state=> ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(RegisterForm));