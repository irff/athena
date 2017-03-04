import { LOCATION_CHANGE } from 'react-router-redux';
import { userAccessSaga } from 'containers/UserAccess/sagas';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import request from 'utils/request';
import { API_STUDENTS } from 'containers/App/api';
import { loading, loadingDone } from 'containers/App/actions';
import { selectGlobal } from 'containers/App/selectors';

import { initialFetchSuccess, initialFetchFail } from './actions';
import { INITIAL_FETCH } from './constants';

/**
 * Github repos request/response handler
 */
export function* fetch() {
  yield put(loading());
  const globalState = yield select(selectGlobal());
  const currentToken = globalState.currentToken;
  const currentId = globalState.id;
  const requestURL = `${API_STUDENTS}/${currentId}/jobs/detail`;
  const auth = `Bearer ${currentToken}`;

  const fetchCall = yield call(request, requestURL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
    },
  });

  if (!fetchCall.err) {
    yield put(initialFetchSuccess(fetchCall.data));
    yield put(loadingDone());
  } else {
    yield put(initialFetchFail());
    yield put(loadingDone());
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* fetchWatcher() {
  while (yield take(INITIAL_FETCH)) {
    yield call(fetch);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* mahasiswaSaga() {
  // Fork watcher so we can continue execution
  const fetchSaga = yield fork(fetchWatcher);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(fetchSaga);
}

export function* mahasiswaSagaContainer() {
  yield [
    fork(mahasiswaSaga),
    fork(userAccessSaga),
  ];
}

// Bootstrap sagas
export default [
  mahasiswaSagaContainer,
];
