import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { starsReducer } from './modules/stars';
import { IStore } from './IStore';
import {userThingReducer} from './modules/userThings/index';

const { reducer } = require('redux-connect');

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
  routing: routerReducer,
  stars: starsReducer,
  userThings: userThingReducer,
  reduxAsyncConnect: reducer,
});

export default rootReducer;
