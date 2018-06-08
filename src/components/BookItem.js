import React from 'react';
import {Link} from 'react-router-dom';
import {removeBook} from '../actions/books';


const BookItem = (props) => {
  return (
    <div className="list-row">
        <h3>Title: {props.book.title}</h3>
        <br />
        <p>Price: {props.book.price}</p>
        <br />
        <img src={`${props.book.thumbnail}`} alt={props.book.title}></img>
        <br />
        <Link to={`/book/${props.book.id}`}>Read more</Link>
        <button onClick={()=>'Hit Delete book button'}>Delete book</button>
        {/* <button onClick={()=>this.props.removeBook(props.book.id)}>Delete book</button> */}
        
      </div>
  )
}

const mapStateToProps = state => ({
  books: state.books
});

export default connect(mapStateToProps, {removeBook})(BookItem);