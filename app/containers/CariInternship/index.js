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

import AssetEmpty from './asset-empty.svg';

import Navbar from 'containers/Navbar';
import Footer from 'components/Footer';

import List from 'components/List';
import SectionTitle from 'components/SectionTitle';
import InternshipPostCard from 'containers/InternshipPostCard';
import ApplyInternship from 'containers/ApplyInternship';

import { loadData } from './actions';

import styled from 'styled-components';

const EmptyState = styled.div`
  display: ${(props) => {
    if (props.isEmpty) {
      return 'block';
    }

    return 'none';
  }};
  width: 100%;
  padding: 0 2rem 5rem;

  .asset {
    width: 100%;
    max-width: 15rem;
    margin: 7.5rem auto 3rem;
    display: block;
  }

  .info {
    display: block;
    text-align: center;
    margin: 0 auto;
    color: ${props => props.theme.black};
    margin: 0;
    line-height: 1;
    font-size: 1.1rem;

    strong {
      display: inline;
      font-weight: 700;
    }
  }
`;

export class CariInternship extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    push: React.PropTypes.func,
    global: React.PropTypes.object,
    cariInternship: React.PropTypes.object,
    loadData: React.PropTypes.func,
  };

  componentDidMount() {
    this.props.loadData();
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
    let mainContent = null;

    if (!isEmpty(this.props.cariInternship.posts)) {
      mainContent = (<List items={this.props.cariInternship.posts} component={InternshipPostCard} validation={this.props.cariInternship.applied.jobs_id} />);
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
            <EmptyState isEmpty={isEmpty(this.props.cariInternship.posts)}>
              <img className="asset" src={AssetEmpty} alt="asset" />
              <div className="info">Belum ada internship yang tersedia, silahkan cek kembali <strong>Quint.id</strong> lain waktu</div>
            </EmptyState>
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
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CariInternship);
