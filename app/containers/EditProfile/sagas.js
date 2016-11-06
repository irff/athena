

import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { SUBMIT } from './constants';

/**
 * Github repos request/response handler
 */
export function* submitData(action) {
  console.log(action.payload);
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* submitWatcher() {
  yield takeLatest(SUBMIT, submitData);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* editProfileSaga() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(submitWatcher);
}

// Bootstrap sagas
export default [
  editProfileSaga,
];