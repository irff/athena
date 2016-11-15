/*
 *
 * EditProfile actions
 *
 */

import {
  SUBMIT,
  VALIDATE_PROFILE,
  INVALIDATE_PROFILE,
  ADD_ERROR_MESSAGE,
  DEL_ERROR_MESSAGE,
  CHANGE_USER_DATA,
} from './constants';

export function submit(payload) {
  return {
    type: SUBMIT,
    payload
  };
}

export function validate() {
  return {
    type: VALIDATE_PROFILE
  };
}

export function invalidate() {
  return {
    type: INVALIDATE_PROFILE
  };
}

export function addErrorMessage(payload) {
  return {
    type: ADD_ERROR_MESSAGE,
    payload
  };
}

export function delErrorMessage() {
  return {
    type: DEL_ERROR_MESSAGE
  };
}


export function changeUserData(payload) {
  return {
    type: CHANGE_USER_DATA,
    payload
  };
}

