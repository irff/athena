/*
 *
 * ApplyInternship reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DISPLAY_APPLY,
  HIDE_APPLY,
} from './constants';

const initialState = fromJS({
  visibility: false,
  job: fromJS({}),
});

function applyInternshipReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_APPLY:
      return state.set('job', action.payload).set('visibility', true);
    case HIDE_APPLY:
      return state.set('visibility', false);
    default:
      return state;
  }
}

export default applyInternshipReducer;
