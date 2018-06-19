import React, { Component } from 'react';
import {loginUser} from '../../actions/authActions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


class LoginForm extends Component {
    constructor() {
        super();
        this.handleLogin = this.handleLogin.bind(this);
    }

    //if user already logged in, redirect him to dash
    componentDidMount() {
        if(this.props.auth.isLoggedIn) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isLoggedIn) {
            this.props.history.push('/dashboard');
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const userData = {
            email: e.target.email.value.trim(),
            password: e.target.password.value.trim()
        }
        this.props.loginUser(userData);
    }

    render() {
        const {errors} = this.props;

      return (
        <div>
            <form onSubmit={this.handleLogin}>
                <input 
                    type="text" 
                    name="email" 
                    placeholder="Email"
                />
                <br />
                {errors.email && <p className="error-msg">{JSON.stringify(errors.email)}</p>}
                <br />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                />
                <br/>
                {errors.password && <p className="error-msg">{JSON.stringify(errors.password)}</p>}
                <br />
                <button>Login</button>
            </form>
        </div>
      )
    }
  }

const mapStateToProps = state=> ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(withRouter(LoginForm));
