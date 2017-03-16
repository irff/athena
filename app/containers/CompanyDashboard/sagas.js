import { LOCATION_CHANGE } from 'react-router-redux';
import { userAccessSaga } from 'containers/UserAccess/sagas';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import request from 'utils/request';
import { API_COMPANIES } from 'containers/App/api';
import { loading, loadingDone } from 'containers/App/actions';
import { selectGlobal } from 'containers/App/selectors';
import selectCompanyDashboard from './selectors';
import { initialFetchSuccess, initialFetchFail, changeStatusDone, changeInput } from './actions';
import { INITIAL_FETCH, RESUME_READ, CHANGE_STATUS, CHANGE_STATUS_CONFIRM } from './constants';

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

export function* prefillContent() {
  const globalState = yield select(selectGlobal());
  const userData = globalState.userData;
  const currentState = yield select(selectCompanyDashboard());
  const application = currentState.selectedApplication;
  const student = application.student;
  const role = currentState.selectedRole;
  /* eslint-disable quotes */
  /* eslint-disable quote-props */
  /* eslint-disable comma-dangle */
  const status = [
    {
      "text": "preview",
      "value": "WAIT_FOR_REVIEW"
    },
    {
      "text": "review",
      "value": "RESUME_REVIEWED"
    },
    {
      "text": "penolakan",
      "value": "REJECTED"
    },
    {
      "text": "penerimaan",
      "value": "ACCEPTED"
    },
    {
      "text": "phone interview",
      "value": "WAIT_FOR_PHONE"
    },
    {
      "text": "review phone interview",
      "value": "PHONE_REVIEWED"
    },
    {
      "text": "online test",
      "value": "WAIT_FOR_ONLINE_TEST"
    },
    {
      "text": "review online test",
      "value": "ONLINE_TEST_REVIEWED"
    },
    {
      "text": "task submission",
      "value": "WAIT_FOR_SUBMISSION"
    },
    {
      "text": "review task submission",
      "value": "SUBMISSION_REVIEWED"
    },
    {
      "text": "on-site interview",
      "value": "WAIT_FOR_ONSITE_TEST"
    },
    {
      "text": "review on-site interview",
      "value": "ONSITE_TEST_REVIEWED"
    }
  ];
  /* eslint-enable quotes */
  /* eslint-enable quote-props */
  /* eslint-enable comma-dangle */
  let statusText = status.find(e => e.value === application.status).text;
  if (statusText === 'pilih status') statusText = 'review';
  const template = `Dear ${student.first_name} ${student.last_name},

Setelah melewati proses ${statusText}, kami memutuskan untuk tidak melanjutkan kamu ke tahap berikutnya karena pengalaman dan kemampuan yang kamu miliki belum memenuhi kriteria kami.

Adapun beberapa saran dari kami antara lain:

kenali lebih dalam tentang ${userData.name}
pelajari studi kasus yang mungkin akan ditanyakan sebagai ${role}
perdalam pengalaman kamu untuk mendaftar sebagai ${role}
Silakan pantau terus posisi yang kami buka yang mungkin saja kamu minati. Semoga sukses pada pencarian kerja selanjutnya.

Terima kasih.

Salam,
Tim Recruiter ${userData.name}
`;

  yield put(changeInput('emailContent', template));
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

export function* prefillWatcher() {
  let action;
  while (action = yield take(CHANGE_STATUS)) { // eslint-disable-line no-cond-assign
    if (action.payload.status === 'REJECTED') {
      yield call(prefillContent);
    }
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
  const prefillSaga = yield fork(prefillWatcher);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(fetchSaga);
  yield cancel(resumeSaga);
  yield cancel(statusSaga);
  yield cancel(prefillSaga);
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
