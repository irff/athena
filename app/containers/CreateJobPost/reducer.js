/*
 *
 * CreateJobPost reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INPUT_CHANGE,
  REVIEW_START,
  REVIEW_CANCEL,
  SUBMIT,
  SUBMIT_FAIL,
  SUBMIT_SUCCESS,
  UPDATE_ERRORS,
} from './constants';

const initialState = fromJS({
  role: '',
  category: '',
  location: '',
  job_schedule: {
    start_at: '',
    end_at: '',
  },
  salary: {
    fee: {
      minimal: 0,
      maximal: 0,
    },
    currency: 'IDR',
    term: 'hari',
    isHidden: false,
  },
  technical_requirements: [],
  tasks: [],
  experiences_gained: [],
  status: [],
  isReviewing: false,
  isSubmitting: false,
  isSubmitted: false,
  validationErrors: {},
  error: null,
});

function createJobPostReducer(state = initialState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return state.setIn(action.payload.label.split('.'), action.payload.value);
    case REVIEW_START:
      return state.set('isReviewing', true);
    case REVIEW_CANCEL:
      return state.set('isReviewing', false);
    case SUBMIT:
      return state.set('isSubmitting', true);
    case SUBMIT_FAIL:
      return state.set('isSubmitting', false).set('error', action.payload);
    case SUBMIT_SUCCESS:
      return state.set('isSubmitting', false).set('error', null).set('isSubmitted', true);
    case UPDATE_ERRORS:
      return state.set('validationErrors', action.payload);
    default:
      return state;
  }
}

export default createJobPostReducer;
