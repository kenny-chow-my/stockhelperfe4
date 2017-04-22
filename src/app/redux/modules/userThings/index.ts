import {IUserThing, IUserThingsAction} from '../../../models/userThing';
export const UPDATE_USERTHING: string = 'UPDATE_USERTHING';
export const GET_USERTHINGS: string = 'GET_USERTHINGS';

/** Initial State */
const initialState: IUserThing = {
 id: '1', title: 'one', description: 'sometext', selectedLabels: 'str1, str2', reminder: '',
};

export function userThingReducer(state = initialState, action) {
  switch (action.type) {
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
