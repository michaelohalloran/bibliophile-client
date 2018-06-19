import React from 'react';
import {mount} from 'enzyme';
import {GET_BOOKS, makeBookReview, MAKE_BOOK_REVIEW} from './books';

describe('Books actions', ()=> {

    it('should dispatch GET_BOOKS action', ()=> {
        const books = [];
        const action = {
            type: GET_BOOKS,
            payload: books
        };
        expect(action.type).toEqual(GET_BOOKS);
        expect(action.payload).toEqual(books);
    });
    
    it('should dispatch makeBookReview success action', ()=> {
        const review = 'sample review';
        const bookId = 123;

        global.fetch = jest.fn().mockImplementation(()=> 
            Promise.resolve({
                ok: true,
                json() {
                    return 
                }
            })
        )
        const dispatch = jest.fn();
        return makeBookReview()(dispatch).then(()=> {
            expect(fetch).toHaveBeenCalledWith(`/api/books/review/${bookId}`);
            expect(dispatch).toHaveBeenCalledWith({
                type: MAKE_BOOK_REVIEW,
                bookId,
                review
            });
        })

    })
});