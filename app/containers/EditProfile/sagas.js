

import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { SUBMIT } from './constants';
import { editProfile } from 'containers/App/actions';
import { fromJS } from 'immutable';

/**
 * Github repos request/response handler
 */
export function* submitData(action) {
  if(action.payload.firstName && action.payload.lastName && action.payload.highlight && action.payload.major && action.payload.university && action.payload.resume) {
  	action.payload.valid = true;

  	yield put(editProfile(fromJS(action.payload)));
  }
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