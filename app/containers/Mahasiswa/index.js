/*
 *
 * Mahasiswa
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isEmpty } from 'lodash';

import selectMahasiswa from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

import Navbar from 'containers/Navbar';

export class Mahasiswa extends React.Component { // eslint-disable-line react/prefer-stateless-function
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

Mahasiswa.propTypes = {
  children: React.PropTypes.node,
};

const mapStateToProps = selectMahasiswa();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Mahasiswa);
