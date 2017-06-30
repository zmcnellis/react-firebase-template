import React, { Component } from 'react';
import { ref } from '../../config/constants';
import Interests from '../Interests'
import { Button, Nav, NavDropdown, NavbarBrand, Navbar, NavItem, MenuItem, Glyphicon, FormControl } from 'react-bootstrap';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      addItem: false,
      text: ""
    };
    this.removeItem = this.removeItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onChange = this.onChange.bind(this);
    this.saveItem = this.saveItem.bind(this);

  }

  removeItem(key) {
    ref.child("interests").child(key).remove();
  }

  addItem() {
    this.setState({
      addItem: true
    });
  }

  onChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  saveItem(val) {
    if (this.state.text && this.state.text.trim().length !== 0) {
      ref.child("interests").push({
        name: val
      });
      this.setState({
        addItem: false,
        text: ''
      });
    }
  }

  componentWillMount() {
    ref.child("interests").on('value', function(dataSnapshot) {
      let items = [];
      dataSnapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item['.key'] = childSnapshot.key;
        items.push(item);
      });

      this.setState({
        items: items
      });
    }.bind(this));
  }

  componentWillUnmount() {
    ref.off();
  }

  render () {
    let AddPanel = this.state.addItem ? (
        <div className="row">
          <div className="col col-xs-4">
            <FormControl type="text" placeholder="Interest Name" onChange={this.onChange}/>
          </div>
          <div className="col col-xs-4">
            <Button onClick={() => this.saveItem(this.state.text)}>Insert</Button>
          </div>
        </div>
    ) : null;

    return (
      <div>
        <h1>Dashboard</h1>
        <div className="row">
          <div className="col col-xs-12">
            <p>Dashboard. This is a protected route. You can only see this if you're authed.</p>
          </div>
        </div>
        <div className="row">
          <div className="col col-xs-12">
            <Button onClick={this.addItem} disabled={this.state.addItem}><Glyphicon glyph="plus-sign" /> Add Interest</Button>
          </div>
        </div>
        <hr/>
        <Interests items={this.state.items} removeItem={this.removeItem}></Interests>
        { AddPanel }
      </div>
    );
  }
}
