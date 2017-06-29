import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import '../../packages/bootstrap/dist/css/bootstrap.css';
import { Button, Nav, NavDropdown, NavbarBrand, Navbar, NavItem, MenuItem, Glyphicon } from 'react-bootstrap';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Dashboard from './protected/Dashboard';
import { logout } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  );
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to="/dashboard" />}
    />
  );
}

function ListItemLink({to, children}) {
  return (
    <Route path={to} children={({match}) => (
      <li role="presentation" className={match ? 'active' : ''}>
        <Link to={to}>{children}</Link>
      </li>
    )} />
  );
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      authed: false,
      loading: true
    };
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false
        });
      } else {
        this.setState({
          authed: false,
          loading: false
        });
      }
    });
  }
  componentWillUnmount () {
    this.removeListener();
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <Navbar fixedTop fluid>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">React Router + Firebase Auth</Link>
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <ListItemLink to="/dashboard">Dashboard</ListItemLink>
              </Nav>
              <Nav pullRight>
                {this.state.authed
                  ? <NavDropdown eventKey={1} id="basic-nav-dropdown" title={
                      <Glyphicon glyph="user" />
                    }>
                      <MenuItem eventKey={1.1} onClick={() => logout() }>Logout</MenuItem>
                    </NavDropdown>
                  : <ListItemLink to="/login">Login</ListItemLink> }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="container">
            <div className="row">
              <Switch>
                <Route path="/" exact component={Home} />
                <PublicRoute authed={this.state.authed} path="/login" component={Login} />
                <PublicRoute authed={this.state.authed} path="/register" component={Register} />
                <PrivateRoute authed={this.state.authed} path="/dashboard" component={Dashboard} />
                <Route render={() => 
                  <div>
                    <h1>Page Not Found</h1>
                    <div className="row">
                      <div className="col col-xs-12">
                        Try visiting the home page <Link to="/">here</Link>
                      </div>
                    </div>
                  </div>
                } />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
