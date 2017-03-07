import { LOCATION_CHANGE } from 'react-router-redux';
import { userAccessSaga } from 'containers/UserAccess/sagas';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import request from 'utils/request';
import { API_COMPANIES } from 'containers/App/api';
import { loading, loadingDone } from 'containers/App/actions';
import { selectGlobal } from 'containers/App/selectors';
import selectCompanyDashboard from './selectors';
import { initialFetchSuccess, initialFetchFail, changeStatusDone } from './actions';
import { INITIAL_FETCH, RESUME_READ, CHANGE_STATUS_CONFIRM } from './constants';

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

export function* resumeReviewed(applicationId) {
  const globalState = yield select(selectGlobal());
  const currentToken = globalState.currentToken;
  const currentId = globalState.id;
  const requestURL = `${API_COMPANIES}/${currentId}/applications/${applicationId}/resume-read`;
  const auth = `Bearer ${currentToken}`;

  yield call(request, requestURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
    },
  });
}

export function* statusChanged() {
  const globalState = yield select(selectGlobal());
  const currentToken = globalState.currentToken;
  const currentId = globalState.id;
  const currentState = yield select(selectCompanyDashboard());
  const applicationId = currentState.selectedApplication.application_id;
  const status = currentState.selectedStatus;
  const { emailSubject, emailContent } = currentState.inputs;
  const requestURL = `${API_COMPANIES}/${currentId}/applications/${applicationId}/status`;
  const auth = `Bearer ${currentToken}`;

  if (status === 'REJECTED') {
    yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth,
      },
      body: JSON.stringify({
        status,
        email_rejected_subject: emailSubject,
        email_rejected_content: emailContent,
      }),
    });
  } else {
    yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth,
      },
      body: JSON.stringify({
        status,
        email_rejected_subject: '',
        email_rejected_content: '',
      }),
    });
  }

  yield put(changeStatusDone());
}

export function* fetchWatcher() {
  while (yield take(INITIAL_FETCH)) {
    yield call(fetchNewApplications);
    yield call(fetchOldApplications);
    yield call(fetchStatistics);
  }
}

export function* resumeWatcher() {
  let action;
  while (action = yield take(RESUME_READ)) { // eslint-disable-line no-cond-assign
    yield call(resumeReviewed, action.payload);
  }
}

export function* statusWatcher() {
  while (yield take(CHANGE_STATUS_CONFIRM)) {
    yield call(statusChanged);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* companySaga() {
  // Fork watcher so we can continue execution
  const fetchSaga = yield fork(fetchWatcher);
  const resumeSaga = yield fork(resumeWatcher);
  const statusSaga = yield fork(statusWatcher);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(fetchSaga);
  yield cancel(resumeSaga);
  yield cancel(statusSaga);
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
