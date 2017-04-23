import * as React from 'react';
import {Button, Table} from 'react-bootstrap';
import ThingRow from './ThingRow';

class ThingList extends React.Component<any, {}> {
  public render() {
    const { things } = this.props;
    return (
      <div>
        <Table striped={true} bordered={true} condensed={true} hover={true}>
          <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Labels</th>
            <th>Reminder</th>
          </tr>
          </thead>
          <tbody>
          {things.userThings.map( (thing) => <ThingRow key={thing.id} thing={thing}/>)}
          </tbody>
        </Table>
        <hr/>

      </div>
    );
  }

};

export default ThingList;
