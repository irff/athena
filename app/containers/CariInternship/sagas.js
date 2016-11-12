import { push } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOAD_DATA } from './constants';
import { editProfile } from 'containers/App/actions';
import { fromJS } from 'immutable';
import { isEmpty } from 'lodash';
import { loadDataSuccess } from './actions';
import { selectGlobal } from 'containers/App/selectors';
import { applyInternshipSaga } from 'containers/ApplyInternship/sagas';
import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* loadData(action) {
  const globalState = yield select(selectGlobal());
  const currentToken = globalState.get('currentToken');
  const requestURL = `http://localhost:5000/jobs`;
  const auth = `Bearer ${currentToken}`;

  const loadDataCall = yield call(request, requestURL, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': auth
    }
  });

  if (!loadDataCall.err) {
    yield put(loadDataSuccess(loadDataCall.data));
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* cariInternship() {
  yield takeLatest(LOAD_DATA, loadData);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* cariInternshipSaga() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(cariInternship);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* cariInternshipSagaFull() {
  // Fork watcher so we can continue execution
  yield [
    fork(applyInternshipSaga),
    fork(cariInternshipSaga),
  ];
}



// Bootstrap sagas
export default [
  cariInternshipSagaFull,
];