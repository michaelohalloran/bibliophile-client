import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import DashboardPage from '../components/DashboardPage';
import SingleBookPage from '../components/SingleBookPage';
import LoginForm from '../components/auth/LoginForm';
import PrivateRoute from '../components/auth/PrivateRoute';
import RegisterForm from '../components/auth/RegisterForm';
import SearchForm from '../components/SearchForm';
import Navbar from '../components/Navbar';
import AddReview from '../components/AddReview';
import EditReview from '../components/EditReview';
import {connect} from 'react-redux';
import {setAuthToken, setCurrentUser, logoutUser} from '../actions/authActions';
import jwt_decode from 'jwt-decode';
import store from '../store';

class AppRouter extends Component {

    componentDidMount() {
        if(localStorage.jwtToken) {
            const token = localStorage.jwtToken;
            //if there's a token, set it as the default
            setAuthToken(token);
            //get user data
            const decodedUser = jwt_decode(token);
            //set the current user by dispatching
            store.dispatch(setCurrentUser(decodedUser));
            
            //put time expiration code here
            const currentTime = Date.now()/1000
            if(decodedUser.exp < currentTime) {
                store.dispatch(logoutUser());
            }
        }
    }


    //MAKE SOME ROUTES PRIVATE

  render() {
    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <Route exact path="/" component={LandingPage}/>
                <Switch>
                    <Route exact path="/login" component={LoginForm}/>
                    <Route exact path="/register" component={RegisterForm}/>
                    <PrivateRoute exact path="/dashboard" component={DashboardPage}/>
                    <PrivateRoute exact path="/book/:id" component={SingleBookPage}/>
                    <PrivateRoute exact path="/search" component={SearchForm}/>
                    <PrivateRoute exact path="/add-review/:book_id" component={AddReview}/>
                    <PrivateRoute exact path="/edit-review/:book_id" component={EditReview}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
  }
}

export default connect()(AppRouter);