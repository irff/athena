/*
 *
 * CompanyDashboard
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectCompanyDashboard from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

import Accordion from 'components/Accordion';

export class CompanyDashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.companyDashboard}>
        <Helmet
          title="CompanyDashboard"
          meta={[
            { name: 'description', content: 'Description of CompanyDashboard' },
          ]}
        />
        <FormattedMessage {...messages.header} />
        <Accordion />
      </div>
    );
  }
}

const mapStateToProps = selectCompanyDashboard();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDashboard);
