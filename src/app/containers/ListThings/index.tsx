import * as React from 'react';
import {ReactDataGrid} from 'react-data-grid';
import {connect} from 'react-redux';
import {getUserThings} from '../../redux/modules/userThings/index';
import {Button} from 'react-bootstrap';
import {IUserThing} from '../../models/userThing';

const mapStateToProps = (state) => {
  return { userThing: state.userThing };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUserThingsClick: () => {
      dispatch(getUserThings());
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class UserThings extends React.Component<any, any> {

   public render() {
    const userThing: IUserThing = this.props.userThing;

    const columns = [
      {
        key: 'id',
        name: 'ID',
        locked: true,
      },
      {
        key: 'title',
        name: 'Title',
        width: 200,
        sortable: true,
      },
      {
        key: 'thing.thumbnailPngBase64',
        name: 'Thumbnail',
        width: 200,
      },
      {
        key: 'selectedLabels',
        name: 'Labels',
        width: 200,
        sortable: true,
      },
      {
        key: 'description',
        name: 'Description',
        width: 200,
        sortable: true,
      },
      {
        key: 'reminder',
        name: 'Alarm',
        width: 200,
        sortable: true,
      },
    ];

    const handleGridSort = (sortColumn, sortDirection) => {
      const comparer = (a, b) => {
        if (sortDirection === 'ASC') {
          return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
        } else if (sortDirection === 'DESC') {
          return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
        }
      };
      const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);

      this.setState({ rows });
    };

    const  rowGetter = (i) => {
       console.log('getting row: ' + i);
       return this.props.userThing;
     };

    return (
      <div>
        <ReactDataGrid
          onGridSort={handleGridSort}
          columns={columns}
          rowGetter={rowGetter}
          rowsCount={1}
          minHeight={500} />);
        <hr/>
        <p>
          {userThing.title} | {userThing.description}
        </p>
        <Button bsStyle="">Click Me!</Button>
      </div>

    );
  }

}

export { UserThings }
