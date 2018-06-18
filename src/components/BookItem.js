import React from 'react';
import {Link} from 'react-router-dom';
import {removeBook} from '../actions/books';
import {connect} from 'react-redux';
import './BookItem.css';

const BookItem = (props) => {
  console.log('inside BookItem, props is ', props);
  // console.log('inside BookItem, props of array is ', props.books[books.length -1]);
  return (
    <li className="list-row">
        <h4 className="title-text">{props.book.title}</h4>
        <br />
        {props.book.price && <p>Price: ${props.book.price}</p>}
        <br />
        {console.log('img url is', props.book.image)}
        <img src={`${props.book.image}`} alt={props.book.title}></img>
        <br />
        <Link className="dash-btn" to={`/book/${props.book._id}`}>Read more</Link>
        <button className="dash-btn"onClick={props.onDeleteClick}>Delete book</button>
        {/* <button onClick={()=>this.props.removeBook(props.book.id)}>Delete book</button> */}
        
      </li>
  )
}

// const mapStateToProps = state => ({
//   books: state.books.books
// });

export default connect(null, {removeBook})(BookItem);