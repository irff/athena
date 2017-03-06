/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  LOG_IN_SUCCESS_STUDENT,
  LOG_IN_SUCCESS_COMPANY,
  LOG_OUT,
  EDIT_PROFILE,
  LOADING,
  LOADING_DONE,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  loggedIn: true,
  currentToken: '',
  id: '',
  userData: fromJS({}),
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS_STUDENT:
      return state
        .set('loggedIn', true)
        .set('error', false)
        .set('currentToken', action.token)
        .set('id', action.id)
        .set('userData', fromJS(action.payload));
    case LOG_IN_SUCCESS_COMPANY:
      return state
        .set('loggedIn', true)
        .set('error', false)
        .set('currentToken', action.token)
        .set('id', action.id)
        .set('userData', fromJS(action.payload));
    case LOG_OUT:
      return state
        .set('userData', fromJS({}))
        .set('currentToken', '')
        .set('id', '')
        .set('loggedIn', false);
    case EDIT_PROFILE:
      return state
        .set('userData', action.payload);
    case LOADING:
      return state
        .set('loading', true);
    case LOADING_DONE:
      return state
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
