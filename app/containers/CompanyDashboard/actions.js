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
  RESUME_READ,
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
    type: RESUME_READ,
    payload: id,
  };
}

export function openResume(id) {
  return {
    type: RESUME_READ,
    payload: id,
  };
}
