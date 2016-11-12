/*
 *
 * App actions
 *
 */

import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  LOG_OUT,
  ADD_TOKEN,
  EDIT_PROFILE,
  LOADING,
  LOADING_DONE,
} from './constants';

export function logIn() {
  return {
    type: LOG_IN,
  };
}

export function logInSuccess(payload, token) {
  return {
    type: LOG_IN_SUCCESS,
    payload
  };
}

export function logOut() {
  return {
    type: LOG_OUT,
  };
}

export function addToken(payload) {
  return {
    type: ADD_TOKEN,
    payload
  };
}

export function editProfile(payload) {
  return {
    type: EDIT_PROFILE,
    payload
  };
}

export function loading() {
  return {
    type: LOADING,
  };
}

export function loadingDone() {
  return {
    type: LOADING_DONE,
  };
}
