import { createSelector } from 'reselect';

/**
 * Direct selector to the cariInternship state domain
 */
const selectCariInternshipDomain = () => state => state.get('cari-internship');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CariInternship
 */

const selectCariInternship = () => createSelector(
  selectCariInternshipDomain(),
  (substate) => substate.toJS()
);

export default selectCariInternship;
export {
  selectCariInternshipDomain,
};
