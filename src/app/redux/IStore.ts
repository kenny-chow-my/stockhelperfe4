import { ICounter } from 'models/counter';
import { IStars } from 'models/stars';
import {IUserThing} from 'models/userThing';

export interface IStore {
  counter: ICounter;
  stars: IStars;
  userThings: IUserThing;
};
