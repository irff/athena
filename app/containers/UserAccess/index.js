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
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

import TextInput from 'components/TextInput';
import Button from 'components/Button';

import LoginImg from './login.png';
import LinkedInLogo from './linkedinlogo.png';

export class UserAccess extends React.Component { // eslint-disable-line react/prefer-stateless-function
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

  render() {
    console.log(window.location.pathname);

    let mainStyle = styles.userAccessStudent;

    let heroHeader = <h1>Tanpa Quint,<br />kamu fix bukan<br />apa-apa.</h1>;
    let heroLink = <a>Temukan masa depanmu lewat Quint.<br />Sekarang →</a>;

    if(window.location.pathname.indexOf("/perusahaan") === 0) {
      mainStyle = styles.userAccessCompany;
      heroHeader = <h1>Raihlah anak<br />anak TOKI & ambis,<br />secepatnya.</h1>;
      heroLink = <a>Temukan masa depanmu lewat Quint.<br />Sekarang →</a>;
    }

    let loginSwitchStyle = window.location.pathname.endsWith('login') || window.location.pathname.endsWith('login/') ? styles.switchActive : styles.switch;
    let signupSwitchStyle = window.location.pathname.endsWith('signup') || window.location.pathname.endsWith('signup/') ? styles.switchActive : styles.switch;

    let mainContent = ([
            <div className="small-12 columns text-left">
              <h3 className={styles.label}>Email</h3>
            </div>,
            <div className="small-12 columns">
              <TextInput placeholder="masukkan email anda" autofocus={true} className={styles.input} />
            </div>,
            <div className="small-12 columns text-left">
              <h3 className={styles.label}>Password</h3>
            </div>,
            <div className="small-12 columns">
              <TextInput type="password" placeholder="masukkan password anda" className={styles.input} />
            </div>,
            <div className="small-6 columns">
              <input type="checkbox" className={styles.checkBox} /><span className={styles.checkBoxLabel}>Ingat Saya</span>
            </div>,
            <div className="small-6 columns text-right">
              <a className={styles.forgetPassword}>Lupa Password?</a>
            </div>,
            <div className="small-12 columns">
              <Button className={styles.submitButton}>Log In</Button>
            </div>,
            <div className="small-4 columns">
              <div className={styles.buttonDivider}>
              </div>
            </div>,
            <div className="small-4 columns">
              <p className={styles.buttonDividerText}>atau</p>
            </div>,
            <div className="small-4 columns">
              <div className={styles.buttonDivider}>
              </div>
            </div>,
            <div className="small-12 columns">
              <Button className={styles.linkedInButton} onClick={this.linkedInLogin}>Log In via <img src={LinkedInLogo} alt="linked in" className={styles.linkedInLogo} /></Button>
            </div>,
      ]);

    if(window.location.pathname.endsWith('signup') || window.location.pathname.endsWith('signup/')) {
      mainContent = ([
            <div className="small-12 columns text-left">
              <h3 className={styles.label}>Email</h3>
            </div>,
            <div className="small-12 columns">
              <TextInput placeholder="masukkan email anda" autofocus={true} className={styles.input} />
            </div>,
            <div className="small-12 columns text-left">
              <h3 className={styles.label}>Password</h3>
            </div>,
            <div className="small-12 columns">
              <TextInput type="password" placeholder="masukkan password anda" className={styles.input} />
            </div>,
            <div className="small-12 columns text-left">
              <h3 className={styles.label}>Konfirmasi Password</h3>
            </div>,
            <div className="small-12 columns">
              <TextInput type="password" placeholder="Konfirmasi password anda" className={styles.input} />
            </div>,
            <div className="small-12 columns">
              <Button className={styles.submitButton}>Sign Up</Button>
            </div>,
      ]);
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
              {heroLink}
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
}

const mapStateToProps = selectUserAccess();

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccess);
