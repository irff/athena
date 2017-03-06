import { push, LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { SUBMIT } from './constants';
import { LOG_IN_SUCCESS_STUDENT } from 'containers/App/constants';
import { editProfile } from 'containers/App/actions';
import { fromJS } from 'immutable';
import { isEmpty } from 'lodash';
import { addErrorMessage, delErrorMessage, changeUserData, dataUnmodified } from './actions';
import { selectGlobal } from 'containers/App/selectors';
import request from 'utils/request';
import { API_STUDENTS } from 'containers/App/api';

/**
 * Github repos request/response handler
 */
export function* submitData(action) {
  const globalState = yield select(selectGlobal());
  const userId = globalState.id;
  const currentToken = globalState.currentToken;
  const regexUrl = (/^(ftp|http|https):\/\/[^ "]+$/);

  let flag = false;
  const message = {
    firstName: '',
    lastName: '',
    headline: '',
    major: '',
    university: '',
    achievementNum: '',
    projectNum: '',
    workNum: '',
    linkedin: '',
    resume: '',
  };

  if (isEmpty(action.payload.first_name) || action.payload.first_name === 'iniDefaultEntryQuint') {
    flag = true;
    message.firstName = '* Nama depan harus diisi';
  }

  if (isEmpty(action.payload.headline) || action.payload.headline === 'iniDefaultEntryQuint') {
    flag = true;
    message.headline = '* Headline Profile harus diisi';
  }

  if (isEmpty(action.payload.major) || action.payload.major === 'iniDefaultEntryQuint') {
    flag = true;
    message.major = '* Jurusan harus diisi';
  }

  if (isEmpty(action.payload.university) || action.payload.university === 'iniDefaultEntryQuint') {
    flag = true;
    message.university = '* Universitas harus diisi';
  }

  if (isEmpty(action.payload.resume_url) || action.payload.resume_url === 'http://iniDefaultEntryQui.nt' || action.payload.resume_url === '' || action.payload.resume_url === null) {
    flag = true;
    message.resume = '* Resume harus diisi';
  }

  if (!regexUrl.test(action.payload.resume_url)) {
    flag = true;
    message.resume = 'Link resume tidak valid, Harus dimulai dengan http:// atau https://';
  }

  if (!isEmpty(action.payload.linkedin_url) && action.payload.linkedin_url !== '' && action.payload.linkedin_url !== null && !regexUrl.test(action.payload.linkedin_url)) {
    flag = true;
    message.linkedin = 'Link LinkedIn tidak valid, Harus dimulai dengan http:// atau https://';
  }

  if (isNaN(action.payload.experiences.achievement_num) || action.payload.experiences.achievement_num < 0) {
    flag = true;
    message.achievementNum = 'Jumlah harus diisi dalam bentuk angka tidak negatif';
  }

  if (isNaN(action.payload.experiences.project_num) || action.payload.experiences.project_num < 0) {
    flag = true;
    message.projectNum = 'Jumlah harus diisi dalam bentuk angka tidak negatif';
  }

  if (isNaN(action.payload.experiences.work_num) || action.payload.experiences.work_num < 0) {
    flag = true;
    message.workNum = 'Jumlah harus diisi dalam bentuk angka tidak negatif';
  }

  if (!flag) {
    yield put(delErrorMessage());
    const requestURL = `${API_STUDENTS}/${userId}`;
    const auth = `Bearer ${currentToken}`;

    yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth,
      },
      body: JSON.stringify(action.payload),
    });

    yield put(dataUnmodified());
    yield put(editProfile(fromJS(action.payload)));
    yield put(push('/mahasiswa/cari-internship'));
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
  yield takeLatest(LOG_IN_SUCCESS_STUDENT, dataFetchSaga);
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

// Bootstrap sagas
export default [
  editProfileSaga,
];
