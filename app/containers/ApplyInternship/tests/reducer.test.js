import expect from 'expect';
import applyInternshipReducer from '../reducer';
import { fromJS } from 'immutable';

describe('applyInternshipReducer', () => {
  it('returns the initial state', () => {
    expect(applyInternshipReducer(undefined, {})).toEqual(fromJS({}));
  });
});
