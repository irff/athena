/*
 *
 * Navbar
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Navlink from 'components/Navlink';
import Logo from 'components/Logo';
import { logOut } from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import { selectGlobal } from 'containers/App/selectors';

import styles from './styles.css';
import globalStyles from 'containers/App/styles.css';

export class Navbar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    global: React.PropTypes.object,
    push: React.PropTypes.func,
    logOut: React.PropTypes.func,
    onChangeConfirmation: React.PropTypes.bool,
  };

  constructor() {
    super();
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    document.cookie = 'token=;expires=Thu, 01-Jan-70 00:00:01 GMT;path=/';
    document.cookie = 'student_id=;expires=Thu, 01-Jan-70 00:00:01 GMT;path=/';
    this.props.logOut();
    this.props.push('/');
  }

  alertFirst(url) {
    if (this.props.onChangeConfirmation) {
      if (window.confirm('Data belum tersimpan, yakin ingin meninggalkan halaman?')) {
        this.props.push(url);
      }
    } else {
      this.props.push(url);
    }
  }

  navOnClick(url) {
    if (this.props.onChangeConfirmation) {
      this.alertFirst(url);
    } else {
      this.props.push(url);
    }
  }

  isCompanyPage() {
    return (window.location.pathname.indexOf('/perusahaan') === 0);
  }

  renderStudentNav() {
    const firstName = this.props.global.userData ? this.props.global.userData.first_name : 'Please Login First';

    return (
      <div className={styles.navbar}>
        <div className="row expanded">
          <div className="small-12 columns">
            <button className={styles.logo} onClick={() => this.navOnClick('/mahasiswa/cari-internship')} ><Logo className={styles.logoImg} /></button>
            <div className="show-for-large">
              <Navlink isCurrentElement={window.location.pathname.startsWith('/mahasiswa/cari-internship')} handleRoute={() => this.navOnClick('/mahasiswa/cari-internship')}>Cari Internship</Navlink>
              <Navlink isRightElement handleRoute={this.logOut}>Keluar</Navlink>
              <Navlink isCurrentElement={window.location.pathname === '/mahasiswa' || window.location.pathname === '/mahasiswa/'} handleRoute={() => this.navOnClick('/mahasiswa')} isPlaceholder>Hi <strong>{firstName}!</strong></Navlink>
              <Navlink isCurrentElement={window.location.pathname.startsWith('/mahasiswa/ubah-profil')} handleRoute={() => this.navOnClick('/mahasiswa/ubah-profil')} isRightElement>Ubah Profil</Navlink>
            </div>
            <div className="show-for-small hide-for-large">
              <Navlink isCurrentElement={window.location.pathname === '/mahasiswa/cari-internship'} handleRoute={() => this.navOnClick('/mahasiswa/cari-internship')}><span className={globalStyles.iconsearch} /></Navlink>
              <Navlink isRightElement handleRoute={this.logOut}><span className={globalStyles.iconlogout} /></Navlink>
              <Navlink isCurrentElement={window.location.pathname === '/mahasiswa' || window.location.pathname === '/mahasiswa/'} handleRoute={() => this.navOnClick('/mahasiswa')} isPlaceholder><span className={globalStyles.icondashboard} /></Navlink>
              <Navlink isCurrentElement={window.location.pathname === '/mahasiswa/ubah-profil'} handleRoute={() => this.navOnClick('/mahasiswa/ubah-profil')} isRightElement><span className={globalStyles.iconedit} /></Navlink>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderCompanyNav() {
    const name = this.props.global.userData ? this.props.global.userData.name : 'Please Login First';

    return (
      <div className={styles.navbar}>
        <div className="row expanded">
          <div className="small-12 columns">
            <button className={styles.logo} onClick={() => this.navOnClick('/perusahaan/home')} ><Logo className={styles.logoImg} /></button>
            <div className="show-for-large">
              <Navlink isCurrentElement={window.location.pathname === '/perusahaan/home'} handleRoute={() => this.navOnClick('/perusahaan/home')}>Dashboard</Navlink>
              <Navlink isCurrentElement={window.location.pathname === '/perusahaan/new-job'} handleRoute={() => this.navOnClick('/perusahaan/new-job')}>Tambah Posisi Internship</Navlink>
              <Navlink isRightElement handleRoute={this.logOut}>Keluar</Navlink>
              <Navlink isPlaceholder>Hi <strong>{name}!</strong></Navlink>
              <Navlink isCurrentElement={window.location.pathname === '/perusahaan/edit-profil'} handleRoute={() => this.navOnClick('/perusahaan/edit-profil')} isRightElement>Ubah Profil</Navlink>
            </div>
            <div className="show-for-small hide-for-large">
              <Navlink isCurrentElement={window.location.pathname === '/perusahaan/home'} handleRoute={() => this.navOnClick('/perusahaan/home')}><span className={globalStyles.iconsearch} /></Navlink>
              <Navlink isRightElement handleRoute={this.logOut}><span className={globalStyles.iconlogout} /></Navlink>
              <Navlink isCurrentElement={window.location.pathname === '/perusahaan/edit-profil'} handleRoute={() => this.navOnClick('/perusahaan/edit-profil')} isRightElement><span className={globalStyles.iconedit} /></Navlink>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.isCompanyPage()) {
      return this.renderCompanyNav();
    }

    return this.renderStudentNav();
  }
}

const mapStateToProps = createStructuredSelector({
  global: selectGlobal(),
});


function mapDispatchToProps(dispatch) {
  return {
    push: (url) => dispatch(push(url)),
    logOut: () => dispatch(logOut()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
