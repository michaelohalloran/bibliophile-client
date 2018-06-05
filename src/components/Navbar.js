import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authActions';

class Navbar extends Component {

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {

    const {isLoggedIn} = this.props.auth;

    const userLinks = (
      <button onClick={this.handleLogout}>Logout</button>
    );

    const visitorLinks = (
      <ul>
        <li>
          <NavLink to="/login" exact={true}>Login</NavLink>{' '}
        </li>
        <li>
          <NavLink to="/register" exact={true}>Register</NavLink>{' '}
        </li>
      </ul>
    );

    return (
      <div>
        <h1>Bibliophile</h1>
            <NavLink to="/" exact={true}>Home</NavLink>
            {isLoggedIn ? userLinks : visitorLinks}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Navbar);