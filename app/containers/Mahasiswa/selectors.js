import { createSelector } from 'reselect';

/**
 * Direct selector to the mahasiswa state domain
 */
const selectMahasiswaDomain = () => state => state.get('mahasiswa');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Mahasiswa
 */

const selectMahasiswa = () => createSelector(
  selectMahasiswaDomain(),
  (substate) => substate.toJS()
);

export default selectMahasiswa;
export {
  selectMahasiswaDomain,
};
