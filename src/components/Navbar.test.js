import React from 'react';
import {mount} from 'enzyme';
import {Navbar} from './Navbar';

xdescribe('Navbar', ()=> {

    it('renders without crashing', ()=> {
        mount(<Navbar />);
    });
    
});