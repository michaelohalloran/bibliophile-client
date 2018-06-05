import {LOGIN_USER_SUCCESS, SET_CURRENT_USER} from '../actions/authActions';

const initialState = {
    isLoggedIn: false,
    user: null,
    token: null
}

const authReducer = (state=initialState, action)=> {
    switch(action.type) {
        case LOGIN_USER_SUCCESS: 
            return {
                ...state,
                isLoggedIn: true,
                user: action.user,
                token: action.token
            }
        case SET_CURRENT_USER: 
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
            }
        default:
            return state;
    }
}

export default authReducer;