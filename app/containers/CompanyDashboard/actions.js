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
  CHANGE_STATUS_CANCEL,
  CHANGE_STATUS_CONFIRM,
  CHANGE_STATUS_DONE,
  RESUME_READ,
  CHANGE_INPUT,
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

export function changeInput(label, value) {
  return {
    type: CHANGE_INPUT,
    payload: {
      label,
      value,
    },
  };
}

export function changeStatus(application, status) {
  return {
    type: CHANGE_STATUS,
    payload: {
      application,
      status,
    },
  };
}

export function changeStatusConfirm() {
  return {
    type: CHANGE_STATUS_CONFIRM,
  };
}

export function changeStatusDone() {
  return {
    type: CHANGE_STATUS_DONE,
  };
}

export function changeStatusCancel() {
  return {
    type: CHANGE_STATUS_CANCEL,
  };
}

export function openLinkedin(id) {
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
