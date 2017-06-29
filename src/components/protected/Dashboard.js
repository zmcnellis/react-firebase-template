import React, { Component } from 'react';

export default class Dashboard extends Component {
  render () {
    return (
      <div>
        <h1>Dashboard</h1>
        <div className="row">
          <div className="col col-xs-12">
            <p>Dashboard. This is a protected route. You can only see this if you're authed.</p>
          </div>
        </div>
      </div>
    );
  }
}
