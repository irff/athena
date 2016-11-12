/*
 *
 * CariInternship actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
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
