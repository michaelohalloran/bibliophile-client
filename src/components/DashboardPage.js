import React, { Component } from 'react'
import './DashboardPage.css';
import {Link} from 'react-router-dom';
import {fetchBooksFromDb, removeBook} from '../actions/books';
import BookItem from './BookItem';
import {connect} from 'react-redux';


class DashboardPage extends Component {

  // constructor(props) {
  //   super(props)

  //   // this.handleDeleteBook = this.handleDeleteBook.bind(this);
  // }

  handleDeleteBook(id) {
    console.log('handleDeleteBook function firing, id is ', id);
    this.props.removeBook(id);

  }

  componentDidMount() {
    console.log('mounted Dashboard');
    //grab all this user's books to show
    this.props.fetchBooksFromDb();
  }
  

  render() {
    const {books} = this.props;
    console.log('books is ', books);
    console.log('books.books is ', books.books);
    console.log('books[0] is ', books[0]);

    // let bookDisplay;
    // //books is an array of book objects
    // console.log('book props are', books);
    // if(typeof books !== undefined) {
    //   bookDisplay = books.map((book, i)=> (
    //     // <BookItem key={i} book={book} />
    //     <BookItem key={book._id} book={book} onDeleteClick={this.handleDeleteBook.bind(this, book._id)}/>
    //     // <BookItem key={i} book={book} onDeleteClick={this.handleDeleteBook.bind(this, book.id)}/>
    //   ))
    // }
    return (
      <div>
        <Link className="user-nav-btn" id="dash-search-btn" to="/search">Search for Books</Link><br/>
        <ul>
          {/* {bookDisplay} */}
          {books.length > 0 ? 
            books.map((book, i)=> (
              // <BookItem key={i} book={book} />
              <BookItem key={book._id} book={book} onDeleteClick={this.handleDeleteBook.bind(this, book._id)}/>
              // <BookItem key={i} book={book} onDeleteClick={this.handleDeleteBook.bind(this, book.id)}/>
            ))
            : <h3>No books found.</h3>
          }
    
        </ul>

        {/* <div className="list-row">
        Title: Title1
        <br />
        Price: $5
        <br />
        <img src="http://ichef.bbci.co.uk/wwfeatures/wm/live/1280_640/images/live/p0/2v/dp/p02vdpfn.jpg"></img>
        <br />
        <Link to="/book">Read more</Link>
        </div>

        <div className="list-row">
        Title: Title2
        <br />
        Price: $5
        <br />
        <img src="http://ichef.bbci.co.uk/wwfeatures/wm/live/1280_640/images/live/p0/2v/dp/p02vdpfn.jpg"></img>
        <br />
        <Link to="/book">Read more</Link>
        </div>

        <div className="list-row">
        Title: Title3
        <br />
        Price: $5
        <br />
        <img src="http://ichef.bbci.co.uk/wwfeatures/wm/live/1280_640/images/live/p0/2v/dp/p02vdpfn.jpg"></img>
        <br />
        <Link to="/book">Read more</Link>
        </div> */}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  books: state.books.books
});

export default connect(mapStateToProps, {fetchBooksFromDb, removeBook})(DashboardPage);