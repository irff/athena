

import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { SUBMIT } from './constants';
import { editProfile } from 'containers/App/actions';
import { fromJS } from 'immutable';
import { isEmpty } from 'lodash';
import { validate, invalidate, addErrorMessage, delErrorMessage } from './actions';
import selectEditProfile from './selectors';

/**
 * Github repos request/response handler
 */
export function* submitData(action) {
  let flag = false;
  let message = {
    firstName: '',
    headline: '',
    major: '',
    university: '',
    resume: '',
  };

  if(isEmpty(action.payload.firstName)) {
    flag = true;
    message.firstName = '* Nama depan harus diisi';
  }

  if(isEmpty(action.payload.headline)) {
    flag = true;
    message.headline = '* Headline Profile harus diisi';
  }

  if(isEmpty(action.payload.major)) {
    flag = true;
    message.major = '* Jurusan harus diisi';
  }

  if(isEmpty(action.payload.university)) {
    flag = true;
    message.university = '* Universitas harus diisi';
  }

  if(isEmpty(action.payload.resume)) {
    flag = true;
    message.resume = '* Resume harus diisi';
  }

  if(!flag) {
    action.payload.valid = true;

    yield put(delErrorMessage());
    yield put(invalidate());
    yield put(editProfile(fromJS(action.payload)));
  } else {
    yield put(addErrorMessage(message));
    yield put(validate());
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