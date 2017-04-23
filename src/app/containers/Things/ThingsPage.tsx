import * as React from 'react';
import {connect} from 'react-redux';
import {getUserThings} from '../../redux/modules/userThings/index';
import ThingList from './ThingList';
import {Button, Modal} from 'react-bootstrap';

const mapStateToProps = (state) => {
  return {
    userThings: state.userThings,
  };
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
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
    };
  }

  public render() {
    const onGetUserThingsClick = () => {
      this.setState({ show: true});
    };

    const close = () => {
      this.setState({ show: false});
    };
    console.log( 'UserThings in Page: ', this.props.userThings);
    return (
      <div>
      <h1>
        Your Things
      </h1>

        <Modal
          show={this.state.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton={true} >
            <Modal.Title id="contained-modal-title">Add User Things</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Adding User Things...
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={close}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Button bsStyle="success"
                onClick={onGetUserThingsClick}>Add Course</Button>
        <br/>
        <hr/>
        <ThingList userThings={this.props.userThings} />
      </div>
    );
  }
};

export {UserThings}
