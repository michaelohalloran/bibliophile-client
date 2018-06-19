import React, { Component } from 'react';
import {getBookData, saveBookToDb} from '../actions/books';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './SearchForm.css';

class SearchForm extends Component {

  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(book) {
    //save book to DB
    const savedBook = {
      title: book.title,
      author: book.author,
      image: book.image,
      price: book.price,
      rating: book.avgRating || 0
    }
    this.props.saveBookToDb(savedBook, this.props.history);
  }

  handleSearch(e) {
    e.preventDefault();
    let searchTerm = e.target.searchInput.value.trim();
    //the following action updates the searchResults state with the searched books data
    this.props.getBookData(searchTerm);
    e.target.searchInput.value = '';
  }

  render() {
    let {searchResults} = this.props;

    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <input type="text" name="searchInput" placeholder="Search title/author"/>
          <button>Search</button>
        </form>

        <ul className="search-results-container">
          {searchResults.length !==0 ? 
            searchResults.map((book,i)=> (
              <li key={i}>
                <h1 className='search-results-title'>{book.title}</h1><br/>
                {book.price ? <div><p className='search-results'>Price: {book.price}</p><br/></div>: ''}
                {book.author && <div><p className='search-results'>Author: {book.author}</p><br/></div>}
                {book.image && <img className='search-results-image'src={`${book.image}`} alt={book.title}/>}<br/>
                {book.pageCount && <p className='search-results'>{book.pageCount} pages</p>}<br/>
                {book.desc && <p className='search-results-desc'>{book.desc}</p>}
                {typeof book.avgRating ==='number' && <p className='search-results'>Average Rating: {book.avgRating}</p>}
                <button onClick={()=>this.handleSave(book)}>Save Book</button>
                <hr/>
              </li>
              )
            )
           : 
            <h3>Search results will display here</h3>
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state=>({
  //we gave the booksReducer state an empty key called books, which is why this uses .books
  books: state.books.books,
  searchResults: state.books.searchResults
});
export default connect(mapStateToProps, {getBookData, saveBookToDb})(withRouter(SearchForm));
