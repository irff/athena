import { push } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel, actionChannel } from 'redux-saga/effects';
import { LOG_IN } from 'containers/App/constants';
import { SIGN_UP, CREATE_STUDENT, FETCH_USER_DATA } from './constants';
import { logInSuccess } from 'containers/App/actions';
import { fromJS } from 'immutable';
import { isEmpty } from 'lodash';
import { changeErrorMessage, createStudent, fetchUserData } from './actions';
import selectUserAccess from './selectors';
import request from 'utils/request';

export function* logIn() {
  const currentState = yield select(selectUserAccess());
  const requestURL = 'http://localhost:5000/students/login';

  let errMessage = {
		email: '',
		pass: '',
		error: '',
  };
  let errFlag = false;

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if(!currentState.lg.email || !re.test(currentState.lg.email)) {
  	errFlag = true;
  	errMessage.email = 'Email tidak valid.';
  }
  
  if(!currentState.lg.pass) {
  	errFlag = true;
  	errMessage.pass = 'Password tidak boleh kosong';
  }
	
	yield put(changeErrorMessage('lg', errMessage));

	if(!errFlag) {
	  const loginCall = yield call(request, requestURL, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json',
	    },
	    body: JSON.stringify({
	      email: currentState.lg.email,
	      password: currentState.lg.pass,
	      remember: currentState.lg.remember == 1,
	    })
	  });

	  if (!loginCall.err) {
	    //yield put(logInSuccess(loginCall.data.token, loginCall.data));
	    console.log(loginCall.data);
	  } else {
	  	errMessage.error = 'Login gagal';
	  	yield put(changeErrorMessage('lg', errMessage));
	  }
	}
}

export function* logInWatcher() {
	while (yield take(LOG_IN)) {
    yield call(logIn);
  }
}

export function* signUp() {
  const currentState = yield select(selectUserAccess());
  const requestURL = 'http://localhost:5000/students/register';

  let errMessage = {
		email: '',
		pass: '',
		confPass: '',
		error: '',
  };
  let errFlag = false;

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if(!currentState.su.email || !re.test(currentState.su.email)) {
  	errFlag = true;
  	errMessage.email = 'Email tidak valid.';
  }
  
  if(!currentState.su.pass) {
  	errFlag = true;
  	errMessage.pass = 'Password tidak boleh kosong';
  }

  if(currentState.su.confPass != currentState.su.pass) {
  	errFlag = true;
  	errMessage.confPass = 'Password tidak sama';
  }

  if(!currentState.su.confPass) {
  	errFlag = true;
  	errMessage.confPass = 'Konfirmasi Password tidak boleh kosong';
  }
	
	yield put(changeErrorMessage('su', errMessage));

	if(!errFlag) {
	  const signupCall = yield call(request, requestURL, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json',
	    },
	    body: JSON.stringify({
	      email: currentState.su.email,
	      password: currentState.su.pass,
	    })
	  });

	  if (!signupCall.err) {
	  	console.log(signupCall.data);
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
  const requestURL = 'http://localhost:5000/students';

  let errMessage = {
		email: '',
		pass: '',
		confPass: '',
		error: '',
  };

  const auth = `Bearer ${value}`;
  console.log(auth);

  const createStudentCall = yield call(request, requestURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': auth
    },
    body: JSON.stringify({
    	first_name: currentState.su.email.split("@")[0],
	    major: 'iniDefaultEntryQuint',
			university: 'iniDefaultEntryQuint',
	   	resume_url: 'http://iniDefaultEntryQui.nt',
	    headline: 'iniDefaultEntryQuint'
    })
  });

  if (!createStudentCall.err) {
    //yield put(logInSuccess(signupCall.data.token, loginCall.data));
    yield put(fetchUserData(createStudentCall.data));
  } else {
  	errMessage.error = 'Sign Up gagal';
  	yield put(changeErrorMessage('su', errMessage));
  }
}

export function* fetchUserDataSaga(data) {
  const currentState = yield select(selectUserAccess());
  const requestURL = `http://localhost:5000/students/${data.student_id}`;
  const auth = `Bearer ${data.token}`;

  const fetchDataCall = yield call(request, requestURL, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': auth
    }
  });

  if (!fetchDataCall.err) {
    //yield put(logInSuccess(signupCall.data.token, loginCall.data));
  	console.log(fetchDataCall.data);
    yield put(push('/mahasiswa/cari-internship'));
  }
}

export function* createStudentWatcher() {
	const action = yield actionChannel(CREATE_STUDENT);

	while (yield take(CREATE_STUDENT)) {
		const {value} = yield take(action); 
    yield call(crStudent, value);
  }
}

export function* fetchUserDataWatcher() {
	const action = yield actionChannel(FETCH_USER_DATA);

	while (yield take(FETCH_USER_DATA)) {
		const {value} = yield take(action); 
    yield call(fetchUserDataSaga, value);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* userAccessSaga() {
  // Fork watcher so we can continue execution
  const logIn = yield fork(logInWatcher);
  const signUp = yield fork(signUpWatcher);
  const createStudent = yield fork(createStudentWatcher);
  const fetchUserData = yield fork(fetchUserDataWatcher);
}

// Bootstrap sagas
export default [
  userAccessSaga,
];