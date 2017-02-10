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

import Navbar from 'containers/Navbar';
import Footer from 'components/Footer';
import SectionTitle from 'components/SectionTitle';

import styled from 'styled-components';

const ContentContainer = styled.div`
  min-height: calc(100vh - 3rem);
  padding: 8rem 1rem 1rem;
`;

const ProfileModule = styled.div`
  width: 100%;
  background: ${props => props.theme.darkBlack};

  .topModule {
    padding: 2.5rem;

    h1,
    h2 {
      color: ${props => props.theme.white};
    }

    h1 {
      font-size: 2.25rem;
      font-weight: 700;
      line-height: 1;
      margin: 0;
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 1rem;
      line-height: 1;
      margin: 0;
    }
  }

  .bottomModule {
    background: ${props => props.theme.lightBlack};
    padding: 1.25rem 2.5rem;

    .counterContainer {
      width: auto;
      display: inline-block;
      float: left;

      &.withDivider {
        border-right: 1px solid ${props => props.theme.gray};
        padding-right: 2.5rem;
        margin-right: 2.5rem;
      }
    }

    h1,
    h2 {
      color: ${props => props.theme.white};
      text-align: center;
    }

    h1 {
      font-size: 2rem;
      font-weight: 700;
      line-height: 1;
      margin: 0;
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 1rem;
      line-height: 1;
      margin: 0;
    }

    button {
      background: ${props => props.theme.yellow};
      color: ${props => props.theme.lightBlack};
      border-radius: 0.2rem;
      padding: 0.5rem 3.5rem;
      font-size: 1rem;
      font-weight: 700;
      display: inline-block;
      float: right;
      margin-top: 1rem;
    }
  }
`;

const EntriesModule = styled.div`
  width: 100%;
  padding: 2rem 0;
  
  .title {
    color: ${props => props.theme.black};
    margin: 0;
    line-height: 0;
    font-size: 1rem;
  }

  .isEmpty {
    display: block;
    width: 100%;
    text-align: center;
    padding: 5rem 1rem;

    p {
      color: ${props => props.theme.black};
      margin: 0;
      line-height: 1;
      font-size: 1.1rem;

      button {
        display: inline;
        font-weight: 700;
        border-bottom: 1px solid ${props => props.theme.black};
      }
    }
  }
`;

export class Mahasiswa extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
    global: React.PropTypes.object,
    mahasiswa: React.PropTypes.object,
    push: React.PropTypes.func,
  };

  // disable this constructor redirect for development acceleration
  // constructor(props) {
  //   super(props);

  //   if (window.location.pathname === '/mahasiswa' || window.location.pathname === '/mahasiswa/') {
  //     if (this.props.global.get('loggedIn')) {
  //       this.props.push('/mahasiswa/cari-internship');
  //     } else {
  //       this.props.push('/mahasiswa/login');
  //     }
  //   }
  // }

  render() {
    let mainContent = (
      <div>
        <Helmet
          title="Cari Internship - Quint.id"
          meta={[
            { name: 'description', content: 'Cari Internship di Quint.id' },
          ]}
        />
        <Navbar />
        <ContentContainer>
          <div className="row">
            <div className="small-12 columns">
              <SectionTitle>Dashboard</SectionTitle>
            </div>
            <div className="small-12 columns">
              <ProfileModule>
                <div className="row expanded">
                  <div className="small-12 columns">
                    <div className="topModule">
                      <h1>Darth Jar Jar</h1>
                      <h2>The one true Sith Lord. former gungan exiled certified badass.</h2>
                    </div>
                  </div>
                  <div className="small-12 columns">
                    <div className="bottomModule">
                      <div className="row expanded">
                        <div className="small-12 columns">
                          <div className="counterContainer withDivider">
                            <h1>0</h1>
                            <h2>didaftarkan</h2>
                          </div>
                          <div className="counterContainer withDivider">
                            <h1>0</h1>
                            <h2>dalam proses</h2>
                          </div>
                          <div className="counterContainer withDivider">
                            <h1>0</h1>
                            <h2>diterima</h2>
                          </div>
                          <div className="counterContainer">
                            <h1>0</h1>
                            <h2>ditolak</h2>
                          </div>
                          <button>Ubah Profil</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ProfileModule>
            </div>
            <div className="small-12 columns">
              <EntriesModule>
                <h1 className="title">Perusahaan yang telah didaftar:</h1>
                <div className="isEmpty">
                  <p>
                    Belum ada internship terdaftar.
                    <br />
                    Ayo <button>Cari Internship</button> Sekarang
                  </p>
                </div>
              </EntriesModule>
            </div>
          </div>
        </ContentContainer>
        <Footer hasMargin />
      </div>
    );

    if (!isEmpty(this.props.children)) {
      mainContent = <div>{React.Children.toArray(this.props.children)}</div>;
    }

    return (
      <div>
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
