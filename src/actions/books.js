import axios from 'axios';
import {API_BASE_URL} from '../config/config';


//search for book and pull in API data
//save books searched for to reading list on bookPage
//make book review
//edit review
//delete book review
//delete book from saved list
import {GET_ERRORS} from './types';


export const GET_BOOKS = 'GET_BOOKS';
export const fetchBooksFromDb = ()=> dispatch => {
    fetch(`${API_BASE_URL}/books/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            //saved jwtToken to include 'Bearer' at the front
            'Authorization': `${localStorage.getItem('jwtToken')}`
        }
    })
        .then(res=>res.json())
        .then(data=> {
            dispatch({
                type: GET_BOOKS,
                payload: data
            })
        })
        .catch(err=>console.log(err));
};

export const SHOW_BOOKS = 'SHOW_BOOKS';
export const showBooks = () => ({
    type: SHOW_BOOKS
});

export const getBookData = (searchTerm)=> dispatch => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`)
        .then((response) => response.json())
        .then((books) => {
            // console.log('Book items from getBookData fetchcall', books.items);
            let booksArray = [];
            let bookItem;
            books.items.map(book=> {
                bookItem = {
                    title: book.volumeInfo.title,
                    price: book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount : null,
                    author: book.volumeInfo.authors && book.volumeInfo.authors.length>0 ? book.volumeInfo.authors.join(', ') : 'None',
                    desc:book.volumeInfo.description,
                    pageCount:book.volumeInfo.pageCount,
                    avgRating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 'No rating found',
                    image: book.volumeInfo.imageLinks.thumbnail ? book.volumeInfo.imageLinks.thumbnail : null
                }
                booksArray.push(bookItem);
                return booksArray;
            })
            dispatch(getBookDataSuccess(booksArray));
        })

}

// export const ADD_BOOK = 'ADD_BOOK';
// export const addBook = (
//     {
//         title='',
//         author='',
//         price = 0,
//         avgRating = 0
//     } = {}
// ) => ({
//     type: ADD_BOOK,
//     book: {
//         id: uuid(),
//         title,
//         author,
//         price,
//         avgRating
//     }
// });

export const GET_BOOK_DATA_SUCCESS = 'GET_BOOK_DATA_SUCCESS';
export const getBookDataSuccess = (bookSearchResults)=> ({
    type: GET_BOOK_DATA_SUCCESS,
    bookSearchResults
});

export const saveBookToDb = (book, history)=> dispatch=> {
    fetch(`${API_BASE_URL}/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //saved jwtToken to include 'Bearer' at the front
            'Authorization': `${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify(book)
    })
        .then(res=>res.json())
        .then(response=> {
            dispatch(saveBook(response))
            history.push('/dashboard')
        })
        .catch(err=>console.log(err));
}

export const SAVE_BOOK = 'SAVE_BOOK';
export const saveBook = (book) => dispatch => {
    dispatch({
        type: SAVE_BOOK,
        book
    });
};

export const REMOVE_BOOK = 'REMOVE_BOOK';
export const removeBook = (id)=> dispatch=> {
    fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            //saved jwtToken to include 'Bearer' at the front
            'Authorization': `${localStorage.getItem('jwtToken')}`
        },
    })
        .then(res=> res.json())
        .then(data=> {
            //alternative: after deleting book on backend, re-call GET_BOOKS, and now updated state should be shown
            // dispatch(fetchBooksFromDb());
            dispatch({
                type: REMOVE_BOOK,
                id    
            })
            window.location = '/dashboard';
        })
        .catch(err=>console.log(err))
};

//**************************************************************** */
//BOOK REVIEW/COMMENTS ACTIONS

export const MAKE_BOOK_REVIEW = 'MAKE_BOOK_REVIEW';
export const makeBookReview = (bookReview, bookId, history)=> dispatch=> {
    axios.post(`${API_BASE_URL}/books/review/${bookId}`, bookReview)
        .then(res=> {
            dispatch({
                type: MAKE_BOOK_REVIEW,
                bookId,
                bookReview
            })
            window.location = '/dashboard';
        })
        .catch(err=>{
            dispatch({
                type: GET_ERRORS,
                errors: err.response.data
            })
        })
    };
    // fetch(`/api/books/review/${bookId}`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         //saved jwtToken to include 'Bearer' at the front
    //         'Authorization': `${localStorage.getItem('jwtToken')}`
    //     },
    //     body: JSON.stringify(bookReview)
    // })
    //     // .then(res=> console.log('json response is: ', res.json()))
    //     .then(res=> res.json())
    //     .then(data=> {
    //         // if(data.status >=400) {
    //         //     console.log('in make book rev if, response data status is', data.status);
    //         // }
    //         dispatch({
    //             type: MAKE_BOOK_REVIEW,
    //             bookId,
    //             bookReview
    //         })
    //         history.push('/dashboard');
    //     })
    //     .catch(err=>{
    //         console.log('make book review err is', err);
    //         dispatch({
    //             type: GET_ERRORS,
    //             errors: err
    //         })
    //         // console.log('fetch err is: ', err);
    //     })
        // .catch(err=>console.log(err));
// };

export const DELETE_BOOK_REVIEW =  'DELETE_BOOK_REVIEW';
export const deleteBookReview = (bookId) => dispatch => {

        fetch(`${API_BASE_URL}/books/review/${bookId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                //saved jwtToken to include 'Bearer' at the front
                'Authorization': `${localStorage.getItem('jwtToken')}`
            }
        })
        .then(res=> {
            res.json();
        })
        .then(data=> {
            dispatch({
                type: DELETE_BOOK_REVIEW,
                bookId
            })
            window.location = '/dashboard';
        })
}


export const EDIT_BOOK_REVIEW = 'EDIT_BOOK_REVIEW';
export const editBookReview = (reviewUpdates, bookId, history)=> dispatch=> {
    fetch(`${API_BASE_URL}/books/review/${bookId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            //saved jwtToken to include 'Bearer' at the front
            'Authorization': `${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify(reviewUpdates)
    })
    .then(res=> res.json())
    .then(data=> {
        dispatch({
            type: MAKE_BOOK_REVIEW,
            bookId,
            reviewUpdates
        })
        history.push('/dashboard');
    })
    .catch(err=>console.log(err));
};

