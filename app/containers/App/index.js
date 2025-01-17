/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { selectGlobal } from './selectors';
import { ThemeProvider } from 'styled-components';

import theme from 'theme';

export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
    loading: React.PropTypes.bool,
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Helmet
            titleTemplate="%s - Quint"
            defaultTitle="Quint.id - Quality Internship for you"
            meta={[
              { name: 'description', content: 'Quality Internship for Talented Students, Top Universities, and Qualified Companies.' },
            ]}
          />
          {React.Children.toArray(this.props.children)}
          <div className="spinnerContainer" style={{ display: this.props.loading ? 'block' : 'none' }}>
            <div className="spinnerContent">
              <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
                <div className="double-bounce3"></div>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = selectGlobal();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
