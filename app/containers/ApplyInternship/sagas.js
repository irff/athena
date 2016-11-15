import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { take, call, select, cancel, fork } from 'redux-saga/effects';
import { APPLY } from './constants';
import { selectGlobal } from 'containers/App/selectors';
import selectApplyInternship from './selectors';
import request from 'utils/request';
import { userAccessSaga } from 'containers/UserAccess/sagas';

/**
 * Github repos request/response handler
 */
export function* apply() {
  const globalState = yield select(selectGlobal());
  const localState = yield select(selectApplyInternship());
  const currentToken = globalState.get('currentToken');
  const currentId = globalState.get('id');
  const jobId = localState.job.item.id;
  const requestURL = `https://api.quint.id/students/${currentId}/jobs`;
  const auth = `Bearer ${currentToken}`;
  
  yield call(request, requestURL, {
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
}

export function* applyInternshipSagaFull() {
  yield [
    fork(applyInternshipSaga),
    fork(userAccessSaga),
  ];
}

// Bootstrap sagas
export default [
  applyInternshipSagaFull,
];
