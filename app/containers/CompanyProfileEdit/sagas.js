import { push, LOCATION_CHANGE } from 'react-router-redux';
import { SAVE, LOAD } from './constants';
import { loadSuccess, loadFail, saveSuccess, saveFail, updateErrors } from './actions';
import { fromJS } from 'immutable';
import isEmpty from 'lodash/lang/isEmpty';
import { take, call, select, put, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'utils/request';
import selectCompanyProfileEdit from './selectors';
import { selectGlobal } from 'containers/App/selectors';
import validate from 'validate.js';

// Worker Saga

export function* load() {
  const globalState = yield select(selectGlobal());
  const currentToken = globalState.get('currentToken');
  const id = globalState.get('id');
  const requestURL = null; // @TODO
  const auth = `Bearer ${currentToken}`;

  if (!id) {
    const data = fromJS({ isNew: true });
    yield put(loadSuccess(data));
  } else {
    const result = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth,
      },
    });

    if (!result.err) {
      const data = fromJS(result.data);
      data.set('isNew', isEmpty(data.get('name')));
      yield put(loadSuccess(data));
    } else {
      yield put(loadFail(result.err));
    }
  }
}

export function* save() {
  const globalState = yield select(selectGlobal());
  const currentToken = globalState.get('currentToken');
  const state = yield select(selectCompanyProfileEdit());
  const isNew = state.isNew;
  const data = state;
  delete data.isNew;
  delete data.isLoading;
  delete data.isSaving;
  delete data.error;
  delete data.validation_errors;
  const requestURL = 'http://requestb.in/1c84t7h1'; // @TODO
  const auth = `Bearer ${currentToken}`;

  const constraints = {
    name: {
      presence: true,
    },
    category: {
      presence: true,
    },
    logo: {
      presence: true,
    },
    header: {
      presence: true,
    },
    site: {
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
    body: data,
  });

  if (!result.err) {
    yield put(saveSuccess());
    yield put(push('/perusahaan/home'));
  } else {
    yield put(saveFail(result.err));
  }
}

// Watcher Saga

export function* loadWatcher() {
  yield takeLatest(LOAD, load);
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

// All sagas to be loaded
export default [
  companyProfileEditSaga,
];
