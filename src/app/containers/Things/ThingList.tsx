import * as React from 'react';
import {Table} from 'react-bootstrap';
import ThingRow from './ThingRow';

class ThingList extends React.Component<any, {}> {
  public render() {
    const { userThings } = this.props;
    console.log('things => ', userThings.userThingsList);
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
          {userThings.userThingsList.map( (thing) => <ThingRow key={thing.id} thing={thing}/>)}
          </tbody>
        </Table>
        <hr/>

      </div>
    );
  }

};

export default ThingList;
