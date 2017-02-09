import { createSelector } from 'reselect';

/**
 * Direct selector to the companyDashboard state domain
 */
const selectCompanyDashboardDomain = () => state => state.get('companyDashboard');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CompanyDashboard
 */

const selectCompanyDashboard = () => createSelector(
  selectCompanyDashboardDomain(),
  (substate) => substate.toJS()
);

export default selectCompanyDashboard;
export {
  selectCompanyDashboardDomain,
};
