/*
 *
 * UserAccess
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import selectUserAccess from './selectors';
import { loading, loadingDone, logInStudent, logInCompany } from 'containers/App/actions';
import styles from './styles.css';
import { changeInput, signUp, fetchUserData } from './actions';

import Button from 'components/Button';

import LoginImg from './login.png';
import { API_STUDENTS } from 'containers/App/api';

export class UserAccess extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.logIn = this.logIn.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.openRoute = this.openRoute.bind(this);
    this.openLogin = this.openLogin.bind(this);
    this.openSignup = this.openSignup.bind(this);
  }

  componentWillMount() {
    this.props.loadingDone();

    let token = '';
    let id = '';

    if (this.isCompanyPage()) {
      token = this.getCookie('company_token');
      id = this.getCookie('company_id');
      if (token !== '' && id !== '') {
        this.props.loading();
        this.props.fetchUserData({ token, id, isCompany: true });
      }
    } else {
      token = this.getCookie('student_token');
      id = this.getCookie('student_id');
      if (token !== '' && id !== '') {
        this.props.loading();
        this.props.fetchUserData({ token, id });
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onEnter);
  }

  componentWillUnmount() {
    this.props.loading();
    document.removeEventListener('keyup', this.onEnter);
  }

  onEnter(event) {
    if (event.keyCode === 13) {
      if (window.location.pathname.endsWith('/signup') || window.location.pathname.endsWith('/signup/')) {
        this.props.signUp();
      } else {
        this.logIn();
      }
    }
  }

  getCookie(cname) {
    const name = `${cname}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  logIn() {
    if (window.location.pathname.indexOf('/mahasiswa') === 0) {
      this.props.logInStudent();
    } else if (window.location.pathname.indexOf('/perusahaan') === 0) {
      this.props.logInCompany();
    }
  }


  openRoute(route) {
    this.props.changeRoute(route);
  }

  openLogin() {
    let redirLink = '/mahasiswa/login';

    if (window.location.pathname.indexOf('/perusahaan') === 0) {
      redirLink = '/perusahaan/login';
    }

    this.openRoute(redirLink);
  }

  openSignup() {
    let redirLink = '/mahasiswa/signup';

    if (window.location.pathname.indexOf('/perusahaan') === 0) {
      redirLink = '/perusahaan/signup';
    }

    this.openRoute(redirLink);
  }

  linkedInLogin() {
    window.open(`${API_STUDENTS}login/linkedin`, 'quint_linkedin_login', 'width=600,height=600');
  }

  toggleRemember() {
    this.props.changeInput('lg', 'remember', this.props.lg.remember === 1 ? 0 : 1);
  }

  changeInput(evt, field) {
    const value = evt.target.value;
    let path = 'lg';

    if (window.location.pathname.endsWith('/signup') || window.location.pathname.endsWith('/signup/')) {
      path = 'su';
    }

    this.props.changeInput(path, field, value);
  }

  isCompanyPage() {
    return (window.location.pathname.indexOf('/perusahaan') === 0);
  }

  render() {
    let mainStyle = styles.userAccessStudent;

    let heroHeader = <h1>Dapatkan<br /><i>internship</i><br />lebih mudah,<br />sekarang</h1>;
    // let heroLink = <a>Temukan masa depanmu lewat Quint.<br />Sekarang →</a>;

    if (this.isCompanyPage()) {
      mainStyle = styles.userAccessCompany;
      heroHeader = <h1>Dapatkan mahasiswa<br />bertalenta di Quint,<br />sekarang!.</h1>;
      // heroLink = <a>Temukan masa depanmu lewat Quint.<br />Sekarang →</a>;
    }

    let loginSwitchStyle = window.location.pathname.endsWith('login') || window.location.pathname.endsWith('login/') ? styles.switchActive : styles.switch;
    let signupSwitchStyle = window.location.pathname.endsWith('signup') || window.location.pathname.endsWith('signup/') ? styles.switchActive : styles.switch;

    let mainContent = (
      <div>
        <div className="small-12 columns text-left">
          <h3 className={styles.label}>Email</h3>
        </div>
        <div className="small-12 columns">
          <input placeholder="masukkan email anda" autoFocus className={styles.input} value={this.props.lg.email} onChange={(evt) => this.changeInput(evt, 'email')} />
          <h4 style={{ display: this.props.lg.message.email ? 'block' : 'none' }}>{this.props.lg.message.email}</h4>
        </div>
        <div className="small-12 columns text-left">
          <h3 className={styles.label}>Password</h3>
        </div>
        <div className="small-12 columns">
          <input type="password" placeholder="masukkan password anda" className={styles.input} value={this.props.lg.pass} onChange={(evt) => this.changeInput(evt, 'pass')} />
          <h4 style={{ display: this.props.lg.message.pass ? 'block' : 'none' }}>{this.props.lg.message.pass}</h4>
        </div>
        <div className="small-6 columns end hide">
          <input type="checkbox" className={styles.checkBox} checked={this.props.lg.remember} onChange={this.toggleRemember} /><span className={styles.checkBoxLabel}>Ingat Saya</span>
        </div>
        <div className="small-12 columns">
          <Button className={styles.submitButton} onClick={this.logIn}>Masuk</Button>
          <h4 className={styles.failCall} style={{ display: this.props.lg.message.error ? 'block' : 'none' }}>{this.props.lg.message.error}</h4>
        </div>
      </div>
    );

    if (window.location.pathname.endsWith('signup') || window.location.pathname.endsWith('signup/')) {
      mainContent = (
        <div>
          <div className="small-12 columns text-left">
            <h3 className={styles.label}>Email</h3>
          </div>
          <div className="small-12 columns">
            <input placeholder="masukkan email anda" autoFocus className={styles.input} value={this.props.su.email} onChange={(evt) => this.changeInput(evt, 'email')} />
            <h4 style={{ display: this.props.su.message.email ? 'block' : 'none' }}>{this.props.su.message.email}</h4>
          </div>
          <div className="small-12 columns text-left">
            <h3 className={styles.label}>Password</h3>
          </div>
          <div className="small-12 columns">
            <input type="password" placeholder="masukkan password anda" className={styles.input} value={this.props.su.pass} onChange={(evt) => this.changeInput(evt, 'pass')} />
            <h4 style={{ display: this.props.su.message.pass ? 'block' : 'none' }}>{this.props.su.message.pass}</h4>
          </div>
          <div className="small-12 columns text-left">
            <h3 className={styles.label}>Konfirmasi Password</h3>
          </div>
          <div className="small-12 columns">
            <input type="password" placeholder="konfirmasi password anda" className={styles.input} value={this.props.su.confPass} onChange={(evt) => this.changeInput(evt, 'confPass')} />
            <h4 style={{ display: this.props.su.message.confPass ? 'block' : 'none' }}>{this.props.su.message.confPass}</h4>
          </div>
          <div className="small-12 columns">
            <Button className={styles.submitButton} onClick={this.props.signUp} >Daftar</Button>
            <h4 className={styles.failCall} style={{ display: this.props.su.message.error ? 'block' : 'none' }}>{this.props.su.message.error}</h4>
          </div>
        </div>
      );
    }

    return (
      <div className={mainStyle}>
        <Helmet
          title={window.location.pathname.endsWith('login') ? 'Masuk ke Quint.id' : 'Daftar ke Quint.id'}
          meta={[
            { name: 'description', content: 'Masuk atau Daftar ke Quint.id' },
          ]}
        />
        <div className="row expanded">
          <div className="large-6 columns show-for-large">
            <div className={styles.hero}>
              {heroHeader}
            </div>
          </div>
          <div className="small-12 large-6 columns text-center">
            <div className={styles.content}>
              <div className={styles.contentContainer}>
                <div className="row expanded">
                  <div className="small-12 columns">
                    <img src={LoginImg} alt="Login Icon" className={styles.headerImage} />
                  </div>
                  <div className="small-12 columns">
                    <div className={styles.switchMenu}>
                      <Button containerClassName={styles.switchContainer} className={loginSwitchStyle} handleRoute={this.openLogin} >Masuk</Button>
                      { !this.isCompanyPage() &&
                        <span>
                          <span className={styles.switchDivider}> atau </span>
                          <Button containerClassName={styles.switchContainer} className={signupSwitchStyle} handleRoute={this.openSignup} >Daftar</Button>
                        </span>
                      }
                    </div>
                  </div>
                  {mainContent}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserAccess.propTypes = {
  changeRoute: React.PropTypes.func,
  params: React.PropTypes.object,
  lg: React.PropTypes.object,
  su: React.PropTypes.object,
  changeInput: React.PropTypes.func,
  logInStudent: React.PropTypes.func,
  logInCompany: React.PropTypes.func,
  signUp: React.PropTypes.func,
  loading: React.PropTypes.func,
  loadingDone: React.PropTypes.func,
  fetchUserData: React.PropTypes.func,
};

const mapStateToProps = selectUserAccess();

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    logInStudent: () => dispatch(logInStudent()),
    logInCompany: () => dispatch(logInCompany()),
    signUp: () => dispatch(signUp()),
    changeInput: (path, field, value) => dispatch(changeInput(path, field, value)),
    loading: () => dispatch(loading()),
    loadingDone: () => dispatch(loadingDone()),
    fetchUserData: (data) => dispatch(fetchUserData(data)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccess);
