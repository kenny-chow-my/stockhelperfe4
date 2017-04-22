import {IUserThing, IUserThingsAction} from '../../../models/userThing';
export const UPDATE_USERTHING: string = 'UPDATE_USERTHING';
export const GET_USERTHINGS: string = 'GET_USERTHINGS';

export function userThingReducer(state, action) {
  switch (action.type) {
    case UPDATE_USERTHING:

      return state;
    case GET_USERTHINGS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }

}

/** Action Creator: Decrements the Counter */
export function getUserThings(): IUserThingsAction {
  const userThings: [IUserThing] = [
    {id: '1', title: 'one', description: 'sometext', selectedLabels: 'str1, str2', reminder: ''},
    {id: '2', title: 'two', description: 'sometext2', selectedLabels: 'str3, str4', reminder: ''},
  ];
  return {
    type: GET_USERTHINGS,
    payload: userThings,
};
}
