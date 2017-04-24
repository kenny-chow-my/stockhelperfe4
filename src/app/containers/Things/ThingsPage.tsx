import * as React from 'react';
import {connect} from 'react-redux';
import {getUserThings} from '../../redux/modules/userThings/index';
import ThingList from './ThingList';
import {Button, Modal, Thumbnail, ControlLabel} from 'react-bootstrap';

function mapStateToProps(state) {
  return {
    userThings: state.userThings,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onGetUserThingsClick: () => {
      console.log('in the dispatch of onGetUserThingsClick');
      dispatch(getUserThings());
    },
  };
};

class UserThings extends React.Component<any, any> {

  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
    };
  }

  public render() {
    const onAddThingClick = () => {
      console.log('Uploading file:', this.state.file);
    };

    const handleImageChange = (e) => {
      e.preventDefault();

      const reader = new FileReader();
      const file = e.target.files[0];

      reader.onloadend = () => {
        this.setState({
          file,
          imagePreviewUrl: reader.result,
          show: true,
        });
      };
      reader.readAsDataURL(file);
    };

    const close = () => {
      this.setState({ show: false});
    };

    // const uploadFileButton = () => {
    //   return (
    //     <Button bsStyle="primary"><span><i className="fa fa-user fa-fw"/>Image</span></Button>
    //   );
    // };

    const onRefreshClick = () => {
      console.log('dispatching onGetUserThingsClick');
      this.props.onGetUserThingsClick();
    };

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
            Thing Preview:
            <Thumbnail href="#" alt="171x180" src={this.state.imagePreviewUrl} />

          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={onAddThingClick}>Submit</Button>&nbsp;
            <Button bsStyle="default" onClick={close}>Cancel</Button>
          </Modal.Footer>
        </Modal>
         <br/>
        <hr/>
        <ThingList userThings={this.props.userThings} />
        <Button className="fa fa-refresh" bsStyle="primary"
                onClick={onRefreshClick}> Refresh Thing</Button>

        <form>
          <ControlLabel>Add a Thing</ControlLabel>
          <br/>
          <span className="fa fa-camera-retro fa-lg">
          <input id="imgFileInput"
            type="file" label="Upload" accept="image/*" capture={true}
            onChange={handleImageChange} width={100}
          />
          </span>

        </form>
      </div>
    );
  }
};

export const UserThingsPage = connect(mapStateToProps, mapDispatchToProps)(UserThings);
