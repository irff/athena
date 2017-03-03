import expect from 'expect';
import companyProfileEditReducer from '../reducer';
import { fromJS } from 'immutable';

describe('companyProfileEditReducer', () => {
  it('returns the initial state', () => {
    expect(companyProfileEditReducer(undefined, {})).toEqual(fromJS({}));
  });
});
