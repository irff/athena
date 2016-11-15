/*
 *
 * ApplyInternship reducer
 *
 */

import { fromJS } from 'immutable';
import {
  VALIDATE_PROFILE,
  INVALIDATE_PROFILE,
  ADD_ERROR_MESSAGE,
  DEL_ERROR_MESSAGE,
  CHANGE_USER_DATA,
} from './constants';

const initialState = fromJS({
  valid: true,
  message: {
    firstName: '',
    headline: '',
    major: '',
    university: '',
    resume: '',
  },
  data: fromJS({
    first_name: '',
    last_name: '',
    headline: '',
    major: '',
    university: '',
    experiences: {
      achievement_num: '',
      project_num: '',
      work_num: '',
    },
    linkedin_url: '',
    resume_url: '',
  }),
});

function editProfileReducer(state = initialState, action) {
  switch (action.type) {
    case VALIDATE_PROFILE:
      return state.set('valid',true);
    case INVALIDATE_PROFILE:
      return state.set('valid',false);
    case ADD_ERROR_MESSAGE:
      return state.set('message', action.payload);
    case DEL_ERROR_MESSAGE:
      return state.set('message', {
                                    firstName: '',
                                    headline: '',
                                    major: '',
                                    university: '',
                                    resume: '',
                                  });
    case CHANGE_USER_DATA:
      return state.set('data', action.payload);
    default:
      return state;
  }
}

export default editProfileReducer;
