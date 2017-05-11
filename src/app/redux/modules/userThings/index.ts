import {IError, IUserThingsAction} from '../../../models/userThing';
import axios from 'axios';
import {routerActions} from 'react-router-redux';

const ROOT_URL = 'https://ninethingstockhelper.herokuapp.com/api/v1/things';
// const ROOT_URL = 'http://localhost:8080/api/v1/things';

export const UPDATE_USERTHING: string = 'UPDATE_USERTHING';

export const GET_USERTHINGS_LOADING: string = 'GET_USERTHINGS_LOADING';
export const GET_USERTHINGS_SUCCESS: string = 'GET_USERTHINGS_SUCCESS';
export const GET_USERTHINGS_FAILURE: string = 'GET_USERTHINGS_FAILURE';
export const RESET_USERTHINGS: string = 'RESET_USERTHINGS';

export const ADD_USERTHINGS_LOADING: string = 'ADD_USERTHINGS_LOADING';
export const ADD_USERTHINGS_SUCCESS: string = 'ADD_USERTHINGS_SUCCESS';
export const ADD_USERTHINGS_FAILURE: string = 'ADD_USERTHINGS_FAILURE';

export const SAVE_USERTHINGS_LOADING: string = 'SAVE_USERTHINGS_LOADING';
export const SAVE_USERTHINGS_SUCCESS: string = 'SAVE_USERTHINGS_SUCCESS';
export const SAVE_USERTHINGS_FAILURE: string = 'SAVE_USERTHINGS_FAILURE';

// const userThingsList: [IUserThing] = [
//   {id: '1', title: 'one', description: 'sometext', selectedLabels: 'str1, str2', reminder: ''},
//   {id: '2', title: 'two', description: 'sometext2', selectedLabels: 'str3, str4', reminder: ''},
// ];

/** Initial State */
const initialState = {userThingsList: [], error: null, loading: false, submitting: false};

export function userThingReducer(state = initialState, action) {
  switch (action.type) {

    case GET_USERTHINGS_LOADING: // start fetching posts and set loading = true
      return { ...state, userThingsList: [], error: null, loading: true};
    case GET_USERTHINGS_SUCCESS: // return list of things and make loading = false
      return { ...state, userThingsList: action.payload, error: null, loading: false} ;
    case GET_USERTHINGS_FAILURE: // return error and make loading = false
      return { ...state, userThingsList: [], error: action.error, loading: false};
    case RESET_USERTHINGS: // reset thingsList to initial state
      return { ...state, userThingsList: [], error: null, loading: false};

    case ADD_USERTHINGS_LOADING: //
       return { ...state, error: null, loading: true, submitting: true};
    case ADD_USERTHINGS_SUCCESS: //
      const addUserThingsSuccess = state.userThingsList.slice();
      addUserThingsSuccess.push(action.payload);
      console.log('Add User Things Success: ', addUserThingsSuccess);
      return { ...state, userThingsList: addUserThingsSuccess, error: null, loading: false, submitting: false};
    case ADD_USERTHINGS_FAILURE: // return error and make loading = false
      return { ...state, error: action.error, loading: false, submitting: false};

    case SAVE_USERTHINGS_LOADING:
      return { ...state, error: null, loading: true, submitting: true};
    case SAVE_USERTHINGS_SUCCESS:
      return { ...state, error: null, loading: false, submitting: false};
    case SAVE_USERTHINGS_FAILURE:
      return { ...state, error: action.error, loading: false, submitting: false};

    default:
      return state;
  }
}

/** Action Creator: Handles User Things */

function actionErrorHelper(error): IError {
  const actionError: IError = {message: 'Unspecified error', code: 900 };
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Error when making AXIOS call: ', error.response.data.message);
    actionError.message = error.response.data.message;
    actionError.code = error.response.status;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
    actionError.message = error.request;
    actionError.code = 800;
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
    actionError.message = error.message;
    actionError.code = 900;
  }
  return actionError;
}

export function getUserThingsLoading() {
  return{
    type: GET_USERTHINGS_LOADING,
  };
}

export function getUserThings() {
  console.log('Called getUserThings');
  return (dispatch) => {
    // TODO: dispatch an action to set loading
    console.log('start dispatch ajax loading...');
    dispatch(getUserThingsLoading());

    axios({
      method: 'get',
      url: `${ROOT_URL}`,
    }).then( (response) => {
        console.log('Response fetched from ' + ROOT_URL, response);
        dispatch(getUserThingsSuccess(response.data));
      })
      .catch( (error) => {
        dispatch(getUserThingsFailure(error));
      });
  };
}

export function getUserThingsSuccess(userThings): IUserThingsAction {
  console.log('Called getUserThingsSuccess');
  return {
    type: GET_USERTHINGS_SUCCESS,
    payload: userThings,
  };
}

export function getUserThingsFailure(error): IUserThingsAction {
  console.log('Called getUserThingsFailure', error);
  const actionError: IError = actionErrorHelper(error);
  return {
    type: GET_USERTHINGS_FAILURE,
    error: actionError,
  };
}

export function addUserThingsLoading() {
  return{
    type: ADD_USERTHINGS_LOADING,
  };
}

export function addUserThings(imageFile) {
  console.log('Called addUserThings');
  return (dispatch) => {
    // TODO: dispatch an action to set loading
    console.log('uploading imageFile', imageFile);
    dispatch(addUserThingsLoading());

    axios({
      method: 'post',
      url: `${ROOT_URL}/upload`,
      data: imageFile,
    }).then( (response) => {
      console.log('Response fetched from ' + ROOT_URL, response);

      dispatch(addUserThingsSuccess(response.data));
      dispatch(routerActions.push('/managethings'));
    })
      .catch( (error) => {
        dispatch(addUserThingsFailure(error));
      });
  };
}

export function addUserThingsSuccess(newUserThing): IUserThingsAction {
  console.log('Called addUserThingsSuccess');

  return {
    type: ADD_USERTHINGS_SUCCESS,
    payload: newUserThing,
  };
}

export function addUserThingsFailure(error): IUserThingsAction {
  console.log('Called addUserThingsFailure', error);
  const actionError: IError = actionErrorHelper(error);
  return {
    type: ADD_USERTHINGS_FAILURE,
    error: actionError,
  };
}

// Save user thing

export function saveUserThingsLoading() {
  return{
    type: SAVE_USERTHINGS_LOADING,
  };
}

export function saveUserThings(thing) {
  return (dispatch) => {
    // TODO: dispatch an action to set loading
    console.log('saving thing', thing);
    dispatch(saveUserThingsLoading());

    axios({
      method: 'put',
      url: `${ROOT_URL}/`,
      data: thing,
    }).then( (response) => {
      console.log('Response fetched from ' + ROOT_URL, response);

      dispatch(saveUserThingsSuccess(response.data));
      dispatch(routerActions.push('/userthings'));
    })
      .catch( (error) => {
        dispatch(addUserThingsFailure(error));
      });
  };
}

export function saveUserThingsSuccess(newUserThing): IUserThingsAction {
  console.log('Called saveUserThingsSuccess');

  return {
    type: SAVE_USERTHINGS_SUCCESS,
    payload: newUserThing,
  };
}

export function saveUserThingsFailure(error): IUserThingsAction {
  console.log('Called saveUserThingsFailure', error);
  const actionError: IError = actionErrorHelper(error);
  return {
    type: SAVE_USERTHINGS_FAILURE,
    error: actionError,
  };
}
