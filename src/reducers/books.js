import {getBookData, addBook, editBookReview, removeBook, GET_BOOK_DATA_SUCCESS} from '../actions/books';

const initialState = {books: []};

const booksReducer = (state=initialState, action)=> {
    switch(action.type) {
        case 'ADD_BOOK':
            return [...state, action.book];
        case 'REMOVE_BOOK':
            return state.filter(({id})=>id !==action.id);
        case 'EDIT_BOOK_REVIEW':
            return state.map((book)=> {
                if(book.id === action.id) {
                    return {...state, ...action.updates};
                } else {
                    return book;
                }
            });
        case GET_BOOK_DATA_SUCCESS:
            return Object.assign({}, state, {books: action.books});                
        default :
            return state
    }
}

export default booksReducer;