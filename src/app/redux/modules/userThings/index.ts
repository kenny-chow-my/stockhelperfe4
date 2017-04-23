import {IUserThing, IUserThingsAction} from '../../../models/userThing';
export const UPDATE_USERTHING: string = 'UPDATE_USERTHING';
export const GET_USERTHINGS: string = 'GET_USERTHINGS';

const userThingsList: [IUserThing] = [
  {id: '1', title: 'one', description: 'sometext', selectedLabels: 'str1, str2', reminder: ''},
  {id: '2', title: 'two', description: 'sometext2', selectedLabels: 'str3, str4', reminder: ''},
];

/** Initial State */
const initialState = {userThingsList};

export function userThingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERTHINGS:
      return {userThingsList: action.payload};
    default:
      return state;
  }
}

/** Action Creator: Decrements the Counter */
export function getUserThings(): IUserThingsAction {
  console.log('Called getUserThings');
  userThingsList[0].description = 'Random: ' + Math.random();
  userThingsList[1].description = 'Random: ' + Math.random();
  return {
    type: GET_USERTHINGS,
    payload: userThingsList,
};
}
