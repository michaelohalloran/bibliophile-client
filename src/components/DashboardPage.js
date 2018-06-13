import React, { Component } from 'react'
import './DashboardPage.css';
import {Link} from 'react-router-dom';
import {fetchBooksFromDb, removeBook} from '../actions/books';
import BookItem from './BookItem';
import {connect} from 'react-redux';


class DashboardPage extends Component {

  constructor(props) {
    super(props)

    // this.handleDeleteBook = this.handleDeleteBook.bind(this);
  }

  handleDeleteBook(id) {
    console.log('handleDeleteBook function firing, id is ', id);
    this.props.removeBook(id);

  }

  componentDidMount() {
    console.log('mounted Dashboard');
    //grab all this user's books to show
    this.props.fetchBooksFromDb();
  }
  

  render() {
    const {books} = this.props.books;
    console.log('book props are', books);
    const bookDisplay = books.map((book, i)=> (
      <BookItem key={i} book={book} onDeleteClick={this.handleDeleteBook.bind(this, book._id)}/>
    ))
    return (
      <div>
        <Link to="/search"><button>Search for Books</button></Link><br/>
        <ul>
          {bookDisplay}
        </ul>

        {/* <div className="list-row">
        Title: Title1
        <br />
        Price: $5
        <br />
        <img src="http://ichef.bbci.co.uk/wwfeatures/wm/live/1280_640/images/live/p0/2v/dp/p02vdpfn.jpg"></img>
        <br />
        <Link to="/book">Read more</Link>
        </div>

        <div className="list-row">
        Title: Title2
        <br />
        Price: $5
        <br />
        <img src="http://ichef.bbci.co.uk/wwfeatures/wm/live/1280_640/images/live/p0/2v/dp/p02vdpfn.jpg"></img>
        <br />
        <Link to="/book">Read more</Link>
        </div>

        <div className="list-row">
        Title: Title3
        <br />
        Price: $5
        <br />
        <img src="http://ichef.bbci.co.uk/wwfeatures/wm/live/1280_640/images/live/p0/2v/dp/p02vdpfn.jpg"></img>
        <br />
        <Link to="/book">Read more</Link>
        </div> */}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  books: state.books
});

export default connect(mapStateToProps, {fetchBooksFromDb, removeBook})(DashboardPage);