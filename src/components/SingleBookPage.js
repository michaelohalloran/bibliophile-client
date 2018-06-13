import React, {Component} from 'react';
import './SingleBookPage.css';
import {deleteBookReview} from '../actions/books';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class SingleBookPage extends Component {

  render() {
      //this is state.books.books
    const {books} = this.props.books;
    console.log('book props inside SingleBookPage', books);
    //find this book by Id
    // console.log(this.props.match.params);
    const bookArray = books.filter(book=> {
        return book._id.toString() === this.props.match.params.id;
    })

    let singleBook = bookArray[0];
    console.log('singleBook is ', singleBook);

    const bookDiv = 
        <div>
            <h3>Title: {singleBook.title}</h3>
            <p>Author: {singleBook.author}</p>
            <img src={`${singleBook.image}`} alt={singleBook.title} />
            <p>Price: {singleBook.price}</p>
            <p>Rating: {singleBook.rating}</p>
            <textarea>
            Lorem ipsum dolor sit amet, in dicta consul semper vel, vis at sumo mundi quidam, 
            in reque epicuri nominavi nec. Duo malis feugiat ea, vis ex meis iusto comprehensam. 
            Cu petentium definitiones pri, nullam erroribus maluisset te nam. 
            Eum ex augue voluptatum, et zril labitur equidem his. His eu nostrum deleniti pertinax, 
            ex ubique invenire erroribus nam, quo ne homero neglegentur.
            </textarea>
            {/* {singleBook.review.length > 0 ? (
                <div>
                    <Link to="/edit-review">Edit book review</Link>
                    <button onClick={()=>console.log('hit Delete post button')}>Delete post</button>
                </div>
            ) : (
                <Link to="/add-review">Add a book review</Link>
            )} */}
        </div>

    
    return (
      <div>
          <h1>SingleBookPage Div</h1>
          {bookDiv}
          
        {/* <button onClick={()=>console.log('hit Edit post button')}>Edit post</button> */}
    
        
    
        {/* CHECK IF THIS BOOK HAS A REVIEW ALREADY; IF SO, RENDER EDIT AND DELETE, IF NOT, SHOW ADD */}
        {/* {this.props.books ? (
            <
            <button onClick={()=>this.props.deleteBookReview(props.review.id)}>Delete post</button>

         ) : (
            <Link to="/add-review">Add a book review</Link> 
        )}
        <Link to="/edit-review">Edit book review</Link>  */}

      </div>
    )
  }
}

// const SingleBookPage = (props)=> (
//     <div>
//         <div>
//          <h3>Title: {props.book.title}</h3>
//          <p>Author: {props.book.author}</p>
//          <img src={`${props.book.thumbnail}`} alt={props.book.title} />
//          <p>Price: {props.book.price}</p>
//          <p>Rating: {props.book.avgRating}</p>
//         </div>

//         <div>
//             <textarea>
//             Lorem ipsum dolor sit amet, in dicta consul semper vel, vis at sumo mundi quidam, 
//             in reque epicuri nominavi nec. Duo malis feugiat ea, vis ex meis iusto comprehensam. 
//             Cu petentium definitiones pri, nullam erroribus maluisset te nam. 
//             Eum ex augue voluptatum, et zril labitur equidem his. His eu nostrum deleniti pertinax, 
//             ex ubique invenire erroribus nam, quo ne homero neglegentur.
//             </textarea>
//         </div>

//         <Link to="/add-review">Add a book review</Link> 
    
//         {/* CHECK IF THIS BOOK HAS A REVIEW ALREADY; IF SO, RENDER EDIT AND DELETE, IF NOT, SHOW ADD */}
//         {/* {this.props.books ? (
//             <Link to="/edit-review">Edit book review</Link>  */}
//             {/* <button onClick={()=>this.props.deleteBookReview(props.review.id)}>Delete post</button> */}

//         {/* ) : (
//             <Link to="/add-review">Add a book review</Link> 
//         )} */}
//         <Link to="/edit-review">Edit book review</Link> 
//         {/* <button onClick={()=>console.log('hit Edit post button')}>Edit post</button> */}
//         <button onClick={()=>console.log('hit Delete post button')}>Delete post</button>
        
//     </div>
// );

const mapStateToProps = state => ({
    books: state.books
});

export default connect(mapStateToProps, {deleteBookReview})(SingleBookPage);