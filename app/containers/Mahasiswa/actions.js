/*
 *
 * Mahasiswa actions
 *
 */

import {
  DEFAULT_ACTION,
  INITIAL_FETCH,
  INITIAL_FETCH_SUCCESS,
  INITIAL_FETCH_FAIL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function initialFetch() {
  return {
    type: INITIAL_FETCH,
  };
}

export function initialFetchSuccess(payload) {
  return {
    type: INITIAL_FETCH_SUCCESS,
    payload,
  };
}

export function initialFetchFail() {
  return {
    type: INITIAL_FETCH_FAIL,
  };
}
