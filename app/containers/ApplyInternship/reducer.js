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
  job: {
    company: {
      background_img_url: '',
      category: '',
      company_address: '',
      logo_url: '',
      name: '',
      website: '',
    },
    contact_person: {
      email: '',
      name: '',
      phone: '',
      role: '',
    },
    created_at: '',
    experiences_gained: [],
    id: '',
    job_schedule: {
      end_at: '',
      start_at: '',
    },
    job_type: '',
    role: '',
    salary: {
      currency: '',
      fee: {
        maximal: 0,
        minimal: 0,
      },
      term: '',
    },
    skills_gained: [],
    tasks: [],
    technical_requirements: [],
    why_us: '',
  },
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
