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
  DATA_MODIFIED,
  DATA_UNMODIFIED,
} from './constants';
import { LOG_OUT } from 'containers/App/constants';

const initialState = fromJS({
  valid: true,
  modified: false,
  message: {
    firstName: '',
    lastName: '',
    headline: '',
    major: '',
    university: '',
    achievementNum: '',
    projectNum: '',
    workNum: '',
    linkedin: '',
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
      return state.set('valid', true);
    case INVALIDATE_PROFILE:
      return state.set('valid', false);
    case ADD_ERROR_MESSAGE:
      return state.set('message', action.payload);
    case DEL_ERROR_MESSAGE:
      return state.set('message', {
        firstName: '',
        lastName: '',
        headline: '',
        major: '',
        university: '',
        achievementNum: '',
        projectNum: '',
        workNum: '',
        linkedin: '',
        resume: '',
      });
    case CHANGE_USER_DATA:
      return state.set('data', action.payload);
    case DATA_MODIFIED:
      return state.set('modified', true);
    case DATA_UNMODIFIED:
      return state.set('modified', false);
    case LOG_OUT:
      return state.set('valid', true)
                  .set('modified', false)
                  .set('message', {
                    firstName: '',
                    lastName: '',
                    headline: '',
                    major: '',
                    university: '',
                    achievementNum: '',
                    projectNum: '',
                    workNum: '',
                    linkedin: '',
                    resume: '',
                  })
                  .set('data', fromJS({
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
                  }));
    default:
      return state;
  }
}

export default editProfileReducer;
