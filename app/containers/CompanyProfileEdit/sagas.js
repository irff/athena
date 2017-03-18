import { push, LOCATION_CHANGE } from 'react-router-redux';
import { SAVE } from './constants';
import { loadSuccess, saveSuccess, saveFail, updateErrors } from './actions';
import { isEmpty } from 'lodash';
import { take, call, select, put, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'utils/request';
import selectCompanyProfileEdit from './selectors';
import { API_COMPANIES } from 'containers/App/api';
import { selectGlobal } from 'containers/App/selectors';
import { editProfile } from 'containers/App/actions';
import { LOG_IN_SUCCESS_COMPANY } from 'containers/App/constants';
import validate from 'validate.js';

import { userAccessSaga } from 'containers/UserAccess/sagas';
// Worker Saga

export function* load(action) {
  yield put(loadSuccess(action.payload));
}

export function* save() {
  const globalState = yield select(selectGlobal());
  const currentToken = globalState.currentToken;
  const id = globalState.id;
  const state = yield select(selectCompanyProfileEdit());
  const isNew = state.isNew;
  const data = state;
  delete data.isNew;
  delete data.isLoading;
  delete data.isSaving;
  delete data.error;
  delete data.validationErrors;
  delete data.location;

  const requestURL = `${API_COMPANIES}/${id}`;
  const auth = `Bearer ${currentToken}`;

  const constraints = {
    name: {
      presence: true,
    },
    category: {
      presence: true,
    },
    logo_url: {
      presence: true,
      url: true,
    },
    header_img_url: {
      presence: true,
      url: true,
    },
    website: {
      presence: true,
      url: true,
    },
    description: {
      presence: true,
    },
  };

  validate.validators.presence.options = { message: 'harus diisi' };
  validate.validators.url.options = { message: 'harus berupa URL yang valid' };

  const errors = validate(data, constraints, { fullMessages: false });
  if (!isEmpty(errors)) {
    yield put(updateErrors(errors));
    yield put(saveFail('Validation error.'));
    return;
  }

  const result = yield call(request, requestURL, {
    method: isNew ? 'POST' : 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    body: JSON.stringify(data),
  });

  if (!result.err) {
    yield put(saveSuccess());
    yield put(editProfile(data));
    yield put(push('/perusahaan/home'));
  } else {
    yield put(saveFail(result.err));
  }
}

// Watcher Saga

export function* loadWatcher() {
  yield takeLatest(LOG_IN_SUCCESS_COMPANY, load);
}

export function* saveWatcher() {
  yield takeLatest(SAVE, save);
}

// Root Saga
export function* companyProfileEditSaga() {
  const loadSaga = yield fork(loadWatcher);
  const saveSaga = yield fork(saveWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(loadSaga);
  yield cancel(saveSaga);
}


// Container saga
export function* companyProfileEditSagaContainer() {
  yield [
    fork(companyProfileEditSaga),
    fork(userAccessSaga),
  ];
}

// Bootstrap sagas
export default [
  companyProfileEditSagaContainer,
];
