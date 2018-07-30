import React from 'react';
import {mount} from 'enzyme';
import {API_BASE_URL} from '../config/config';
import {GET_BOOKS, makeBookReview, MAKE_BOOK_REVIEW} from './books';

describe('Books actions', ()=> {

    //beforeAll, make request to login endpoint, get token, register dummy person for testing
    //save that token to localStorage, use normal fetch to do this

    it('should return GET_BOOKS action', ()=> {
        const books = [];
        const action = {
            type: GET_BOOKS,
            payload: books
        };
        expect(action.type).toEqual(GET_BOOKS);
        expect(action.payload).toEqual(books);
    });
    
    // it('should dispatch makeBookReview success action', ()=> {
    //     const books = [{
    //         title: 'Title1',
    //         review: ''
    //     }];
    //     const review = 'sample review';
    //     const bookId = 123;

    //     //make a fake fetch request
    //     global.fetch = jest.fn().mockImplementation(()=> 
    //         Promise.resolve({
    //             ok: true,
    //             json() {
    //                 return books;
    //             }
    //         })
    //     );
    //     //make a fake action dispatch
    //     const dispatch = jest.fn();
    //     return makeBookReview(review, bookId, )(dispatch).then(()=> {
    //         expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/books/review/${bookId}`);
    //         expect(dispatch).toHaveBeenCalledWith({
    //             type: MAKE_BOOK_REVIEW,
    //             bookId,
    //             review
    //         });
    //     })

    // })
});