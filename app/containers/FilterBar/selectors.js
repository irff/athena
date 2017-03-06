import { createSelector } from 'reselect';

/**
 * Direct selector to the filterBar state domain
 */
const selectFilterBarDomain = () => state => state.get('filterBar');

/**
 * Other specific selectors
 */


/**
 * Default selector used by FilterBar
 */

const selectFilterBar = () => createSelector(
  selectFilterBarDomain(),
  (substate) => substate.toJS()
);

export default selectFilterBar;
export {
  selectFilterBarDomain,
};
