import React, { Component } from 'react';
import { Button, Nav, NavDropdown, NavbarBrand, Navbar, NavItem, MenuItem, Glyphicon } from 'react-bootstrap';

export default class Interests extends Component {
  constructor() {
    super();
  }

  render() {
    const createItem = (item, index) => { 
      return (
        <div className="row" key={ index }>
          <div className="col col-xs-12">
            <span onClick={ () => this.props.removeItem(item['.key']) }> 
              <Glyphicon glyph="minus-sign" className="paddingRight"/>
              { item.name }
            </span>
          </div>
        </div>
      );
    }

    return <div>{ this.props.items.map(createItem) }</div>
  }
}
