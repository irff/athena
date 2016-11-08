/*
 *
 * ApplyInternship actions
 *
 */

import {
  DEFAULT_ACTION,
  DISPLAY_APPLY,
  HIDE_APPLY,
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
