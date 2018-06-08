import React, { Component } from 'react';
import {getBookData, saveBookToDb} from '../actions/books';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


class SearchForm extends Component {

  constructor() {
    super();
    // this.state = {
    //   title: '',
    //   price: null,
    //   pageCount: null,
    //   desc: '',
    //   thumbnail: '',
    //   avgRating: null      
    // }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(book) {
    console.log('handleSave book is', book);
    console.log('handleSave title test is', book.title);
    //save book to DB
    const savedBook = {
      title: book.title,
      author: book.author,
      image: book.thumbnail,
      price: book.price,
      rating: book.avgRating || 0
    }
    console.log('handle save savedBook is', savedBook);
    this.props.saveBookToDb(savedBook, this.props.history);
  }

  handleSearch(e) {
    e.preventDefault();
    let searchTerm = e.target.searchInput.value.trim();
    this.props.getBookData(searchTerm);
    e.target.searchInput.value = '';
  }

  render() {
    const {books} = this.props;
    // console.log('render showBooks is', showBooks);
    books.map((book, index)=> (
      <div key={index}>
        <h1 className='title'>{book.title}</h1><br/>
        {book.price && <p className='price'>Price: {book.price}</p>}<br/>
        {book.author.length>0 && <p>Author: {book.author}</p>}<br/>
        {book.thumbnail && <img className='image'src={`${book.thumbnail}`} alt={book.title}/>}
        {book.pageCount && <p className='pages'>Pages: {book.pageCount}</p>}<br/>
        {book.desc && <p className='desc'>Desc: {book.desc}</p>}
        {typeof book.avgRating ==='number' && <p className='rating'>Average Rating: {book.avgRating}</p>}
        <button onClick={()=>this.handleSave(book)}>Save Book</button>
      </div>
    ));
    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <input type="text" name="searchInput" placeholder="Search for a title/author"/>
          <button>Search</button>
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
  //we gave the booksReducer state an empty key called books, which is why this uses .books
  books: state.booksReducer.books
});
export default connect(mapStateToProps, {getBookData, saveBookToDb})(withRouter(SearchForm));
