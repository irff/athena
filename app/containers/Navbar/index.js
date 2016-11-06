/*
 *
 * Navbar
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { FormattedMessage } from 'react-intl';
import Navlink from 'components/Navlink';

import messages from './messages';
import styles from './styles.css';

export class Navbar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    push: React.PropTypes.func,
  };

  render() {
    return (
      <div className={styles.navbar}>
        <div className="row expanded">
          <div className="small-12 columns">
            <button className={styles.logo} onClick={() => this.props.push('/')} ><strong>QUINT</strong></button>
            <Navlink isCurrentElement={window.location.pathname == '/mahasiswa/cari-internship'} handleRoute={() => this.props.push('/mahasiswa/cari-internship')}>Cari Internship</Navlink>
            <Navlink isRightElement={true}>Hi <strong>Amanda!</strong> | Logout</Navlink>
            <Navlink isCurrentElement={window.location.pathname == '/mahasiswa/edit-profil'} handleRoute={() => this.props.push('/mahasiswa/edit-profil')} isRightElement={true}>Edit Profil</Navlink>
          </div>
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    push: (url) => dispatch(push(url)),
  };
}

export default connect(null, mapDispatchToProps)(Navbar);
