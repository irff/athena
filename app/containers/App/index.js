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
import { selectGlobalToJS } from './selectors';
import { ThemeProvider } from 'styled-components';

import AppleIcon from 'apple-touch-icon.png';
import Favicon32 from 'favicon-32x32.png';
import Favicon16 from 'favicon-16x16.png';
import MaskIcon from 'safari-pinned-tab.svg';
import Favicon from 'static?!favicon.ico?output=favicon.ico';
import Manifest from '!file?name=[name].[ext]!manifest.json';

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
              { name: 'apple-mobile-web-app-title', content: 'Quint' },
              { name: 'application-name', content: 'Quint' },
              { name: 'theme-color', content: '#FFFFFF' },
            ]}
            link={[
              { rel: 'apple-touch-icon', sizes: '180x180', href: `${AppleIcon}?v=quint1.1` },
              { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${Favicon32}?v=quint1.1` },
              { rel: 'icon', type: 'image/png', sizes: '16x16', href: `${Favicon16}?v=quint1.1` },
              { rel: 'mask-icon', color: 'e5d224', href: `${MaskIcon}?v=quint1.1` },
              { rel: 'shortcut icon', href: `${Favicon}?v=quint1.1` },
              { rel: 'manifest', href: Manifest },
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

const mapStateToProps = selectGlobalToJS();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
