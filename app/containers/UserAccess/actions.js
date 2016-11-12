/*
 *
 * UserAccess actions
 *
 */

import {
  DEFAULT_ACTION,
  SIGN_UP,
  CHANGE_INPUT,
  CHANGE_ERROR_MESSAGE,
  CREATE_STUDENT,
  FETCH_USER_DATA,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function signUp() {
  return {
    type: SIGN_UP,
  };
}

export function changeInput(path, field, value) {
  return {
    type: CHANGE_INPUT,
    path,
    field,
    value,
  };
}

export function changeErrorMessage(path, payload) {
  return {
    type: CHANGE_ERROR_MESSAGE,
    path,
    payload,
  };
}

export function createStudent(value) {
  return {
    type: CREATE_STUDENT,
    value,
  };
}

export function fetchUserData(value) {
  return {
    type: FETCH_USER_DATA,
    value,
  };
}
