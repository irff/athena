/*
 *
 * CariInternship actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_APPLIED,
  LOAD_APPLIED_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadData() {
  return {
    type: LOAD_DATA,
  };
}

export function loadDataSuccess(payload) {
  return {
    type: LOAD_DATA_SUCCESS,
    payload,
  };
}

export function loadApplied() {
  return {
    type: LOAD_APPLIED,
  };
}

export function loadAppliedSuccess(payload) {
  return {
    type: LOAD_APPLIED_SUCCESS,
    payload,
  };
}
