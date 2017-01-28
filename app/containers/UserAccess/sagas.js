import { push, LOCATION_CHANGE } from 'react-router-redux';
import { take, call, put, select, fork, cancel, actionChannel } from 'redux-saga/effects';
import { LOG_IN } from 'containers/App/constants';
import { SIGN_UP, CREATE_STUDENT, FETCH_USER_DATA } from './constants';
import { changeErrorMessage, createStudent, fetchUserData } from './actions';
import selectUserAccess from './selectors';
import { loading, loadingDone, logInSuccess } from 'containers/App/actions';
import request from 'utils/request';
import { API_STUDENTS } from 'containers/App/api';

export function* logIn() {
  const currentState = yield select(selectUserAccess());
  const requestURL = `${API_STUDENTS}login`;

  const errMessage = {
    email: '',
    pass: '',
    error: '',
  };
  let errFlag = false;

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!currentState.lg.email || !re.test(currentState.lg.email)) {
    errFlag = true;
    errMessage.email = 'Email tidak valid.';
  }

  if (!currentState.lg.pass) {
    errFlag = true;
    errMessage.pass = 'Password tidak boleh kosong';
  }

  if (!errFlag) {
    yield put(loading());
    const loginCall = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: currentState.lg.email,
        password: currentState.lg.pass,
        remember: currentState.lg.remember === 1,
      }),
    });

    if (!loginCall.err) {
      yield put(changeErrorMessage('lg', errMessage));
      yield put(fetchUserData({ token: loginCall.data.token, student_id: loginCall.data.student_id }));
    } else {
      errMessage.error = 'Login gagal';
      yield put(changeErrorMessage('lg', errMessage));
      yield put(loadingDone());
    }
  } else {
    yield put(changeErrorMessage('lg', errMessage));
  }
}

export function* logInWatcher() {
  while (yield take(LOG_IN)) {
    yield call(logIn);
  }
}

export function* signUp() {
  const currentState = yield select(selectUserAccess());
  const requestURL = `${API_STUDENTS}register`;

  const errMessage = {
    email: '',
    pass: '',
    confPass: '',
    error: '',
  };
  let errFlag = false;

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!currentState.su.email || !re.test(currentState.su.email)) {
    errFlag = true;
    errMessage.email = 'Email tidak valid.';
  }

  if (!currentState.su.pass) {
    errFlag = true;
    errMessage.pass = 'Password tidak boleh kosong';
  }

  if (currentState.su.pass.length < 6) {
    errFlag = true;
    errMessage.pass = 'Password harus lebih dari 6 karakter';
  }

  if (currentState.su.confPass !== currentState.su.pass) {
    errFlag = true;
    errMessage.confPass = 'Password tidak sama';
  }

  if (!currentState.su.confPass) {
    errFlag = true;
    errMessage.confPass = 'Konfirmasi Password tidak boleh kosong';
  }

  yield put(changeErrorMessage('su', errMessage));

  if (!errFlag) {
    yield put(loading());
    const signupCall = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: currentState.su.email,
        password: currentState.su.pass,
      }),
    });

    if (!signupCall.err) {
      yield put(createStudent(signupCall.data.token));
    } else {
      errMessage.error = 'Sign Up gagal';
      yield put(changeErrorMessage('su', errMessage));
    }
  }
}

export function* signUpWatcher() {
  while (yield take(SIGN_UP)) {
    yield call(signUp);
  }
}

export function* crStudent(value) {
  const currentState = yield select(selectUserAccess());
  const requestURL = API_STUDENTS;

  const errMessage = {
    email: '',
    pass: '',
    confPass: '',
    error: '',
  };

  const auth = `Bearer ${value}`;

  const createStudentCall = yield call(request, requestURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    body: JSON.stringify({
      first_name: currentState.su.email.split('@')[0],
      major: 'iniDefaultEntryQuint',
      university: 'iniDefaultEntryQuint',
      resume_url: 'http://iniDefaultEntryQui.nt',
      headline: 'iniDefaultEntryQuint',
    }),
  });

  if (!createStudentCall.err) {
    yield call(autoLogInAfterCreated);
  } else {
    errMessage.error = 'Sign Up gagal';
    yield put(changeErrorMessage('su', errMessage));
  }
}

export function* autoLogInAfterCreated() {
  const currentState = yield select(selectUserAccess());
  const requestURL = `${API_STUDENTS}login`;

  const errMessage = {
    email: '',
    pass: '',
    confPass: '',
    error: '',
  };

  const loginCall = yield call(request, requestURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: currentState.su.email,
      password: currentState.su.pass,
      remember: false,
    }),
  });

  if (!loginCall.err) {
    yield put(changeErrorMessage('su', errMessage));
    yield put(fetchUserData({ token: loginCall.data.token, student_id: loginCall.data.student_id }));
  } else {
    errMessage.error = 'Signup gagal!';
    yield put(changeErrorMessage('su', errMessage));
    yield put(loadingDone());
  }
}

export function* fetchUserDataSaga(data) {
  const requestURL = `${API_STUDENTS}${data.student_id}`;
  const auth = `Bearer ${data.token}`;

  const fetchDataCall = yield call(request, requestURL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
    },
  });

  const d = new Date();
  d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;

  if (!fetchDataCall.err) {
    yield put(logInSuccess(data.token, data.student_id, fetchDataCall.data));
    yield put(loadingDone());

    /* set cookies */
    document.cookie = `token=${data.token};expires=${expires};path=/`;
    document.cookie = `student_id=${data.student_id};expires=${expires};path=/`;
    /* redirect */
    if (window.location.pathname.endsWith('/login') || window.location.pathname.endsWith('/login/') || window.location.pathname.endsWith('/signup') || window.location.pathname.endsWith('/signup/')) {
      yield put(push('/mahasiswa/cari-internship'));
    }
  } else {
    if (window.location.pathname.endsWith('/login') || window.location.pathname.endsWith('/login/')) {
      yield put(changeErrorMessage('lg', { email: '', pass: '', error: 'Log In gagal' }));
    } else {
      yield put(changeErrorMessage('su', { email: '', pass: '', confPass: '', error: 'Sign Up gagal' }));
    }
    yield put(loadingDone());
  }
}

export function* createStudentWatcher() {
  const action = yield actionChannel(CREATE_STUDENT);

  while (yield take(CREATE_STUDENT)) {
    const { value } = yield take(action);
    yield call(crStudent, value);
  }
}

export function* fetchUserDataWatcher() {
  const action = yield actionChannel(FETCH_USER_DATA);

  while (yield take(FETCH_USER_DATA)) {
    const { value } = yield take(action);
    yield call(fetchUserDataSaga, value);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* userAccessSaga() {
  // Fork watcher so we can continue execution
  const logInSaga = yield fork(logInWatcher);
  const signUpSaga = yield fork(signUpWatcher);
  const createStudentSaga = yield fork(createStudentWatcher);
  const fetchUserDataSagaWatcher = yield fork(fetchUserDataWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(logInSaga);
  yield cancel(signUpSaga);
  yield cancel(createStudentSaga);
  yield cancel(fetchUserDataSagaWatcher);
}

// Bootstrap sagas
export default [
  userAccessSaga,
];
