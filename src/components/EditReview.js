import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {editBookReview } from '../actions/books';

//CHANGe MUCH OF THIS********************************

class EditReview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            review: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    //fill in textarea with any reviews that already exist
    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.books.books) {
    //         console.log('in EditReview, nextProps.books.books is ', nextProps.books.books);
    //         //need to get specific book here
    //         const review = nextProps.books.books.review;
    //         review ? review : '';
    //         //set state with updated review
    //         this.setState({
    //             review: review
    //         });
    //     }
    // }

    // componentDidMount() {
    //     const {books} = this.props;
    //     console.log('books inside cDM are ', books);
    //     console.log('is books an array?', Array.isArray(books));
    //     const currentIndex = books.findIndex(book=>book._id.toString() === this.props.match.params.book_id);
    //     console.log('current book idx is', currentIndex);
    //     console.log('current book is: ', books[currentIndex]);
    //     console.log('current book review is: ', books[currentIndex].review);

    // }

    onChange(e) {
        e.preventDefault();
        this.setState({
            review: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        console.log('hit onSubmit in editReview component');
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
                    placeholder={currentReview}
                    value={this.state.review}
                    onChange = {this.onChange}
                />
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