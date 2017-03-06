import { createSelector } from 'reselect';

/**
 * Direct selector to the applyInternship state domain
 */
const selectEditProfileDomain = () => state => state.get('edit-profile');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ApplyInternship
 */

const selectEditProfile = () => createSelector(
  selectEditProfileDomain(),
  (substate) => substate.toJS()
);

export default selectEditProfile;
export {
  selectEditProfileDomain,
};
