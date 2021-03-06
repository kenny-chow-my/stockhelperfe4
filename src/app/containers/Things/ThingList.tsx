import * as React from 'react';
import {Table} from 'react-bootstrap';
import ThingRow from './ThingRow';

class ThingList extends React.Component<any, {}> {
  public render() {
    const { userThings } = this.props;
    console.log('things => ', userThings);
    return (
      <div>
        <Table width="90%" striped={true} bordered={true} condensed={true} hover={true}>
          <thead>
          <tr>
            <th>ID</th>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Labels</th>
            <th>Reminder</th>
          </tr>
          </thead>
          <tbody>
          {userThings.map( (thing) => <ThingRow key={thing.id} thing={thing}/>)}
          </tbody>
        </Table>
        <hr/>

      </div>
    );
  }

};

export default ThingList;
