/*
 *
 * CariInternship
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import Helmet from 'react-helmet';
import selectCariInternship from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

import Navbar from 'containers/Navbar';
import Footer from 'components/Footer';
import { loading, loadingDone } from 'containers/App/actions';

import Select from 'components/Select';
import List from 'components/List';
import SectionTitle from 'components/SectionTitle';
import FilterBar from 'containers/FilterBar';
import InternshipPostCard from 'containers/InternshipPostCard';
import ApplyInternship from 'containers/ApplyInternship';

import { loadData } from './actions';

export class CariInternship extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    posts: React.PropTypes.array,
    loadData: React.PropTypes.func,
    loading: React.PropTypes.func,
    loadingDone: React.PropTypes.func,
  };

  componentDidMount() {
    this.props.loadData();
  }

  componentWillMount() {
    this.props.loadingDone();
  }

  componentWillUnmount() {
    this.props.loading();
  }


  render() {
    let mainContent = null;
    
    if(!isEmpty(this.props.posts)) {
      mainContent = (<List items={this.props.posts} component={InternshipPostCard} />);
    }

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
            {mainContent}
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
    loadData: () => dispatch(loadData()),
    loading: () => dispatch(loading()),
    loadingDone: () => dispatch(loadingDone()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CariInternship);
