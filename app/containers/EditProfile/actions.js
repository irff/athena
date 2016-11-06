/*
 *
 * EditProfile actions
 *
 */

import {
  SUBMIT,
} from './constants';

export function submit(payload) {
  return {
    type: SUBMIT,
    payload
  };
}
