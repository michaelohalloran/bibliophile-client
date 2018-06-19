// import uuid from 'uuid';
import axios from 'axios';
import {API_BASE_URL} from '../config';
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
            // console.log('Ran fetchBooksFromDb');
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
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyD04XQFraQwKU0LAmzOW--oI8Li24IooRw`)
        .then((response) => response.json())
        .then((books) => {
            // console.log('Book items from getBookData fetchcall', books.items);
            let booksArray = [];
            books.items.map(book=> {
                let bookItem = {
                    title: book.volumeInfo.title,
                    price: book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount : null,
                    author: book.volumeInfo.authors && book.volumeInfo.authors.length>0 ? book.volumeInfo.authors.join(', ') : 'None',
                    desc:book.volumeInfo.description,
                    pageCount:book.volumeInfo.pageCount,
                    avgRating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 'No rating found',
                    image: book.volumeInfo.imageLinks.thumbnail ? book.volumeInfo.imageLinks.thumbnail : null
                }
                booksArray.push(bookItem);
            })
            dispatch(getBookDataSuccess(booksArray));
            // console.log('booksArray inside getBookData: ',booksArray);
        })
//     axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyD04XQFraQwKU0LAmzOW--oI8Li24IooRw`)
//         .then(response=> {
//             return response.data;
//         })
//         .then(data=> {
//             console.log(data.items);
//             let booksArray = [];
//             data.items.map(book=> {
//                 let bookItem = {
//                     title: book.volumeInfo.title,
//                     price: book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount : null,
//                     author: book.volumeInfo.authors.length>0 ? book.volumeInfo.authors.join(', ') : 'None',
//                     desc:book.volumeInfo.description,
//                     pageCount:book.volumeInfo.pageCount,
//                     avgRating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 'No rating found',
//                     thumbnail: book.volumeInfo.imageLinks.thumbnail
//                 }
//                 booksArray.push(bookItem);
//             })
//             dispatch(getBookDataSuccess(booksArray));
//             // console.log(booksArray);
//         })
//         //dispatch getBookDataError(err), if err, show <p>Error, otherwise empty ''
//         .catch(err=>console.log(err));
// }
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
    // console.log('token...');
    // console.log(localStorage.getItem('token'));
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
            // console.log('saveBookToDb response is', response)
            // console.log('history is ',history);
            dispatch(saveBook(response))
            history.push('/dashboard')
            // console.log('Saved book to DB');
        })
        .catch(err=>console.log(err));
}

// if(req.body.title) bookFields.title = req.body.title;
//     if(req.body.author) bookFields.author = req.body.author;
//     if(req.body.price) bookFields.price = req.body.price;
//     if(req.body.rating) bookFields.rating = req.body.rating;
//     if(req.body.image) bookFields.image = req.body.image;
//     if(req.body.review) bookFields.review = req.body.review;

export const SAVE_BOOK = 'SAVE_BOOK';
export const saveBook = (book) => dispatch => {
    dispatch({
        type: SAVE_BOOK,
        book
    });
};


export const REMOVE_BOOK = 'REMOVE_BOOK';
export const removeBook = (id)=> dispatch=> {
    // console.log('hit removeBook action, id is ', id);
    fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            //saved jwtToken to include 'Bearer' at the front
            'Authorization': `${localStorage.getItem('jwtToken')}`
        },
        // body: JSON.stringify(id)
        // // body: JSON.stringify({id})
    })
        .then(res=> res.json())
        // console.log('response inside removeBook is', res.json());
        .then(data=> {
            // console.log('inside second then block for removeBook');
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
    // console.log('fired makeBookReview book action');
    // console.log('inside book action makeBookReview, bookReview props are ', bookReview);
    // console.log('inside book action makeBookReview, bookReviewID is ', bookId);
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
            console.log('err is', err.response.data);
            dispatch({
                type: GET_ERRORS,
                errors: err.response.data
            })
            // console.log('fetch err is: ', err);
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
    console.log('bookId inside deleteBookReview is ', bookId)
    // fetch(`api/books/review/${bookId}`)
    //     .then(res=>res.json())
    //     .then(data=> {
    //         history.push('/dashboard');
    //     })
    //     .catch(err=>console.log(err))

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
        // .then(data=> {
        //     console.log('second then block in deleteReview');
        //     dispatch({
        //         type: GET_BOOKS,
        //         payload: data
        //     })
        //     window.location = '/dashboard';
        // })
}


export const EDIT_BOOK_REVIEW = 'EDIT_BOOK_REVIEW';
export const editBookReview = (reviewUpdates, bookId, history)=> dispatch=> {
    // console.log('fired editBookReview action');
    // console.log('inside book action editBookReview, updates are ', reviewUpdates);
    // console.log('inside book action editBookReview, Id is ', bookId);
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

