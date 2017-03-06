import { createSelector } from 'reselect';

/**
 * Direct selector to the applyInternship state domain
 */
const selectApplyInternshipDomain = () => state => state.get('cari-internship').applyInternship;

/**
 * Other specific selectors
 */


/**
 * Default selector used by ApplyInternship
 */

const selectApplyInternship = () => createSelector(
  selectApplyInternshipDomain(),
  (substate) => substate.toJS()
);

export default selectApplyInternship;
export {
  selectApplyInternshipDomain,
};
