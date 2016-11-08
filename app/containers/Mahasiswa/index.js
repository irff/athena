/*
 *
 * Mahasiswa
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import { isEmpty } from 'lodash';
import { createStructuredSelector } from 'reselect';

import selectMahasiswa from './selectors';
import { selectGlobal } from 'containers/App/selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

import Navbar from 'containers/Navbar';

export class Mahasiswa extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
    global: React.PropTypes.object,
    mahasiswa: React.PropTypes.object,
    push: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    if(window.location.pathname == '/mahasiswa' || window.location.pathname == '/mahasiswa/') {
      if(this.props.global.get('loggedIn')) {
        this.props.push('/mahasiswa/cari-internship');
      } else {
        this.props.push('/mahasiswa/login');
      }
    }
  }

  render() {

    let mainContent = <div><FormattedMessage {...messages.header} /></div>;

    if(!isEmpty(this.props.children)) {
      mainContent = <div>{React.Children.toArray(this.props.children)}</div>;
    }

    return (
      <div className={styles.mahasiswa}>
      <Helmet
        title="Mahasiswa"
        meta={[
          { name: 'description', content: 'Description of Mahasiswa' },
        ]}
      />
        {mainContent}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  global: selectGlobal(),
  mahasiswa: selectMahasiswa(),
});

function mapDispatchToProps(dispatch) {
  return {
    push: (url) => dispatch(push(url)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Mahasiswa);
