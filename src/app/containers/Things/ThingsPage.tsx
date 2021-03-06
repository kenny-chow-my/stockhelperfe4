import * as React from 'react';
import {connect} from 'react-redux';
import {addUserThings, getUserThings} from '../../redux/modules/userThings/index';
import ThingList from './ThingList';
import {Button, ControlLabel, Modal, Thumbnail} from 'react-bootstrap';
const style = require('./style.css');

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
    onAddThingsClick: (imageFile) => {
      console.log('in the dispatch of onGetUserThingsClick');
      dispatch(addUserThings(imageFile));
    },
  };
};

class UserThings extends React.Component<any, any> {

  constructor(props, context) {
    super(props, context);
    this.state = {AddThingsState: {show: false}};
    this.handleImageChange = this.handleImageChange.bind(this);
    this.onAddThingClick = this.onAddThingClick.bind(this);
  }

  public componentWillReceiveProps(nextProps) {
    if (!nextProps.userThings.submitting) {
      this.setState({AddThingsState: {show: false}});
    }
  }

  private handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        AddThingsState: {
          show: true,
          imagePreviewUrl: reader.result,
          file,
        },
      });
    };
    reader.readAsDataURL(file);
  }

  private onAddThingClick() {
    // console.log('Uploading file:', this.state.AddThingsState);

    const original: any = document.getElementById('thingThumbnail').children[0];
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', '300');
    canvas.setAttribute('height', '300');
    canvas.getContext('2d').drawImage(original, 0, 0, 300, 300);
    const imgThumbBase64 = canvas.toDataURL('image/png');
    console.log('image:', imgThumbBase64);
    const imageFile = {
      filename: this.state.AddThingsState.file.name,
      imageDataBase64: imgThumbBase64,
      contentType: this.state.AddThingsState.file.type,
    };
    this.props.onAddThingsClick(imageFile);
    //
  }

  public render() {

    const close = () => {
      this.setState({AddThingsState: {show: false}});
    };

    const onRefreshClick = () => {
      console.log('dispatching onGetUserThingsClick');
      this.props.onGetUserThingsClick();
    };

    const {userThingsList, loading, error} = this.props.userThings;

    const showLoading = () => {
      if (loading) {
        return <div className="container"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"/><h3>Loading...</h3></div>;
      }
    };

    const showError = () => {
      if (error !== null) {
        return <div className="alert alert-danger">Error: {error.message}</div>;
      }
    };

    return (
      <div>
        <h1>
          Your Things
        </h1>
        <br/>
        <hr/>

        <Modal
          show={this.state.AddThingsState.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton={true}>
            <Modal.Title id="contained-modal-title">Add User Things</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showLoading()}
            Thing Preview:
            <Thumbnail id="thingThumbnail" href="#" alt="171x180" src={this.state.AddThingsState.imagePreviewUrl}/>

          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.onAddThingClick}>Submit</Button>&nbsp;
            <Button bsStyle="default" onClick={close}>Cancel</Button>
          </Modal.Footer>
        </Modal>

        {showLoading()}
        {showError()}
        <Button className="fa fa-refresh" bsStyle="primary"
                onClick={onRefreshClick}/>
        <ThingList userThings={userThingsList}/>

        <form>
          <ControlLabel>Add a Thing</ControlLabel>
          <br/>

          <label>
            <input id="imgFileInput" className={style.hidden}
                   type="file" label="Upload" accept="image/*" capture={true}
                   onChange={this.handleImageChange} width={50}/>
            <i className="fa fa-camera-retro fa-lg"/> Upload...
          </label>
        </form>
      </div>
    );
  }
}
;

export const UserThingsPage = connect(mapStateToProps, mapDispatchToProps)(UserThings);
