import * as React from 'react';
import {connect} from 'react-redux';
import {addUserThings, getUserThings} from '../../redux/modules/userThings/index';
import {ControlLabel, FormControl, FormGroup, Checkbox, Button} from 'react-bootstrap';
import {ILabelArray} from '../../models/userThing';

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
class ManageThings extends React.Component<any, any> {

  public render() {
    const { userThings } = this.props;

    // New Thing just added should be the last item
    const newThing = userThings.userThingsList[userThings.userThingsList.length - 1];
    const handleSaveButton = (e) => {console.log(e); };

    return (
      <div>
        <form>
          <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl type="text" placeholder="Thing's Title" value={newThing.title} />
          </FormGroup>

          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl type="text" placeholder="Thing's Description"  value={newThing.description} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Labels</ControlLabel>
            {this.labelsToCheckbox(newThing.selectedLabels)}
          </FormGroup>
          <Button type="submit" onClick={handleSaveButton}>
            Save
          </Button>
        </form>

        {JSON.stringify(newThing)};
      </div>
    );
  }

  private labelsToCheckbox(selectedLabels: [ILabelArray]) {
    const labelcheckboxes = selectedLabels.map( (label) => {
      return (
        <Checkbox inline={true}>
          {label} {' '}
        </Checkbox>
      );
    });

    return labelcheckboxes;

  }
}

export const ManageThingsPage = connect(mapStateToProps, mapDispatchToProps)(ManageThings);
