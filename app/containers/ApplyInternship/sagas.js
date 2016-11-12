import { push } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { APPLY } from './constants';
import { fromJS } from 'immutable';
import { isEmpty } from 'lodash';
import { selectGlobal } from 'containers/App/selectors';
import selectApplyInternship from './selectors';
import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* apply(action) {
  const globalState = yield select(selectGlobal());
  const localState = yield select(selectApplyInternship());
  const currentToken = globalState.get('currentToken');
  const currentId = globalState.get('id');
  const jobId = localState.job.item.job_id;
  const requestURL = `http://localhost:5000/${currentId}/jobs`;
  const auth = `Bearer ${currentToken}`;

  const applyCall = yield call(request, requestURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': auth
    },
    body: JSON.stringify({
    	job_id: jobId
    })
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
  const watcher = yield fork(applyInternship);
}

// Bootstrap sagas
export default [
  applyInternshipSaga,
];