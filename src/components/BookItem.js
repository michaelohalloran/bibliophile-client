import React from 'react';
import {Link} from 'react-router-dom';
import {removeBook} from '../actions/books';
import {connect} from 'react-redux';
import './BookItem.css';

const BookItem = (props) => {
  return (
    <li className="list-row">
        <h4 className="title-text">{props.book.title}</h4>
        <br />
  {props.book.price ? 
    <div>
      <h6 className="dash-price">Price: ${props.book.price}</h6>
    </div>
     : 
      <div>
        <h6 className="dash-price">No price found</h6>
      </div>
  }
        <img className="dash-img" src={`${props.book.image}`} alt={props.book.title}></img>
        <br />
        <Link className="dash-btn" to={`/book/${props.book._id}`}>Read more</Link>
        <button className="dash-btn"onClick={props.onDeleteClick}>Delete</button>
      </li>
  )
}

// const mapStateToProps = state => ({
//   books: state.books.books
// });

export default connect(null, {removeBook})(BookItem);