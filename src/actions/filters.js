
export const filterByText = (text='')=> ({
    type: 'FILTER_BY_TEXT',
    text    
});

export const sortByAuthor = ()=> ({
    type: 'SORT_BY_AUTHOR',    
});

export const sortByTitle = ()=> ({
    type: 'SORT_BY_Title',    
});

export const sortByPrice = ()=> ({
    type: 'SORT_BY_PRICE',    
});

export const sortByRating = ()=> ({
    type: 'SORT_BY_RATING',    
});

