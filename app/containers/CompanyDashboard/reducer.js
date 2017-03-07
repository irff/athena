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
  RESUME_READ,
} from './constants';

const initialState = fromJS({
  new_applications: [],
  applications: [],
  statistics: [],
  error: null,
});

function companyDashboardReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_STATUS: {
      const applications = state
        .get('applications')
        .map(item => {
          const ret = item;
          if (item.id === action.payload.id) {
            ret.status = action.payload.value;
          }

          return ret;
        });

      return state.set('applications', applications);
    }
    case RESUME_READ: {
      const applications = state
        .get('applications')
        .map(item => {
          const ret = item;
          if (item.id === action.payload) {
            ret.status = 'RESUME_REVIEWED';
          }

          return ret;
        });

      return state.set('applications', applications);
    }
    case INITIAL_FETCH_SUCCESS:
      return state.merge(fromJS(action.payload));
    case INITIAL_FETCH_FAIL:
      return state.set('error', action.payload);
    default:
      return state;
  }
}

export default companyDashboardReducer;
