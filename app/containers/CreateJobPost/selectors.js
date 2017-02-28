import { createSelector } from 'reselect';

/**
 * Direct selector to the createJobPost state domain
 */
const selectCreateJobPostDomain = () => state => state.get('createJobPost');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CreateJobPost
 */

const selectCreateJobPost = () => createSelector(
  selectCreateJobPostDomain(),
  (substate) => substate.toJS()
);

export default selectCreateJobPost;
export {
  selectCreateJobPostDomain,
};
