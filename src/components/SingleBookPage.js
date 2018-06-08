import React from 'react';
import './SingleBookPage.css';
import {deleteBookReview} from '../actions/books';

const SingleBookPage = (props)=> (
    <div>
        <div>
         <h3>Title: {props.book.title}</h3>
         <p>Author: {props.book.author}</p>
         <img src={`${props.book.thumbnail}`} alt={props.book.title} />
         <p>Price: {props.book.price}</p>
         <p>Rating: {props.book.avgRating}</p>
        </div>

        <div>
            <textarea>
            Lorem ipsum dolor sit amet, in dicta consul semper vel, vis at sumo mundi quidam, 
            in reque epicuri nominavi nec. Duo malis feugiat ea, vis ex meis iusto comprehensam. 
            Cu petentium definitiones pri, nullam erroribus maluisset te nam. 
            Eum ex augue voluptatum, et zril labitur equidem his. His eu nostrum deleniti pertinax, 
            ex ubique invenire erroribus nam, quo ne homero neglegentur.
            </textarea>
        </div>

        <button onClick={()=>console.log('hit Edit post button')}>Edit post</button>
        <button onClick={()=>console.log('hit Delete post button')}>Delete post</button>
        {/* <button onClick={()=>this.props.deleteBookReview(props.review.id)}>Delete post</button> */}
        
    </div>
);

const mapStateToProps = state => ({
    books: state.books
});
export default connect(mapStateToProps, {deleteBookReview})(SingleBookPage);