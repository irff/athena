import { push, LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { SUBMIT } from './constants';
import { LOG_IN_SUCCESS } from 'containers/App/constants';
import { editProfile } from 'containers/App/actions';
import { fromJS } from 'immutable';
import { isEmpty } from 'lodash';
import { validate, invalidate, addErrorMessage, delErrorMessage, changeUserData } from './actions';
import { selectGlobal } from 'containers/App/selectors';
import request from 'utils/request';
import { userAccessSaga } from 'containers/UserAccess/sagas';


/**
 * Github repos request/response handler
 */
export function* submitData(action) {
  const globalState = yield select(selectGlobal());
  const userId = globalState.get('id');
  const currentToken = globalState.get('currentToken');
  let flag = false;
  let message = {
    firstName: '',
    headline: '',
    major: '',
    university: '',
    resume: '',
  };

  if(isEmpty(action.payload.first_name)) {
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

  if(isEmpty(action.payload.resume_url)) {
    flag = true;
    message.resume = '* Resume harus diisi';
  }
  
  if(!flag) {
    yield put(delErrorMessage());
    const requestURL = `https://api.quint.id/students/${userId}`;
    const auth = `Bearer ${currentToken}`;
    const editProfileCall = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth
      },
      body: JSON.stringify(action.payload),
    });

    //if (!editProfileCall.err) {
      //yield put(logInSuccess(signupCall.data.token, loginCall.data));
      yield put(editProfile(fromJS(action.payload)));
      yield put(push('/mahasiswa/cari-internship'));
    //}
  } else {
    yield put(addErrorMessage(message));
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* submitWatcher() {
  yield takeLatest(SUBMIT, submitData);
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* dataFetchSaga(action) {
  yield put(changeUserData(action.payload));
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* dataFetchWatcher() {
  yield takeLatest(LOG_IN_SUCCESS, dataFetchSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* editProfileSaga() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(submitWatcher);
  const watcherTwo = yield fork(dataFetchWatcher);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  yield cancel(watcherTwo);
}

export function* editProfileSagaFinal() {
  yield [
    fork(editProfileSaga),
    fork(userAccessSaga),
  ];
}

// Bootstrap sagas
export default [
  editProfileSagaFinal,
];