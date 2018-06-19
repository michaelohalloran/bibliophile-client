import React, { Component } from 'react';
import {getBookData, saveBookToDb} from '../actions/books';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './SearchForm.css';


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
      image: book.image,
      // image: book.thumbnail,
      price: book.price,
      rating: book.avgRating || 0
    }
    console.log('handle save savedBook is', savedBook);
    this.props.saveBookToDb(savedBook, this.props.history);
  }

  handleSearch(e) {
    e.preventDefault();
    let searchTerm = e.target.searchInput.value.trim();
    //the following action updates the searchResults state with the searched books data
    this.props.getBookData(searchTerm);
    e.target.searchInput.value = '';
    // const {searchResults} = this.props;
    // const bookDisplay = searchResults.map((book, index)=> (
    //   <div key={index}>
    //     <h1 className='title'>{book.title}</h1><br/>
    //     {book.price && <p className='price'>Price: {book.price}</p>}<br/>
    //     {book.author.length>0 && <p>Author: {book.author}</p>}<br/>
    //     {book.image && <img className='image'src={`${book.image}`} alt={book.title}/>}
    //     {book.pageCount && <p className='pages'>Pages: {book.pageCount}</p>}<br/>
    //     {book.desc && <p className='desc'>Desc: {book.desc}</p>}
    //     {typeof book.avgRating ==='number' && <p className='rating'>Average Rating: {book.avgRating}</p>}
    //     <button onClick={()=>this.handleSave(book)}>Save Book</button>
    //   </div>
    // ))
  }

  // componentDidUpdate(prevProps) {
  //   if(!prevProps.searchResults) {
  //     const {searchResults} = this.props;
  //     let bookDisplay;
  //     bookDisplay = searchResults.map((book, index)=> (
  //       <div key={index}>
  //         <h1 className='title'>{book.title}</h1><br/>
  //         {book.price && <p className='price'>Price: {book.price}</p>}<br/>
  //         {book.author.length>0 && <p>Author: {book.author}</p>}<br/>
  //         {book.image && <img className='image'src={`${book.image}`} alt={book.title}/>}
  //         {book.pageCount && <p className='pages'>Pages: {book.pageCount}</p>}<br/>
  //         {book.desc && <p className='desc'>Desc: {book.desc}</p>}
  //         {typeof book.avgRating ==='number' && <p className='rating'>Average Rating: {book.avgRating}</p>}
  //         <button onClick={()=>this.handleSave(book)}>Save Book</button>
  //       </div>
  //     ));
  //   }
  // }

  render() {
    let {searchResults} = this.props;
    console.log('searchResults are ', searchResults);
    
    // {searchResults && searchResults.map((book,i)=> {
    //   <div key={i}>
    //     <h1 className='title'>{book.title}</h1><br/>
    //     {book.price && <p className='price'>Price: {book.price}</p>}<br/>
    //     {book.author.length>0 && <p>Author: {book.author}</p>}<br/>
    //     {book.image && <img className='image'src={`${book.image}`} alt={book.title}/>}
    //     {book.pageCount && <p className='pages'>Pages: {book.pageCount}</p>}<br/>
    //     {book.desc && <p className='desc'>Desc: {book.desc}</p>}
    //     {typeof book.avgRating ==='number' && <p className='rating'>Average Rating: {book.avgRating}</p>}
    //     <button onClick={()=>this.handleSave(book)}>Save Book</button>
    //   </div>
    // }
    // )}
    // const {books} = this.props.books;
    // // const {searchResults} = this.props.searchResults;
    // console.log('books props: ', this.props.books);
    // console.log('searchResults props: ', this.props.searchResults);
    // // console.log('render showBooks is', showBooks);
    // let bookDisplay = books.map((book, index)=> (
    //   <div key={index}>
    //     <h1 className='title'>{book.title}</h1><br/>
    //     {book.price && <p className='price'>Price: {book.price}</p>}<br/>
    //     {book.author.length>0 && <p>Author: {book.author}</p>}<br/>
    //     {book.image && <img className='image'src={`${book.image}`} alt={book.title}/>}
    //     {book.pageCount && <p className='pages'>Pages: {book.pageCount}</p>}<br/>
    //     {book.desc && <p className='desc'>Desc: {book.desc}</p>}
    //     {typeof book.avgRating ==='number' && <p className='rating'>Average Rating: {book.avgRating}</p>}
    //     <button onClick={()=>this.handleSave(book)}>Save Book</button>
    //   </div>
    // ));
    return (
      <div>
        {/* <h1>Search</h1> */}
        <form onSubmit={this.handleSearch}>
          <input type="text" name="searchInput" placeholder="Search title/author"/>
          <button>Search</button>
        </form>

        <ul className="search-results-container">
          {/* {bookDisplay === "undefined" ? (null) : (bookDisplay)} */}
          {/* {bookDisplay} */}
          {/* {searchResults} */}
          {/* {searchDisplay} */}
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
  books: state.books.books,
  searchResults: state.books.searchResults
});
export default connect(mapStateToProps, {getBookData, saveBookToDb})(withRouter(SearchForm));
