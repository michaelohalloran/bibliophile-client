const filterBooks = (books, {filterByText, sortByTitle, sortByPrice, sortByRating, sortByAuthor})=> {
    return books.filter((book)=> {
        const textMatch = book.title.toLowerCase().includes(text.toLowerCase());
        return textMatch;
    }).sort((a,b)=> {
        if(sortBy === 'price') {
            //cheapest price first
            return book.price ? -1 : 1;
        } else if (sortBy === 'author') {
            //A-Z alphabetical sorting
            return book.author ? -1 : 1;
        } else if (sortBy === 'title') {
            //A-Z alphabetical sorting
            return book.title ? -1 : 1;
        } else if(sortBy === 'rating') {
            //cheapest price first
            return book.avgRating ? -1 : 1;
        }
    });
};

export default filterBooks;