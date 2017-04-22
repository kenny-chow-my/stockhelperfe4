import * as React from 'react';
const style = require('./style.css');

class About extends React.Component<any, any> {
  public render() {
    return (
      <div className={style.About}>
        <h4>Copyright 2017 Kenny Chow</h4>
      </div>
    );
  }
}

export { About }
