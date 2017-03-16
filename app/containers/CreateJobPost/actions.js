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
  FETCH,
  FETCH_CATEGORIES_SUCCESS,
  DONE,
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

export function done() {
  return {
    type: DONE,
  };
}

export function fetch() {
  return {
    type: FETCH,
  };
}

export function fetchCategoriesSuccess(payload) {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload,
  };
}
