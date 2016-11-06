import { createSelector } from 'reselect';

/**
 * Direct selector to the editProfile state domain
 */
const selectEditProfileDomain = () => state => state.get('edit-profile');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EditProfile
 */

const selectEditProfile = () => createSelector(
  selectEditProfileDomain(),
  (substate) => substate.toJS()
);

export default selectEditProfile;
export {
  selectEditProfileDomain,
};
