import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {editBookReview } from '../actions/books';

class EditReview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            review: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        e.preventDefault();
        this.setState({
            review: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const updatedReview = {
            review: this.state.review
        }
        this.props.editBookReview(updatedReview, this.props.match.params.book_id, this.props.history);
    }

render() {
    //get books array
    const {books} = this.props;
    //get index of current book
    const currentIndex = books.findIndex(book=>book._id.toString() === this.props.match.params.book_id);
    //get current book's review, so it can populate the textarea
    const currentReview = books[currentIndex].review;

    return (
        <div>
            <form className="review-form" onSubmit={this.onSubmit}>
            <h1 className="review-title">Edit Book Review</h1>
                <textarea 
                    onChange = {this.onChange}
                >
                {currentReview}
                </textarea>
                <br/>
                <button>Submit</button>
            </form>
        </div>
    )
  }
}

const mapStateToProps = state => ({
    books: state.books.books
});

export default connect(mapStateToProps, {editBookReview})(withRouter(EditReview));