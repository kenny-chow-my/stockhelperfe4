export interface IUserThing {
  id: string;
  title: string;
  selectedLabels: string;
  description: string;
  reminder: string;
}

export interface IError {
  message: string;
  code: number;
}

export interface IUserThingsAction {
  type: string;
  payload?: [IUserThing];
  error?: IError;

}
