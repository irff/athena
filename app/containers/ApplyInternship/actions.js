/*
 *
 * ApplyInternship actions
 *
 */

import {
  DEFAULT_ACTION,
  DISPLAY_APPLY,
  HIDE_APPLY,
  APPLY,
  APPLY_SUCCESS,
  APPLY_FAIL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function displayApply(payload) {
  return {
    type: DISPLAY_APPLY,
    payload,
  };
}

export function hideApply() {
  return {
    type: HIDE_APPLY,
  };
}

export function apply() {
  return {
    type: APPLY,
  };
}

export function applySuccess() {
  return {
    type: APPLY_SUCCESS,
  };
}

export function applyFail() {
  return {
    type: APPLY_FAIL,
  };
}
