import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {makeBookReview } from '../actions/books';

class AddReview extends Component {

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
        const bookReview = {
            text: this.state.review
        }
        this.props.makeBookReview(bookReview, this.props.history);
    }


  render() {
    return (
        <div>
            <h1>Add a Book Review</h1>
            <form onSubmit={this.onSubmit}>
                <textarea />
                <button onChange={this.onChange}>Submit</button>
            </form>
        </div>
    )
  }
}

const mapStateToProps = state => ({
    books: state.books
});

export default connect(mapStateToProps, {makeBookReview})(withRouter(AddReview));