import { createSelector } from 'reselect';

/**
 * Direct selector to the userAccess state domain
 */
const selectUserAccessDomain = () => state => state.get('userAccess');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UserAccess
 */

const selectUserAccess = () => createSelector(
  selectUserAccessDomain(),
  (substate) => substate.toJS()
);

export default selectUserAccess;
export {
  selectUserAccessDomain,
};
