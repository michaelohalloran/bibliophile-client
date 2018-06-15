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
 
        // this.onChange = this.onChange.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(bookId) {
        console.log('inside handleDelete on singleBookPage, bookID is ', this.props.match.params.id);
        this.props.deleteBookReview(this.props.match.params.id);
    }

    // onChange(e) {
    //     e.preventDefault();
    //     this.setState({
    //         review: e.target.value
    //     })
    // }

    // onSubmit(e) {
    //     e.preventDefault();
    //     //dispatch makeBookReview, show updated state
    // }

  render() {
      //this is state.books.books
    const {books} = this.props;
    console.log('this.props inside SingleBookPage', this.props);
    console.log('book props inside SingleBookPage', books);
    //find this book by Id
    // console.log(this.props.match.params);
    //this makes an array consisting solely of the book whose ID is the URL
    const bookArray = books.filter(book=> {
        return book._id.toString() === this.props.match.params.id;
    })

    //this is the first and only item from booksArray:
    let singleBook = bookArray[0];
    console.log('singleBook is ', singleBook);
    console.log('current singleBook review is ', singleBook.review);

    //display the book, with either add or edit/delete review buttons
    const bookDiv = 
        <div>
            <h3>Title: {singleBook.title}</h3>
            <p>Author: {singleBook.author}</p>
            <img src={`${singleBook.image}`} alt={singleBook.title} />
            <p>Price: {singleBook.price}</p>
            <p>Rating: {singleBook.rating}</p>
            <p>Review: {singleBook.review}</p>
            {/* Lorem ipsum dolor sit amet, in dicta consul semper vel, vis at sumo mundi quidam, 
            in reque epicuri nominavi nec. Duo malis feugiat ea, vis ex meis iusto comprehensam. 
            Cu petentium definitiones pri, nullam erroribus maluisset te nam. 
            Eum ex augue voluptatum, et zril labitur equidem his. His eu nostrum deleniti pertinax, 
            ex ubique invenire erroribus nam, quo ne homero neglegentur. */}
        
            {singleBook.review.length > 0 ? (
                <div>
                    <Link to="/edit-review">Edit book review</Link>
                    <button onClick={this.handleDelete}>Delete review</button>
                </div>
            ) : (
                <Link to={`/add-review/${this.props.match.params.id}`}>Add a book review</Link>
            )}
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
    books: state.books.books
});

export default connect(mapStateToProps, {deleteBookReview, fetchBooksFromDb})(SingleBookPage);