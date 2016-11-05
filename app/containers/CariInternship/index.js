/*
 *
 * CariInternship
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectCariInternship from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

import Navbar from 'containers/Navbar';
import Footer from 'components/Footer';

import SectionTitle from 'components/SectionTitle';
import Select from 'components/Select';
import FilterBar from 'containers/FilterBar';

export class CariInternship extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      <Helmet
        title="Cari Internship"
        meta={[
          { name: 'description', content: 'Description of CariInternship' },
        ]}
      /> 
        <Navbar />
        <div className={styles.cariInternship}>
          <div className="row">
            <div className="small-6 columns">
              <SectionTitle><FormattedMessage {...messages.header} /></SectionTitle>
            </div>
            <div className="small-6 columns">
              <div className="float-right">
                <Select className={styles.sortBySelect}>
                  <option>Urutkan Berdasarkan</option>
                  <option>U</option>
                  <option>UA</option>
                </Select>
              </div>
            </div>
            <div className="small-12 columns">
              <FilterBar />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = selectCariInternship();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CariInternship);
