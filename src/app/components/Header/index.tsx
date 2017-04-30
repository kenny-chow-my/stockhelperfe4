import * as React from 'react';
// import { Link } from 'react-router';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

class Header extends React.Component<any, any> {

  constructor(props, context) {
    super(props, context);
    this.state = {activeKey: 1};
  }

  public render() {
    // const handleSelect = (selectedKey) => {
    //   this.setState({activeKey: selectedKey});
    // };

    return (
      <Navbar inverse={true} collapseOnSelect={true}>
        <Navbar.Header>
          <Navbar.Brand>
            9Things StockHelper
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <IndexLinkContainer to="/">
            <NavItem>Home</NavItem>
            </IndexLinkContainer >
            <LinkContainer to="/about">
            <NavItem>About</NavItem>
            </LinkContainer>
            <LinkContainer to="/userthings">
            <NavItem>UserThings</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export {Header};
