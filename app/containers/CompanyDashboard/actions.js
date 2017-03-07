/*
 *
 * CompanyDashboard actions
 *
 */

import {
  INITIAL_FETCH,
  INITIAL_FETCH_FAIL,
  INITIAL_FETCH_SUCCESS,
  CHANGE_STATUS,
} from './constants';

export function initialFetch() {
  return {
    type: INITIAL_FETCH,
  };
}

export function initialFetchFail(payload) {
  return {
    type: INITIAL_FETCH_FAIL,
    payload,
  };
}

export function initialFetchSuccess(payload) {
  return {
    type: INITIAL_FETCH_SUCCESS,
    payload,
  };
}

export function changeStatus(id, value) {
  return {
    type: CHANGE_STATUS,
    payload: {
      id,
      value,
    },
  };
}


export function openLinkedIn(id) {
  return {
    type: CHANGE_STATUS,
    payload: {
      id,
      value: 'RESUME_REVIEWED',
    },
  };
}

export function openResume(id) {
  return {
    type: CHANGE_STATUS,
    payload: {
      id,
      value: 'RESUME_REVIEWED',
    },
  };
}
