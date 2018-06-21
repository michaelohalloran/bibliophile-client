import React from 'react';
import {shallow} from 'enzyme';
import {Navbar} from './Navbar';

xdescribe('Navbar', ()=> {

    it('renders without crashing', ()=> {
        const isLoggedIn = true;
        shallow(<Navbar auth={{isLoggedIn}}/>);
    });
    
});