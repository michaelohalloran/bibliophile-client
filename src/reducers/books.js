import {
    GET_BOOKS,
    // addBook, 
    MAKE_BOOK_REVIEW,
    DELETE_BOOK_REVIEW,
    SAVE_BOOK,
    REMOVE_BOOK,
    GET_BOOK_DATA_SUCCESS
} from '../actions/books';

const initialState = {
    books: [],
    searchResults: []
};

const booksReducer = (state=initialState, action)=> {
    switch(action.type) {
        case SAVE_BOOK:
            return {
                ...state, 
                books: [...state.books, action.book]
            };
        case GET_BOOKS:
            return {
                ...state,
                books: action.payload
            }
        case REMOVE_BOOK:
        const books = state.books.filter(book=>book.id !==action.id);
        //return all books whose Id's don't match the one we just deleted
            return {
                ...state,
                books
            }
        case MAKE_BOOK_REVIEW: 
            return {
                ...state,
                books: state.books.map((book,i)=> {
                    //if a book object's id matches the action id...
                    if(book.id === action.bookId) {
                        //spread out the state, give that book's review prop our action.bookReview
                        return {
                            ...book,
                            review: action.bookReview
                        };
                    } else {
                        return {...book};
                    }
                })
        };
                // return {
        //     ...state,
        //     books: state.books.map((book,i)=> {
        //         //if a book object's id matches the action id...
        //         if(book.id === action.bookId) {
        //             //spread out the state, give that book's review prop our action.bookReview
        //             return [
        //                 ...state.books,
        //                 state.books.map(book=> {
        //                     if(book.id === action.bookId) {
        //                         return {...book, review: action.bookReview};
        //                     } else {
        //                         return {...book};
        //                     }
        //                 })
        //             ]
        //         } else {
        //             return [...state.books];
        //         }
        //     })
        // }
            // return {
            //     ...state,
            //     books: [
            //         //copy state.books array, 
            //         ...state.books, 


            //         ...action.bookReview]
                
            // }
            // books: state.books.map((book, i)=> {
            //     if(book.id === action.bookId) {
            //         book.review = action.bookReview
            //     }
            // })

        // case EDIT_BOOK_REVIEW:
        //     return state.books.map((book)=> {
        //         if(book.id === action.bookId) {
        //             return {
        //                 ...state, 
        //                 ...action.updates
        //             };
        //         } 
        //     });

       
        case GET_BOOK_DATA_SUCCESS:
            return Object.assign(
                {}, 
                state, 
                {searchResults: action.bookSearchResults}
            );    
            // return Object.assign({}, state, {searchResults: action.books});    

        case DELETE_BOOK_REVIEW:
            // return state.reviews.filter(review => review.id !== action.id)          
            return {
                ...state,
                //return only books with Id's NOT matching the action id (the one we're deleting)
                books: state.books.filter(book=> book.id !== action.bookId) 
            }
        default :
            return state
    }
}

export default booksReducer;