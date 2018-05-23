import React from 'react';
import {BrowserRouter, Route, Switch,Link, NavLink} from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import DashboardPage from '../components/DashboardPage';
import BookPage from '../components/BookPage';
import Navbar from '../components/Navbar';




const AppRouter = ()=> (
    <BrowserRouter>
        <div>
            <Navbar />
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route path="/dashboard/:id" component={DashboardPage}/>
                <Route path="/book" component={BookPage}/>
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;