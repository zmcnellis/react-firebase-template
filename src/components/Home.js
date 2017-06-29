import React, { Component } from 'react';

export default class Home extends Component {
  render () {
    return (
      <div>
        <h1>Home</h1>
        <div className="row">
          <div className="col col-xs-12">
            <p>Home. Not Protected. Anyone can see this.</p>
          </div>
        </div>
      </div>
    );
  }
}
