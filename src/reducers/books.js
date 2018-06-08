import {
    getBookData, 
    addBook, 
    editBookReview, 
    EDIT_BOOK_REVIEW,
    MAKE_BOOK_REVIEW,
    DELETE_BOOK_REVIEW,
    SAVE_BOOK,
    REMOVE_BOOK,
    removeBook, 
    GET_BOOK_DATA_SUCCESS
} from '../actions/books';

const initialState = {
    books: [],
    reviews: []
};

const booksReducer = (state=initialState, action)=> {
    switch(action.type) {
        case SAVE_BOOK:
            return [
                ...state, 
                {books:action.book}
            ];
        case REMOVE_BOOK:
            return state.books.filter(book=>book.id !==action.id);
        case EDIT_BOOK_REVIEW:
            return state.reviews.map((review)=> {
                if(review.id === action.id) {
                    return {
                        ...state, 
                        ...action.updates
                    };
                } 
            });
        case GET_BOOK_DATA_SUCCESS:
            return Object.assign({}, state, {books: action.books});    
        case DELETE_BOOK_REVIEW:
            return state.reviews.filter(review => review.id !== action.id)               
        default :
            return state
    }
}

export default booksReducer;