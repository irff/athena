/*
 *
 * CompanyDashboard reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INITIAL_FETCH_SUCCESS,
  INITIAL_FETCH_FAIL,
  CHANGE_STATUS,
} from './constants';

const initialState = fromJS({
  new_applications: [],
  applications: [],
  statistics: [],
  error: null,
});

function companyDashboardReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_STATUS:
      return state;
    case INITIAL_FETCH_SUCCESS:
      return state.merge(fromJS(action.payload));
    case INITIAL_FETCH_FAIL:
      return state.set('error', action.payload);
    default:
      return state;
  }
}

export default companyDashboardReducer;
