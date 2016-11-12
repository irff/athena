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

import { createStructuredSelector } from 'reselect';
import { selectGlobal } from 'containers/App/selectors';

import messages from './messages';
import styles from './styles.css';
import globalStyles from 'containers/App/styles.css';

export class Navbar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    global: React.PropTypes.object,
    push: React.PropTypes.func,
  };

  render() {
    const firstName = this.props.global.get('userData') ? this.props.global.get('userData').get('first_name') : 'Please Login First';
    return (
      <div className={styles.navbar}>
        <div className="row expanded">
          <div className="small-12 columns">
            <button className={styles.logo} onClick={() => this.props.push('/')} ><strong>QUINT</strong></button>
            <div className="show-for-large">
              <Navlink isCurrentElement={window.location.pathname == '/mahasiswa/cari-internship'} handleRoute={() => this.props.push('/mahasiswa/cari-internship')}>Cari Internship</Navlink>
              <Navlink isRightElement={true}>Hi <strong>{firstName}!</strong> | Logout</Navlink>
              <Navlink isCurrentElement={window.location.pathname == '/mahasiswa/ubah-profil'} handleRoute={() => this.props.push('/mahasiswa/ubah-profil')} isRightElement={true}>Ubah Profil</Navlink>
            </div>
            <div className="show-for-small hide-for-large">
              <Navlink isCurrentElement={window.location.pathname == '/mahasiswa/cari-internship'} handleRoute={() => this.props.push('/mahasiswa/cari-internship')}><span className={globalStyles.iconsearch} /></Navlink>
              <Navlink isRightElement={true}><span className={globalStyles.iconlogout} /></Navlink>
              <Navlink isCurrentElement={window.location.pathname == '/mahasiswa/ubah-profil'} handleRoute={() => this.props.push('/mahasiswa/ubah-profil')} isRightElement={true}><span className={globalStyles.iconedit} /></Navlink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  global: selectGlobal(),
});


function mapDispatchToProps(dispatch) {
  return {
    push: (url) => dispatch(push(url)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
