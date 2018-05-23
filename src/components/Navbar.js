import React from 'react';
import {NavLink} from 'react-router-dom';


const Navbar = ()=> (
    <header>
        <h1>Nav</h1>
        <NavLink to="/" exact={true}>Home</NavLink>
        <NavLink to="/dashboard/:id" exact={true}>Dashboard</NavLink>
        
    </header>
);

export default Navbar;