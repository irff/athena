/*
 *
 * CompanyProfileEdit reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INPUT_CHANGE,
  SAVE,
  SAVE_FAIL,
  SAVE_SUCCESS,
  LOAD,
  LOAD_FAIL,
  LOAD_SUCCESS,
} from './constants';

const initialState = fromJS({
  name: '',
  category: '',
  logo: '',
  header: '',
  site: '',
  description: '',
  isSaving: false,
  isLoading: false,
  isNew: false,
  error: null,
});

function companyProfileEditReducer(state = initialState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return state.set(action.payload.label, action.payload.data);
    case SAVE:
      return state.set('isSaving', true);
    case SAVE_FAIL:
      return state.set('isSaving', false).set('error', action.payload);
    case SAVE_SUCCESS:
      return state.set('isSaving', true).set('error', null);
    case LOAD:
      return state.set('isLoading', true);
    case LOAD_FAIL:
      return state.set('isLoading', false).set('error', action.payload);
    case LOAD_SUCCESS:
      return state
        .set('isLoading', false)
        .merge(action.payload);
    default:
      return state;
  }
}

export default companyProfileEditReducer;
