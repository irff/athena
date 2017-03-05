/*
 *
 * CreateJobPost actions
 *
 */

import {
  INPUT_CHANGE,
  REVIEW_START,
  REVIEW_CANCEL,
  SUBMIT,
  SUBMIT_FAIL,
  SUBMIT_SUCCESS,
  UPDATE_ERRORS,
} from './constants';

export function inputChange(label, value) {
  return {
    type: INPUT_CHANGE,
    payload: {
      label,
      value,
    },
  };
}

export function review() {
  return {
    type: REVIEW_START,
  };
}

export function cancelReview() {
  return {
    type: REVIEW_CANCEL,
  };
}

export function submit() {
  return {
    type: SUBMIT,
  };
}

export function submitFail(payload) {
  return {
    type: SUBMIT_FAIL,
    payload,
  };
}

export function submitSuccess() {
  return {
    type: SUBMIT_SUCCESS,
  };
}

export function updateErrors(payload) {
  return {
    type: UPDATE_ERRORS,
    payload,
  };
}