import * as React from 'react';
import {connect} from 'react-redux';
import {saveUserThings, getUserThings} from '../../redux/modules/userThings/index';
import {ControlLabel, FormControl, FormGroup, Checkbox, Button} from 'react-bootstrap';
import {ILabelArray, IUserThing} from '../../models/userThing';

function mapStateToProps(state, ownProps) {
  let userThingId = ownProps.params.id; // from the path `/course/:id`
  if (!userThingId) {
    // New Thing just added, get the Id of the last item
    userThingId = state.userThings.userThingsList[state.userThings.userThingsList.length - 1].userThingId;
  }
  return {
    userThingId,
    userThings: state.userThings,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onGetUserThingsClick: () => {
      console.log('in the dispatch of onGetUserThingsClick');
      dispatch(getUserThings());
    },
    onSaveThingsClick: (thing) => {
      console.log('in the dispatch of onSaveThingsClick');
      dispatch(saveUserThings(thing));
    },
  };
};
class ManageThings extends React.Component<any, any> {
  private currentThing: IUserThing;
  constructor(props, context) {
    super(props, context);
    const { userThings, userThingId } = this.props;

    this.currentThing = this.getById(userThings.userThingsList, userThingId );
    console.log(this.currentThing);
    const selectedCheckBoxes = {};
    this.currentThing.selectedLabels.forEach( (label) => {
      selectedCheckBoxes[label.toString()] = false ;
    });

    this.state = {
      titleTxt:  this.currentThing.title === null ? '' : this.currentThing.title,
      descriptionTxt: this.currentThing.description === null ? '' : this.currentThing.description,
      labels: this.currentThing.selectedLabels,
      selectedCheckboxes: selectedCheckBoxes,
      currentThing: this.currentThing,

    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
  }

  private getById(userThings, userThingId) {
    console.log(userThings);
    console.log(userThingId);
    const foundUserThing = userThings.filter( (userThing) => (userThing.id === userThingId));
    if (foundUserThing) {
      return foundUserThing[0];
    }
    return null;
  }

  private handleTitleChange(e) {
    this.setState({titleTxt: e.target.value});
  }

  private handleDescriptionChange(e) {
    this.setState({descriptionTxt: e.target.value});
  }

  private handleCheckbox(e) {
    const label = e.target.name.replace('-chkbox', '');
    const selectedCheckboxes = this.state.selectedCheckboxes;
    selectedCheckboxes[label] =  e.target.checked;

    this.setState({selectedCheckboxes});
  }

  private handleSaveButton(e) {
    e.preventDefault();
    const currentThing = this.state.currentThing;
    currentThing.title = this.state.titleTxt;
    currentThing.description = this.state.descriptionTxt;
    currentThing.selectedLabels.length = 0;
    for (const key in this.state.selectedCheckboxes) {
      if (this.state.selectedCheckboxes.hasOwnProperty(key)) {
        if (this.state.selectedCheckboxes[key] === true) {
          currentThing.selectedLabels.push(key);
        }
      }
    }
    console.log('event2', e.target);
    console.log('title: ', this.state.titleTxt );
    console.log('description: ', this.state.descriptionTxt);
    console.log('checkboxes', this.state.selectedCheckboxes);
    this.props.onSaveThingsClick(currentThing);
  }

  public render() {
    let buttonStyle = 'fa fa-floppy-o';
    if (this.props.userThings.loading) {
      buttonStyle = 'fa fa-spinner';
    }
    return (
      <div>
        <img src={this.currentThing.thumbnailDataURI}/>
        <hr />
        <form onSubmit={this.handleSaveButton}>
          <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl type="text" placeholder="Thing's Title" value={this.state.titleTxt}
                         onChange={this.handleTitleChange}/>
          </FormGroup>

          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl type="text" placeholder="Thing's Description" value={this.state.descriptionTxt}
                         onChange={this.handleDescriptionChange} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Labels</ControlLabel>
            {this.labelsToCheckbox(this.state.labels)}
          </FormGroup>
          <Button type="submit" className={buttonStyle} bsStyle="primary"
                 />
        </form>
      </div>
    );
  }

  private labelsToCheckbox(selectedLabels: [ILabelArray]) {
    const labelcheckboxes = selectedLabels.map( (label) => {
      return (
        <Checkbox inline={true} name={label + '-chkbox'} onChange={this.handleCheckbox} >
          {label} {' '}
        </Checkbox>
      );
    });
    return labelcheckboxes;
  }
}

export const ManageThingsPage = connect(mapStateToProps, mapDispatchToProps)(ManageThings);
