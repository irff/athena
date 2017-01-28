import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOAD_DATA, LOAD_APPLIED } from './constants';
import { loading, loadingDone } from 'containers/App/actions';
import { loadDataSuccess, loadApplied, loadAppliedSuccess } from './actions';
import { selectGlobal } from 'containers/App/selectors';
import request from 'utils/request';
import { userAccessSaga } from 'containers/UserAccess/sagas';
import { APPLY } from 'containers/ApplyInternship/constants';
import selectApplyInternship from 'containers/ApplyInternship/selectors';
import { applySuccess, applyFail } from 'containers/ApplyInternship/actions';
import { API_JOBS, API_STUDENTS } from 'containers/App/api';

/**
 * Github repos request/response handler
 */
export function* loadData() {
  const globalState = yield select(selectGlobal());
  let currentToken = globalState.get('currentToken');
  let currentId = globalState.get('id');
  const requestURL = API_JOBS;
  yield put(loading());

  if (currentToken === '') {
    const name = 'token=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        currentToken = c.substring(name.length, c.length);
      }
    }
  }

  if (currentId === '') {
    const name = 'student_id=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        currentId = c.substring(name.length, c.length);
      }
    }
  }

  const auth = `Bearer ${currentToken}`;

  const loadDataCall = yield call(request, requestURL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
    },
  });

  if (!loadDataCall.err) {
    yield put(loadDataSuccess(loadDataCall.data));
    yield put(loadApplied());
    yield put(loadingDone());
  }
}

/**
 * Github repos request/response handler
 */
export function* loadAppliedCall() {
  const globalState = yield select(selectGlobal());
  let currentToken = globalState.get('currentToken');
  let currentId = globalState.get('id');
  yield put(loading());

  if (currentToken === '') {
    const name = 'token=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        currentToken = c.substring(name.length, c.length);
      }
    }
  }

  if (currentId === '') {
    const name = 'student_id=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        currentId = c.substring(name.length, c.length);
      }
    }
  }

  const auth = `Bearer ${currentToken}`;
  const requestURLValidateData = `${API_STUDENTS}${currentId}/jobs`;

  const validateDataCall = yield call(request, requestURLValidateData, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
    },
  });

  if (!validateDataCall.err) {
    yield put(loadAppliedSuccess(validateDataCall.data));
    yield put(loadingDone());
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* loadDataSaga() {
  yield takeLatest(LOAD_DATA, loadData);
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* loadAppliedSaga() {
  yield takeLatest(LOAD_APPLIED, loadAppliedCall);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* cariInternshipSaga() {
  // Fork watcher so we can continue execution
  const watcherData = yield fork(loadDataSaga);
  const watcherApplied = yield fork(loadAppliedSaga);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherData);
  yield cancel(watcherApplied);
}


/**
 * Github repos request/response handler
 */
export function* apply() {
  const globalState = yield select(selectGlobal());
  const localState = yield select(selectApplyInternship());
  const currentToken = globalState.get('currentToken');
  const currentId = globalState.get('id');
  const jobId = localState.job.item.id;
  const requestURL = `${API_STUDENTS}${currentId}/jobs`;
  const auth = `Bearer ${currentToken}`;

  const applyCall = yield call(request, requestURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    body: JSON.stringify({
      job_id: jobId,
    }),
  });

  if (!(applyCall.err === 'TypeError: Failed to fetch')) {
    yield put(loadApplied());
    yield put(applySuccess());
    yield put(loadingDone());
  } else {
    yield put(applyFail());
    yield put(loadingDone());
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* applyInternship() {
  yield takeLatest(APPLY, apply);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* applyInternshipSaga() {
  // Fork watcher so we can continue execution
  const applyInternshipWatcher = yield fork(applyInternship);
  yield take(LOCATION_CHANGE);
  yield cancel(applyInternshipWatcher);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* cariInternshipSagaFull() {
  // Fork watcher so we can continue execution
  yield [
    fork(applyInternshipSaga),
    fork(cariInternshipSaga),
    fork(userAccessSaga),
  ];
}

// Bootstrap sagas
export default [
  cariInternshipSagaFull,
];
