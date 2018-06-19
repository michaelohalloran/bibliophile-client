import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authActions';
import './Navbar.css';

export class Navbar extends Component {

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
      <ul>
        <li><NavLink className="user-nav-btn" to="/" exact={true}>Home</NavLink></li>
        <button className="user-nav-btn" onClick={this.handleLogout}>Logout</button>
      </ul>
    );

    const visitorLinks = (
      <ul>
        <li>
          <NavLink className="visitor-nav-btn" to="/login" exact={true}>Login</NavLink>{' '}
        </li>
        <li>
          <NavLink className="visitor-nav-btn" to="/register" exact={true}>Register</NavLink>{' '}
        </li>
      </ul>
    );

    return (
      <div>
        <h1 className="title">Bibliophile</h1>
            {isLoggedIn ? userLinks : visitorLinks}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Navbar);