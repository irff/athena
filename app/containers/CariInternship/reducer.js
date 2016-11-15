/*
 *
 * CariInternship reducer
 *
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux';
import {
  DEFAULT_ACTION,
  LOAD_DATA_SUCCESS,
  LOAD_APPLIED_SUCCESS,
} from './constants';
import applyInternshipReducer from 'containers/ApplyInternship/reducer';

const initialState = fromJS({
	posts: [],
	applied: [],
});

function cariInternshipReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_DATA_SUCCESS:
    	return state.set('posts', action.payload);
    case LOAD_APPLIED_SUCCESS:
    	return state.set('applied', action.payload);
    default:
      return state;
  }
}

export default combineReducers({
  cariInternship: cariInternshipReducer,
  applyInternship: applyInternshipReducer,
});
