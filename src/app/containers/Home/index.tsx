import * as React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
const style = require('./style.css');

class Home extends React.Component<any, any> {

  public render() {
    return (
      <Jumbotron>
        <div className={style.Home}>
          <p>Welcome to Thing9!</p>
          <Button bsStyle="info">Click Me!</Button>
        </div>
      </Jumbotron>
    );
  }
}

export { Home }
