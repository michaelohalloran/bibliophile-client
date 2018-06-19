import {combineReducers} from 'redux';
import booksReducer from './books';
import filtersReducer from './filters';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    books: booksReducer,
    errors: errorsReducer,
    filters: filtersReducer
});

export default rootReducer;