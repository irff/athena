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
    default:
      return state;
  }
}

export default editProfileReducer;
