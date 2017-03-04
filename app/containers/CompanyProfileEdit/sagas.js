import { push, LOCATION_CHANGE } from 'react-router-redux';
import { SAVE, LOAD } from './constants';
import { loadSuccess, loadFail, saveSuccess, saveFail } from './actions';
import { fromJS } from 'immutable';
import isEmpty from 'lodash.isempty';
import { takeLatest, take, call, select, put, fork, cancel } from 'redux-saga/effects';
import request from 'utils/request';
import { selectCompanyProfileEdit } from './selectors';
import { selectGlobal } from 'containers/App/selectors';

// Worker Saga

export function* load() {
  const globalState = yield select(selectGlobal());
  const currentToken = globalState.get('currentToken');
  const requestURL = null; // @TODO
  const auth = `Bearer ${currentToken}`;

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

export function* save() {
  const globalState = yield select(selectGlobal());
  const currentToken = globalState.get('currentToken');
  const state = yield select(selectCompanyProfileEdit());
  const isNew = state.get('isNew');
  const data = state.delete('isNew').delete('isLoading').delete('isSaving');
  const requestURL = null; // @TODO
  const auth = `Bearer ${currentToken}`;

  const result = yield call(request, requestURL, {
    method: isNew ? 'POST' : 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    body: data.toJS(),
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
  load,
  save,
  loadWatcher,
  saveWatcher,
];
