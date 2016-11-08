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
  LOG_IN_SUCCESS,
  LOG_OUT,
  EDIT_PROFILE,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  loggedIn: true,
  currentToken: 'holaamigo',
  userData: fromJS({
    firstName: 'Jeremy',
    lastName: 'Clarkson',
    headline: 'I am a still small voice of calm and reason.',
    major: 'Power',
    university: 'University of Fossil Fuel',
    achievement: 1000,
    project: 300,
    job: 1,
    linkedIn: 'linkedin.com/jeremyclarkson',
    resume: 'drive.google.com/ohdoicare',
    valid: false,
  }),
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return state
        .set('loggedIn', true)
        .set('error', false)
        .set('currentToken', action.token)
        .set('userData', fromJS(action.payload));
    case LOG_OUT:
      return state
        .set('userData', fromJS({}))
        .set('currentToken', '')
        .set('loggedIn', false);
    case EDIT_PROFILE:
      return state
        .set('userData', action.payload);
    default:
      return state;
  }
}

export default appReducer;
