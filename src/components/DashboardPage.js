import React, { Component } from 'react'
import './DashboardPage.css';
import {Link} from 'react-router-dom';
import {fetchBooksFromDb, removeBook} from '../actions/books';
import BookItem from './BookItem';
import {connect} from 'react-redux';


class DashboardPage extends Component {

  handleDeleteBook(id) {
    this.props.removeBook(id);

  }

  componentDidMount() {
    //grab all this user's books to show
    this.props.fetchBooksFromDb();
  }
  

  render() {
    const {books} = this.props;

    return (
      <div>
        <Link className="user-nav-btn" id="dash-search-btn" to="/search">Search for Books</Link><br/>
        <ul>
          {books.length > 0 ? 
            books.map((book, i)=> (
              <BookItem key={book._id} book={book} onDeleteClick={this.handleDeleteBook.bind(this, book._id)}/>
            ))
            : <h3>No books found.</h3>
          }
        </ul>

        
      </div>
    )
  }
}


const mapStateToProps = state => ({
  books: state.books.books
});

export default connect(mapStateToProps, {fetchBooksFromDb, removeBook})(DashboardPage);