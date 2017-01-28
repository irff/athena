/*
 *
 * ApplyInternship reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DISPLAY_APPLY,
  HIDE_APPLY,
  APPLY_SUCCESS,
  APPLY_FAIL,
} from './constants';

const initialState = fromJS({
  visibility: false,
  success: false,
  fail: false,
  job: fromJS({}),
});

function applyInternshipReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_APPLY:
      return state.set('job', action.payload).set('success', false).set('fail', false).set('visibility', true);
    case HIDE_APPLY:
      return state.set('visibility', false);
    case APPLY_SUCCESS:
      return state.set('fail', false).set('success', true);
    case APPLY_FAIL:
      return state.set('success', false).set('fail', true);
    default:
      return state;
  }
}

export default applyInternshipReducer;
