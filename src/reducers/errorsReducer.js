import {GET_ERRORS} from '../actions/types';

const initialState = {};

const errorsReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_ERRORS: 
            return action.errors;
        default:
            return state;
    }
}

export default errorsReducer;