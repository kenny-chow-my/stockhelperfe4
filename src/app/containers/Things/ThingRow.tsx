import * as React from 'react';
import {IUserThing} from '../../models/userThing';
import {Link} from 'react-router';

interface IProps {
  thing: IUserThing;
}

class ThingRow extends React.Component<IProps, {}> {

  public render() {
    const { thing } = this.props;
    return (
      <tr>
        <td>{thing.id}</td>
        <td><Link to={'/thing/' + thing.id}>{thing.title}</Link></td>
        <td>{thing.description}</td>
        <td>{thing.selectedLabels}</td>
        <td>{thing.reminder}</td>
      </tr>
    );
  }
}

export default ThingRow;
