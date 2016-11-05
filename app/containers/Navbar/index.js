/*
 *
 * Navbar
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Navlink from 'components/Navlink';

import messages from './messages';
import styles from './styles.css';

export class Navbar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.navbar}>
        <div className="row expanded">
          <div className="small-12 columns">
            <p className={styles.logo}><strong>QUINT</strong></p>
            <Navlink isRightElement={false}>Dashboard</Navlink>
            <Navlink isRightElement={false}>Cari Internship</Navlink>
            <Navlink isRightElement={true}>Hi <strong>Amanda!</strong> | Logout</Navlink>
            <Navlink isRightElement={true}>Profil</Navlink>
            <Navlink isRightElement={true}>Pengaturan</Navlink>
          </div>
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(Navbar);
