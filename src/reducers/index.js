import {combineReducers} from 'redux';
import booksReducer from './books';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    books: booksReducer,
    errors: errorsReducer
});

export default rootReducer;