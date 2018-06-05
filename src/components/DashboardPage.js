import React, { Component } from 'react'
import './DashboardPage.css';
import {Link} from 'react-router-dom';

class DashboardPage extends Component {

  

  render() {
    return (
      <div>
        <Link to="/search"><button>Search for Books</button></Link><br/>

        {/* hit backend route for getting all user posts, display here */}

        <div className="list-row">
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
        </div>
      </div>
    )
  }
}



export default DashboardPage;