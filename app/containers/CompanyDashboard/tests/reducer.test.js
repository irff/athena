import expect from 'expect';
import companyDashboardReducer from '../reducer';
import { fromJS } from 'immutable';

describe('companyDashboardReducer', () => {
  it('returns the initial state', () => {
    expect(companyDashboardReducer(undefined, {})).toEqual(fromJS({}));
  });
});
