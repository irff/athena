/*
 *
 * App actions
 *
 */

import {
  LOG_IN_STUDENT,
  LOG_IN_SUCCESS_STUDENT,
  LOG_IN_COMPANY,
  LOG_IN_SUCCESS_COMPANY,
  LOG_OUT,
  ADD_TOKEN,
  EDIT_PROFILE,
  LOADING,
  LOADING_DONE,
} from './constants';

export function logInStudent() {
  return {
    type: LOG_IN_STUDENT,
  };
}

export function logInSuccessStudent(token, id, payload) {
  return {
    type: LOG_IN_SUCCESS_STUDENT,
    token,
    id,
    payload,
  };
}

export function logInCompany() {
  return {
    type: LOG_IN_COMPANY,
  };
}

export function logInSuccessCompany(token, id, payload) {
  return {
    type: LOG_IN_SUCCESS_COMPANY,
    token,
    id,
    payload,
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
    payload,
  };
}

export function editProfile(payload) {
  return {
    type: EDIT_PROFILE,
    payload,
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
