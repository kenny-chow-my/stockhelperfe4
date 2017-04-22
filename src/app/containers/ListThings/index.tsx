import * as React from 'react';
import {connect} from 'react-redux';
import {getUserThings} from '../../redux/modules/userThings/index';
import {Button} from 'react-bootstrap';
import * as Table from 'reactabular-table';

const mapStateToProps = (state) => {
  return {userThing: state.userThing};
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
    const rows = [
      {id: '1', title: 'one', description: 'sometext', selectedLabels: 'str1, str2', reminder: ''},
      {id: '2', title: 'two', description: 'sometext2', selectedLabels: 'str3, str4', reminder: ''},
    ];

    const columns = [
      {
        property: 'id',
        header: {
          label: 'ID',
          transforms: [
            (label) => ({
              onClick: () => alert(`clicked ${label}`),
            }),
          ],
        },
      },
      {
        property: 'title',
        header: {
          label: 'Title',
        },
      },
      {
        property: 'thing.thumbnailPngBase64',
        header: {
          label: 'Thumbnail',
        },
      },
      {
        property: 'selectedLabels',
        header: {
          label: 'Labels',
        },
      },
      {
        property: 'description',
        header: {
          label: 'Description',
        },
      },
      {
        property: 'reminder',
        header: {
          label: 'Reminder',
        },
      },
    ];

    return (
      <div>

        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
        >
          <Table.Header />

          <Table.Body rows={rows} rowKey="id"/>
        </Table.Provider>

        <hr/>

        <Button bsStyle="success">Load user Things!</Button>
      </div>

    );
  }

}

export {UserThings}
