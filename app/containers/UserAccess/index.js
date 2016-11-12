/*
 *
 * UserAccess
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fromJS } from 'immutable';
import Helmet from 'react-helmet';
import selectUserAccess from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import globalStyles from 'containers/App/styles.css';
import { logIn } from 'containers/App/actions';
import { changeInput, signUp } from './actions';

import Button from 'components/Button';

import LoginImg from './login.png';
import LinkedInLogo from './linkedinlogo.png';

export class UserAccess extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  openRoute = (route) => {
    this.props.changeRoute(route);
  }

  openLogin = () => {
    let redirLink = '/mahasiswa/login';
    
    if(window.location.pathname.indexOf("/perusahaan") === 0) {
      redirLink = '/perusahaan/login';
    }

    this.openRoute(redirLink);
  }

  openSignup = () => {
    let redirLink = '/mahasiswa/signup';
    
    if(window.location.pathname.indexOf("/perusahaan") === 0) {
      redirLink = '/perusahaan/signup';
    }

    this.openRoute(redirLink);
  }

  componentDidMount = () => {
    window.processLogin = (user) => {
      console.log(user);
    }
  }

  linkedInLogin = () => {
    window.open('http://localhost:5000/students/login/linkedin','quint_linkedin_login','width=600,height=600');
  }

  toggleRemember = () => {
    this.props.changeInput('lg','remember', this.props.lg.remember == 1 ? 0 : 1);
  }

  changeInput = (evt, field) => {
    const value = evt.target.value;
    let path = 'lg';

    if(window.location.pathname.endsWith('/signup') || window.location.pathname.endsWith('/signup/')) {
      path = 'su';
    }

    this.props.changeInput(path, field, value);
  }

  render() {
    let mainStyle = styles.userAccessStudent;

    let heroHeader = <h1>Tanpa Quint,<br />kamu fix bukan<br />apa-apa.</h1>;

    if(window.location.pathname.indexOf("/perusahaan") === 0) {
      mainStyle = styles.userAccessCompany;
      heroHeader = <h1>Raihlah anak<br />anak TOKI & ambis,<br />secepatnya.</h1>;
      heroLink = <a>Temukan masa depanmu lewat Quint.<br />Sekarang →</a>;
    }

    let loginSwitchStyle = window.location.pathname.endsWith('login') || window.location.pathname.endsWith('login/') ? styles.switchActive : styles.switch;
    let signupSwitchStyle = window.location.pathname.endsWith('signup') || window.location.pathname.endsWith('signup/') ? styles.switchActive : styles.switch;

    let mainContent = (
          <div>
            <div className="small-12 columns text-left">
              <h3 className={styles.label}>Email</h3>
            </div>
            <div className="small-12 columns">
              <input placeholder="masukkan email anda" autoFocus={true} className={styles.input} value={this.props.lg.email} onChange={(evt) => this.changeInput(evt, 'email')} />
              <h4 style={{display: this.props.lg.message.email ? 'block' : 'none'}}>{this.props.lg.message.email}</h4>
            </div>
            <div className="small-12 columns text-left">
              <h3 className={styles.label}>Password</h3>
            </div>
            <div className="small-12 columns">
              <input type="password" placeholder="masukkan password anda" className={styles.input} value={this.props.lg.pass} onChange={(evt) => this.changeInput(evt, 'pass')}/>
              <h4 style={{display: this.props.lg.message.pass ? 'block' : 'none'}}>{this.props.lg.message.pass}</h4>
            </div>
            <div className="small-6 columns end">
              <input type="checkbox" className={styles.checkBox} checked={this.props.lg.remember} onChange={this.toggleRemember} /><span className={styles.checkBoxLabel}>Ingat Saya</span>
            </div>
            <div className="small-12 columns">
              <Button className={styles.submitButton} onClick={this.props.logIn}>Log In</Button>
              <h4 className={styles.failCall} style={{display: this.props.lg.message.error ? 'block' : 'none'}}>{this.props.lg.message.error}</h4>
            </div>
            <div className="small-4 columns">
              <div className={styles.buttonDivider}>
              </div>
            </div>
            <div className="small-4 columns">
              <p className={styles.buttonDividerText}>atau</p>
            </div>
            <div className="small-4 columns">
              <div className={styles.buttonDivider}>
              </div>
            </div>
            <div className="small-12 columns">
              <Button className={styles.linkedInButton} onClick={this.linkedInLogin}>Log In via <img src={LinkedInLogo} alt="linked in" className={styles.linkedInLogo} /></Button>
            </div>
          </div>
      );

    if(window.location.pathname.endsWith('signup') || window.location.pathname.endsWith('signup/')) {
      mainContent = (
          <div>
            <div className="small-12 columns text-left">
              <h3 className={styles.label}>Email</h3>
            </div>
            <div className="small-12 columns">
              <input placeholder="masukkan email anda" autoFocus={true} className={styles.input} value={this.props.su.email} onChange={(evt) => this.changeInput(evt, 'email')} />
              <h4 style={{display: this.props.su.message.email ? 'block' : 'none'}}>{this.props.su.message.email}</h4>
            </div>
            <div className="small-12 columns text-left">
              <h3 className={styles.label}>Password</h3>
            </div>
            <div className="small-12 columns">
              <input type="password" placeholder="masukkan password anda" className={styles.input} value={this.props.su.pass} onChange={(evt) => this.changeInput(evt, 'pass')} />
              <h4 style={{display: this.props.su.message.pass ? 'block' : 'none'}}>{this.props.su.message.pass}</h4>
            </div>
            <div className="small-12 columns text-left">
              <h3 className={styles.label}>Konfirmasi Password</h3>
            </div>
            <div className="small-12 columns">
              <input type="password" placeholder="Konfirmasi password anda" className={styles.input} value={this.props.su.confPass} onChange={(evt) => this.changeInput(evt, 'confPass')} />
              <h4 style={{display: this.props.su.message.confPass ? 'block' : 'none'}}>{this.props.su.message.confPass}</h4>
            </div>
            <div className="small-12 columns">
              <Button className={styles.submitButton} onClick={this.props.signUp} >Sign Up</Button>
              <h4 className={styles.failCall} style={{display: this.props.su.message.error ? 'block' : 'none'}}>{this.props.su.message.error}</h4>
            </div>
          </div>
      );
    }

    return (
      <div className={mainStyle}>
      <Helmet
        title="UserAccess"
        meta={[
          { name: 'description', content: 'Description of UserAccess' },
        ]}
      />
        <div className="row expanded">
          <div className="small-12 medium-6 columns">
            <div className={styles.hero}>
              {heroHeader}
              <div className="show-for-small-only">
                <div className={styles.scrollDownNotice}>
                  {window.location.pathname.endsWith('signup') || window.location.pathname.endsWith('signup/') ? 'Signup' : 'Login'}<span className={globalStyles.icondownarrow} />
                </div>
              </div>
            </div>
          </div>
          <div className="small-12 medium-6 columns text-center">
            <div className={styles.content}>
              <div className={styles.contentContainer}>
                <div className="row expanded">
                  <div className="small-12 columns">
                    <img src={LoginImg} alt="Login Icon" className={styles.headerImage} />
                  </div>
                  <div className="small-12 columns">
                    <div className={styles.switchMenu}>
                      <Button containerClassName={styles.switchContainer} className={loginSwitchStyle} handleRoute={this.openLogin} >Log in</Button>
                      <span className={styles.switchDivider}> atau </span>
                      <Button containerClassName={styles.switchContainer} className={signupSwitchStyle} handleRoute={this.openSignup} >Sign Up</Button>
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
  logIn: React.PropTypes.func,
  signUp: React.PropTypes.func,
}

const mapStateToProps = selectUserAccess();

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    logIn: () => dispatch(logIn()),
    signUp: () => dispatch(signUp()),
    changeInput: (path, field, value) => dispatch(changeInput(path, field, value)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccess);
