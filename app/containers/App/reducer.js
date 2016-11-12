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
  currentToken: '',
  id: '',
  userData: fromJS({
    first_name: 'Jeremy',
    last_name: 'Clarkson',
    headline: 'iniDefaultEntryQuint',
    major: 'iniDefaultEntryQuint',
    university: 'iniDefaultEntryQuint',
    experiences: {
      achievement_num: 0,
      project_num: 0,
      work_num: 0
    },
    linkedin_url: 'linkedin.com/jeremyclarkson',
    resume_url: 'http://iniDefaultEntryQui.nt',
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
