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

import Select from 'components/Select';
import SectionTitle from 'components/SectionTitle';
import FilterBar from 'containers/FilterBar';
import InternshipPostCard from 'containers/InternshipPostCard';
import ApplyInternship from 'containers/ApplyInternship';

import TokopediaImg from 'containers/HomePage/tokopedia.png';
import IndivaraImg from 'containers/HomePage/indivara.jpg';

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
        <ApplyInternship />
        <div className={styles.cariInternship}>
          <div className="row">
            <div className="small-12 columns">
              <SectionTitle><FormattedMessage {...messages.header} /></SectionTitle>
            </div>
            <InternshipPostCard />
            <InternshipPostCard />
            <InternshipPostCard />
            <InternshipPostCard />
          </div>
        </div>
        <Footer hasMargin={true} />
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
