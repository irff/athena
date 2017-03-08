import expect from 'expect';
import createJobPostReducer from '../reducer';
import { fromJS } from 'immutable';

describe('createJobPostReducer', () => {
  it('returns the initial state', () => {
    expect(createJobPostReducer(undefined, {})).toEqual(fromJS({}));
  });
});
