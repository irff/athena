/*
 *
 * CariInternship reducer
 *
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux';
import {
  DEFAULT_ACTION,
} from './constants';
import applyInternshipReducer from 'containers/ApplyInternship/reducer';

const initialState = fromJS({});

function cariInternshipReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default combineReducers({
  cariInternship: cariInternshipReducer,
  applyInternship: applyInternshipReducer,
});
