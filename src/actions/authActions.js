
//handleLogin (fires when loginBtn pressed, passes loginData)=> 
//submitLoginForm (actionCreator?, takes in loginData passed to it by handleLogin, makes Api call (POST request)=>
//loginUser (if api call succeeds, then dispatch success action(loginUser action to update state w/ email and password))
//if it fails, dispatch a failure action for handling failure state
import axios from 'axios';
import {API_BASE_URL} from '../config';
import jwt_decode from 'jwt-decode';
import history from '../history';
import {GET_ERRORS} from './types';

export const setAuthToken = token=> {
    if(token) {
        //if there's a token, use it as the default authorization header for all requests
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        //if there's no token, delete auth header
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const setCurrentUser = decodedUser => {
    return {
        type: SET_CURRENT_USER,
        payload: decodedUser
    }
}

export const loginUser = (userData)=> dispatch=> {
    // fetch('/api/users/login', {
    //     method: 'POST',
    //     headers: {
    //     'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(userData)
    // })
    //     .then(res=> res.json())
    //     .then(data=>{
    //         if(data.status >=400) {
    //             console.log('data status is', data.status);
    //         }
    //         console.log('logging json data response from login', data)
    //         // if(data.status)
    //         // const {token} = data;
    //         // localStorage.setItem('jwtToken', token);
    //         // setAuthToken(token);
    //         // const decoded = jwt_decode(token);
    //         // console.log(decoded);
    //         // dispatch(setCurrentUser(decoded));
    //         // window.location = '/dashboard';
    //     })

    axios.post(`${API_BASE_URL}/users/login`, userData)
        .then(res=> {
            console.log('inside login post in authActions, res in then block is:', res);
            const {token} = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            console.log(decoded);
            dispatch(setCurrentUser(decoded));
            window.location = '/dashboard';
        })
        .catch(err=>{
            console.log('err is', err.response.data);
            dispatch({
                type: GET_ERRORS,
                errors: err.response.data
            })
            // console.log('fetch err is: ', err);
        })
};

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const loginUserSuccess = (user, token)=> {
    type: LOGIN_USER_SUCCESS,
    user,
    token
}

//this dispatch will be result of a successful API call
// export const submitLoginForm = loginData => (dispatch, getState) => {
//     console.log('loginData coming from action', loginData);
//     axios.post('/api/users/login', loginData)
//         .then(loginData=>{
//             let {email, password} = loginData;
//             dispatch(loginUser(email, password));
//         })

//         // //save to localStorage
//         // const {token} = res.data;
//         // //set token to localStorage
//         // localStorage.setItem('jwtToken', token);
//         // //set token to auth Header
//         // setAuthToken(token);
//         // //decode token to get user data
//         // const decoded = jwt_decode(token);
//         // //set current user
//         // dispatch(setCurrentUser(decoded));

//     //if success, dispatch(loginUser)
//     //when deployed, pass a variable for serverURL here, set in env file (process.env.SERVER)
//     // fetch('localhost:8080/api/users/login', {
//     //     method: 'POST',
//     //     dataType: 'json',
//     //     //CHECK DOCS FOR PASSING DATA
//     //     loginData
//     // })
//     // .then(response=> response.json())
//     // .then()
//     //else failure
// }

export const logoutUser = ()=> dispatch=> {
    // //remove the token
    // localStorage.removeItem('jwtToken');
    // //this deletes auth headers
    // setAuthToken(false);
    // //sets current user to null
    // dispatch(setCurrentUser({}));
    localStorage.clear();
    window.location = '/login';
};


//REGISTER ACTIONS
//************************************************************** */
export const registerUser = (userData, history)=> dispatch=> {
    axios.post(`${API_BASE_URL}/users/register`, userData)
        .then(res=> history.push('/login'))
        .catch(err=> {
            dispatch({
                type: GET_ERRORS,
                errors: err.response.data
            });
        });
};
