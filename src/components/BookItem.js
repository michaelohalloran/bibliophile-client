import React from 'react';
import {Link} from 'react-router-dom';
import {removeBook} from '../actions/books';
import {connect} from 'react-redux';


const BookItem = (props) => {
  return (
    <li className="list-row">
        <h3>Title: {props.book.title}</h3>
        <br />
        <p>Price: {props.book.price}</p>
        <br />
        {console.log('img url is', props.book.image)}
        <img src={`${props.book.image}`} alt={props.book.title}></img>
        <br />
        <Link to={`/book/${props.book._id}`}>Read more</Link>
        <button onClick={()=>'Hit Delete book button'}>Delete book</button>
        {/* <button onClick={()=>this.props.removeBook(props.book.id)}>Delete book</button> */}
        
      </li>
  )
}

const mapStateToProps = state => ({
  books: state.books
});

export default connect(mapStateToProps, {removeBook})(BookItem);