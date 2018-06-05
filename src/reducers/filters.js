import {filterByText, sortByAuthor, sortByPrice, sortByRating} from '../actions/filters';


const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date'  
};

const filtersReducer = (state=filtersReducerDefaultState, action)=> {
    switch(action.type) {
        case 'FILTER_BY_TEXT':
            return {...state, text:action.text};
        case 'SORT_BY_AUTHOR':
            return {...state, sortBy: 'author'};
        case 'SORT_BY_TITLE':
            return {...state, sortBy: 'title'};
        case 'SORT_BY_PRICE':
            return {...state, sortBy: 'price'};
        case 'SORT_BY_RATING':
            return {...state, sortBy: 'rating'};
            
        default:
            return state;
    } 
};

export default filtersReducer;