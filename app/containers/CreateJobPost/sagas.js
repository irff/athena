import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import validate from 'validate.js';
import { isEmpty } from 'lodash';

import request from 'utils/request';
import { selectGlobal } from 'containers/App/selectors';
import { REVIEW_START, SUBMIT } from './constants';
import { updateErrors, cancelReview, submitSuccess, submitFail } from './actions';
import selectCreateJobPost from './selectors';

import { API_COMPANIES } from 'containers/App/api';
import { userAccessSaga } from 'containers/UserAccess/sagas';

// Worker Saga
export function* validation() {
  const salaryValidator = (value) => {
    if (validate.isEmpty(value.fee.minimal) || validate.isEmpty(value.fee.maximal)) {
      return 'harus diisi';
    }

    if (!validate.isNumber(value.fee.minimal) ||
        !validate.isNumber(value.fee.maximal) ||
        value.fee.minimal < 0 ||
        value.fee.maximal < 0) {
      return 'harus berupa angka dan tidak negatif';
    }

    if (value.fee.minimal > value.fee.maximal) {
      return 'harus berupa jangkauan dari kecil ke besar';
    }

    return null;
  };

  const jobScheduleValidator = (value) => {
    if (validate.isEmpty(value.start_at) || validate.isEmpty(value.end_at)) {
      return 'harus diisi';
    }

    const stRaw = value.start_at.split('-');
    const stNum = parseInt(stRaw[1], 10) + (parseInt(stRaw[2], 10) * 12);
    const edRaw = value.end_at.split('-');
    const edNum = parseInt(edRaw[1], 10) + (parseInt(edRaw[2], 10) * 12);

    if (edNum < stNum) {
      return 'harus berupa jangka waktu yang valid';
    }

    return null;
  };

  validate.validators.salary = salaryValidator;
  validate.validators.jobSchedule = jobScheduleValidator;
  validate.validators.presence.options = { message: 'harus diisi' };

  const constraints = {
    role: { presence: true },
    category: { presence: true },
    location: { presence: true },
    job_schedule: { jobSchedule: true },
    salary: { salary: true },
    technical_requirements: { presence: true },
    tasks: { presence: true },
    experiences_gained: { presence: true },
    status: { presence: true },
  };

  const state = yield select(selectCreateJobPost());
  const data = state;
  delete data.isReviewing;
  delete data.isSubmitting;
  delete data.error;
  delete data.validation_errors;
  delete data.isSubmitted;

  const errors = validate(data, constraints, { fullMessages: false });
  if (!isEmpty(errors)) {
    yield put(updateErrors(errors));
    yield put(cancelReview());
    return;
  }
}

export function* submit() {
  const globalState = yield select(selectGlobal());
  const companyId = globalState.id;
  const currentToken = globalState.currentToken;
  const requestURL = `${API_COMPANIES}/${companyId}/jobs`; // @TODO
  const auth = `Bearer ${currentToken}`;
  const state = yield select(selectCreateJobPost());
  const data = state;
  delete data.isReviewing;
  delete data.isSubmitting;
  delete data.error;
  delete data.validationErrors;
  delete data.isSubmitted;
  data.salary.is_published = !data.salary.isHidden;
  delete data.salary.isHidden;

  const result = yield call(request, requestURL, {
    method: 'POST',
    // mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    body: JSON.stringify(data),
  });

  if (!result.err) {
    yield put(submitSuccess());
  } else {
    yield put(submitFail(result.err));
  }
}


// Watcher Saga
export function* reviewWatcher() {
  yield takeLatest(REVIEW_START, validation);
}

export function* submitWatcher() {
  yield takeLatest(SUBMIT, submit);
}

// Root Saga
export function* createJobPostSaga() {
  const reviewSaga = yield fork(reviewWatcher);
  const submitSaga = yield fork(submitWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(reviewSaga);
  yield cancel(submitSaga);
}

// Container saga
export function* createJobPostSagaContainer() {
  yield [
    fork(createJobPostSaga),
    fork(userAccessSaga),
  ];
}

// Bootstrap sagas
export default [
  createJobPostSagaContainer,
];
