import { LOCATION_CHANGE } from 'react-router-redux';
import { userAccessSaga } from 'containers/UserAccess/sagas';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import request from 'utils/request';
import { API_COMPANIES } from 'containers/App/api';
import { loading, loadingDone } from 'containers/App/actions';
import { selectGlobal } from 'containers/App/selectors';

import { initialFetchSuccess, initialFetchFail } from './actions';
import { INITIAL_FETCH } from './constants';

export function* fetchNewApplications() {
  yield put(loading());
  const globalState = yield select(selectGlobal());
  const currentToken = globalState.currentToken;
  const currentId = globalState.id;
  const requestURL = `${API_COMPANIES}/${currentId}/applications`;
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
    yield put(initialFetchSuccess({ new_applications: fetchCall.data.applications }));
    yield put(loadingDone());
  } else {
    yield put(initialFetchFail(fetchCall.err));
    yield put(loadingDone());
  }
}

export function* fetchOldApplications() {
  yield put(loading());
  const globalState = yield select(selectGlobal());
  const currentToken = globalState.currentToken;
  const currentId = globalState.id;
  const requestURL = `${API_COMPANIES}/${currentId}/applications?new=false`;
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
    yield put(initialFetchSuccess({ applications: fetchCall.data.applications }));
    yield put(loadingDone());
  } else {
    yield put(initialFetchFail(fetchCall.err));
    yield put(loadingDone());
  }
}


export function* fetchStatistics() {
  yield put(loading());
  const globalState = yield select(selectGlobal());
  const currentToken = globalState.currentToken;
  const currentId = globalState.id;
  const requestURL = `${API_COMPANIES}/${currentId}/statistics`;
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
    yield put(initialFetchSuccess({ statistics: fetchCall.data.statistics }));
    yield put(loadingDone());
  } else {
    yield put(initialFetchFail(fetchCall.err));
    yield put(loadingDone());
  }
}


export function* fetchWatcher() {
  while (yield take(INITIAL_FETCH)) {
    yield call(fetchNewApplications);
    yield call(fetchOldApplications);
    yield call(fetchStatistics);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* companySaga() {
  // Fork watcher so we can continue execution
  const fetchSaga = yield fork(fetchWatcher);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(fetchSaga);
}

export function* companySagaContainer() {
  yield [
    fork(companySaga),
    fork(userAccessSaga),
  ];
}

// Bootstrap sagas
export default [
  companySagaContainer,
];
