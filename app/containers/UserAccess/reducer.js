/*
 *
 * UserAccess reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGE_INPUT,
  CHANGE_ERROR_MESSAGE,
} from './constants';

const initialState = fromJS({
	lg: {
    email: '',
    pass: '',
    remember: 0,
		message: {
			email: '',
			pass: '',
			error: '',
		},
	},
	su: {
    email: '',
    pass: '',
    confPass: '',
		message: {
			email: '',
			pass: '',
			confPass: '',
			error: '',
		},
	},
});

function userAccessReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_INPUT:
      return state.setIn([action.path, action.field], action.value);
    case CHANGE_ERROR_MESSAGE:
    	return state.setIn([action.path, 'message'], action.payload);
    default:
      return state;
  }
}

export default userAccessReducer;
