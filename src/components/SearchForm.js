import React, { Component } from 'react';
import {getBookData} from '../actions/books';
import {connect} from 'react-redux';

class SearchForm extends Component {

  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    let searchTerm = e.target.searchInput.value.trim();
    this.props.getBookData(searchTerm);
    e.target.searchInput.value = '';
  }


  render() {
    console.log(this.props.books);
    const showBooks = this.props.books;
    const books = this.props.books.map((book, index)=> (
      <li key={index}>
        <h1>{book.title}</h1>
        <p>{book.price !== null ? book.price : ''}</p>
        <button onClick={this.saveBook}>Save Book</button>
      </li>
    ));
    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <input type="text" name="searchInput" placeholder="Search for a title/author"/>
          <button >Search</button>
        </form>

        <ul id="searchResults">
          {books}
        </ul>
      </div>
    )
  }
}

// const SearchForm = (props) => {
//   return (
//     <div>
//         <form onSubmit={
//           (e)=> {
//             e.preventDefault();
//             getBookData(e.target.searchInput.value.trim());
//           }
//         }
//         >
//           <input type="text" name="searchInput" placeholder="Search for a title/author"/>
//           <button >Search</button>
//         </form>
      
//     </div>
//   )
// }

// onClick={props.handleSearch}

// export default SearchForm;

const mapStateToProps = state=>({
  //we gave the booksReducer state an empty key calld books, which is why this uses .books
  books: state.booksReducer.books
});
export default connect(mapStateToProps, {getBookData})(SearchForm);
