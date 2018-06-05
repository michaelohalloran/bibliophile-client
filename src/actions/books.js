import uuid from 'uuid';
import axios from 'axios';
//search for book and pull in API data
//save books searched for to reading list on bookPage
//make book review
//edit review
//delete book review
//delete book from saved list


export const getBookData = (searchTerm)=> dispatch => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyBV4JsaEhWuCkhm_6gF-72N6ulSt1LdBRw`)
        .then(response=> {
            return response.data;
        })
        .then(data=> {
            console.log(data.items);
            let booksArray = [];
            data.items.map(book=> {
                let bookItem = {
                    title: book.volumeInfo.title,
                    price: book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount : null,
                    author: book.volumeInfo.authors.length>0 ? book.volumeInfo.authors.join(', ') : 'None',
                    desc:book.volumeInfo.description,
                    pageCount:book.volumeInfo.pageCount,
                    avgRating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 'No rating found',
                    thumbnail: book.volumeInfo.imageLinks.thumbnail
                }
                booksArray.push(bookItem);
            })
            dispatch(getBookDataSuccess(booksArray));
            // console.log(booksArray);
        })
        //dispatch getBookDataError(err), if err, show <p>Error, otherwise empty ''
        .catch(err=>console.log(err));
}

export const ADD_BOOK = 'ADD_BOOK';
export const addBook = (
    {
        title='',
        author='',
        price = 0,
        avgRating = 0
    } = {}
) => ({
    type: ADD_BOOK,
    book: {
        id: uuid(),
        title,
        author,
        price,
        avgRating
    }
});

export const GET_BOOK_DATA_SUCCESS = 'GET_BOOK_DATA_SUCCESS';
export const getBookDataSuccess = (books)=> ({
    type: GET_BOOK_DATA_SUCCESS,
    books
});

export const SAVE_BOOK = 'SAVE_BOOK';
export const saveBook = ({id}={})=> ({
    type: 'SAVE_BOOK',
    id    
});

//DISPATCH THIS ON SEARCH RESULTS PAGE, attached to handleAddBook button onClick
// export const addBookToDb = (book) => {
//     axios.post('/api/books/', book)
//         .then()
//         .catch()
// }

export const removeBook = ({id}={})=> ({
    type: 'REMOVE_BOOK',
    id    
});

//**************************************************************** */
//BOOK REVIEW/COMMENTS ACTIONS
export const makeBookReview = (text)=> ({
    type: 'MAKE_BOOK_REVIEW',
    text
});

export const deleteBookReview = ({id}={})=> ({
    type: 'DELETE_BOOK_REVIEW',
    id    
});

export const editBookReview = (id, updates)=> ({
    type: 'EDIT_BOOK_REVIEW',
    id,
    updates
});


