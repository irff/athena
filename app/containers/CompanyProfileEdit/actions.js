/*
 *
 * CompanyProfileEdit actions
 *
 */

import {
  INPUT_CHANGE,
  SAVE,
  SAVE_FAIL,
  SAVE_SUCCESS,
  LOAD,
  LOAD_FAIL,
  LOAD_SUCCESS,
} from './constants';

export function inputChange(label, data) {
  return {
    type: INPUT_CHANGE,
    payload: {
      label,
      data,
    },
  };
}

export function save() {
  return {
    type: SAVE,
  };
}

export function saveFail(payload) {
  return {
    type: SAVE_FAIL,
    payload,
  };
}

export function saveSuccess() {
  return {
    type: SAVE_SUCCESS,
  };
}

export function load() {
  return {
    type: LOAD,
  };
}

export function loadFail(payload) {
  return {
    type: LOAD_FAIL,
    payload,
  };
}

export function loadSuccess(payload) {
  return {
    type: LOAD_SUCCESS,
    payload,
  };
}
