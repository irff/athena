/*
 *
 * Perusahaan
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { selectGlobal } from 'containers/App/selectors';

export class Perusahaan extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    global: PropTypes.object,
    push: PropTypes.func,
  };

  constructor(props) {
    super(props);
    if (window.location.pathname === '/perusahaan' || window.location.pathname === '/perusahaan/') {
      if (this.props.global.get('loggedIn')) {
        this.props.push('/perusahaan/lihat-pendaftar');
      } else {
        this.props.push('/perusahaan/login');
      }
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  global: selectGlobal(),
});

function mapDispatchToProps(dispatch) {
  return {
    push: url => dispatch(push(url)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Perusahaan);
