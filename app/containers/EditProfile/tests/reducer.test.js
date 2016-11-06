import expect from 'expect';
import editProfileReducer from '../reducer';
import { fromJS } from 'immutable';

describe('editProfileReducer', () => {
  it('returns the initial state', () => {
    expect(editProfileReducer(undefined, {})).toEqual(fromJS({}));
  });
});
