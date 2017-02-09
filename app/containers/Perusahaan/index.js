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
import isEmpty from 'lodash/lang/isEmpty';

export class Perusahaan extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    global: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
    if (window.location.pathname === '/perusahaan' || window.location.pathname === '/perusahaan/') {
      if (this.props.global.get('loggedIn')) {
        this.props.push('/perusahaan/home');
      } else {
        this.props.push('/perusahaan/login');
      }
    }
  }

  render() {
    let mainContent = null;

    if (!isEmpty(this.props.children)) {
      mainContent = <div>{React.Children.toArray(this.props.children)}</div>;
    }

    return mainContent;
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
