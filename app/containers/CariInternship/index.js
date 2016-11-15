/*
 *
 * CariInternship
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isEmpty } from 'lodash';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import selectCariInternship from './selectors';
import { selectGlobal } from 'containers/App/selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

import Navbar from 'containers/Navbar';
import Footer from 'components/Footer';
import { loading, loadingDone } from 'containers/App/actions';

import List from 'components/List';
import SectionTitle from 'components/SectionTitle';
import InternshipPostCard from 'containers/InternshipPostCard';
import ApplyInternship from 'containers/ApplyInternship';

import { loadData } from './actions';
import { fetchUserData } from 'containers/UserAccess/actions';

export class CariInternship extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    push: React.PropTypes.func,
    global: React.PropTypes.object,
    cariInternship: React.PropTypes.object,
    loadData: React.PropTypes.func,
    loading: React.PropTypes.func,
    loadingDone: React.PropTypes.func,
    fetchUserData: React.PropTypes.func,
  };

  componentWillMount() {
    /*eslint camelcase: ["error", {properties: "never"}]*/
    const token = this.getCookie('token');
    const student_id = this.getCookie('student_id');

    if (this.props.global.get('token') === '' || this.props.global.get('id') === '') {
      if (token !== '' && student_id !== '') {
        this.props.fetchUserData({ token: token, student_id: student_id });
      } else {
        this.props.push('/mahasiswa/login');
      }
    }
  }

  componentDidMount() {
    this.props.loadData();
    this.props.loadingDone();
  }

  componentWillUnmount() {
    this.props.loading();
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

  render() {
    /*eslint react/jsx-boolean-value: ["error", {properties: "always"}]*/
    let mainContent = null;
    
    if (!isEmpty(this.props.cariInternship.posts)) {
      mainContent = (<List items={this.props.cariInternship.posts} component={InternshipPostCard} validation={this.props.cariInternship.applied.jobs_id}/>);
    }

    return (
      <div>
        <Helmet
          title="Cari Internship - Quint.id"
          meta={[
            { name: 'description', content: 'Cari Internship di Quint.id' },
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
        <Footer hasMargin />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  global: selectGlobal(),
  cariInternship: selectCariInternship(),
});

function mapDispatchToProps(dispatch) {
  return {
    push: (url) => dispatch(push(url)),
    loadData: () => dispatch(loadData()),
    loading: () => dispatch(loading()),
    loadingDone: () => dispatch(loadingDone()),
    fetchUserData: (data) => dispatch(fetchUserData(data)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CariInternship);
