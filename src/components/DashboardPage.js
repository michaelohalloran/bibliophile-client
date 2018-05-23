import React from 'react';
import './DashboardPage.css';
import {Link} from 'react-router-dom';

const DashboardPage = ()=> (
    <div>
        <h1>Dashboard Page</h1>

        <input type="text" name="bookSearch" placeholder="Search for title/author"/>
        <button>Search</button>
        <br />

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
);


export default DashboardPage;