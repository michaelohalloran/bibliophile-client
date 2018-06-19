import React, {Component} from 'react';
import './SingleBookPage.css';
import {deleteBookReview, fetchBooksFromDb} from '../actions/books';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class SingleBookPage extends Component {

    componentDidMount() {
        this.props.fetchBooksFromDb();
    }
    constructor() {
        super();
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(bookId) {
        console.log('inside handleDelete on singleBookPage, bookID is ', this.props.match.params.id);
        this.props.deleteBookReview(this.props.match.params.id);
    }

  render() {
      //this is state.books.books
    const {books} = this.props;
    //find this book by Id
    //this makes an array consisting solely of the book whose ID is the URL
    const bookArray = books.filter(book=> {
        return book._id.toString() === this.props.match.params.id;
    })

    //this is the first and only item from booksArray:
    let singleBook = bookArray[0];

    //display the book, with either add or edit/delete review buttons
    const bookDiv = 
        <div className="book-div">
            <h3 className="div-title">{singleBook.title}</h3>
            {singleBook.author && <p className="div-fields">Author: {singleBook.author}</p>}
            <img src={`${singleBook.image}`} alt={singleBook.title} />
            {singleBook.price && <p className="div-fields">${singleBook.price}</p>}
            <p className="div-fields">Rating: {singleBook.rating}</p>
            {singleBook.review &&<p className="div-fields">{singleBook.review}</p>}
        
            {singleBook.review.length > 0 ? (
                <div>
                    <Link className="edit-review-btn" to={`/edit-review/${this.props.match.params.id}`}>Edit book review</Link>
                    <button className="delete-review-btn" onClick={this.handleDelete}>Delete review</button>
                </div>
            ) : (
                <Link className="add-review-btn" to={`/add-review/${this.props.match.params.id}`}>Add a book review</Link>
            )}
        </div>

    
    return (
      <div>
          {bookDiv}
      </div>
    )
  }
}

const mapStateToProps = state => ({
    books: state.books.books
});

export default connect(mapStateToProps, {deleteBookReview, fetchBooksFromDb})(SingleBookPage);