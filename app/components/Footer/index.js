/**
*
* Footer
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles.css';
import globalStyles from 'containers/App/styles.css';
import Logo from 'components/Logo';

function Footer(props) {
  let footerClass = props.hasMargin ? styles.footerMargin : styles.footer;
  return (
    <div className={footerClass}>
      <div className="row">
        <div className="small-12 medium-4 columns">
          <div className={styles.leftSide}>
            <div className="row expanded text-center">
              <div className="small-12 columns">
                <Logo className={styles.logo} />
              </div>
              <div className="small-12 columns">
                <p className={styles.desc}>Quality Internship for Talented Students,<br />Top Universities, and Qualified Companies.</p>
              </div>
              <div className="small-12 columns">
                <p className={styles.icon}><a><span className={globalStyles.iconfacebook}></span></a><a><span className={globalStyles.iconline}></span></a></p>
              </div>
            </div>
          </div>
        </div>
        <div className="small-12 medium-8 columns">
          <div className={styles.rightSide}>
            <h3>Our Team is open for any kind of collaboration</h3>
            <h1>partnership@quint.id</h1>
          </div>
        </div>
        <div className="small-12 columns">
          <p className={styles.copyrightNotice} ><FormattedMessage {...messages.footer} /></p>
        </div>
      </div>
    </div>
  );
}

Footer.propTypes = {
  hasMargin: React.PropTypes.bool,
}

export default Footer;
