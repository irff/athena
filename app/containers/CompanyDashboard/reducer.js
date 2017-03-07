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
  CHANGE_STATUS_DONE,
  CHANGE_STATUS_CANCEL,
  CHANGE_INPUT,
} from './constants';

const initialState = fromJS({
  new_applications: [],
  applications: [],
  statistics: [],
  selectedApplication: {},
  inputs: {
    emailSubject: '',
    emailContent: '',
  },
  selectedStatus: '',
  emailSubject: '',
  emailContent: '',
  isChangingStatus: false,
  isRejecting: false,
  error: null,
});

function companyDashboardReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return state.setIn(`inputs.${action.payload.label}`.split('.'), action.payload.value);
    case CHANGE_STATUS:
      if (action.payload.status === 'REJECTED') {
        return state
          .set('isRejecting', true)
          .set('selectedApplication', action.payload.application)
          .set('selectedStatus', action.payload.status);
      }

      return state
        .set('isChangingStatus', true)
        .set('selectedStatus', action.payload.status)
        .set('selectedApplication', action.payload.application);

    case CHANGE_STATUS_CANCEL:
      return state
        .set('isChangingStatus', false)
        .set('isRejecting', false)
        .set('selectedStatus', '')
        .set('selectedApplication', {});

    case CHANGE_STATUS_DONE: {
      const applicationId = state.get('selectedApplication').application_id;
      const selectedStatus = state.get('selectedStatus');
      const applications = state
        .get('applications')
        .toJS()
        .map(job => ({ ...job,
          applicants: job.applicants.map(item => {
            const ret = item;
            if (item.application_id === applicationId) {
              ret.status = selectedStatus;
            }
            return ret;
          }),
        }));
      const newApplications = state
        .get('new_applications')
        .toJS()
        .map(job => ({ ...job,
          applicants: job.applicants.map(item => {
            const ret = item;
            if (item.application_id === applicationId) {
              ret.status = selectedStatus;
            }
            return ret;
          }),
        }));

      return state
        .set('applications', fromJS(applications))
        .set('new_applications', fromJS(newApplications))
        .set('isChangingStatus', false)
        .set('isRejecting', false)
        .set('selectedStatus', '')
        .set('selectedApplication', {});
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
