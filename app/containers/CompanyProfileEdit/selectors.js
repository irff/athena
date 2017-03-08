import { createSelector } from 'reselect';

/**
 * Direct selector to the companyProfileEdit state domain
 */
const selectCompanyProfileEditDomain = () => state => state.get('companyProfileEdit');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CompanyProfileEdit
 */

const selectCompanyProfileEdit = () => createSelector(
  selectCompanyProfileEditDomain(),
  (substate) => substate.toJS()
);

export default selectCompanyProfileEdit;
export {
  selectCompanyProfileEditDomain,
};
