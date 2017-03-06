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
import { loading, loadingDone } from 'containers/App/actions';
import { fetchUserData } from 'containers/UserAccess/actions';
import { initialFetch } from './actions';

import Navbar from 'containers/Navbar';
import Footer from 'components/Footer';
import SectionTitle from 'components/SectionTitle';
import List from 'components/List';

import InternshipPostCard from 'containers/InternshipPostCard';

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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;

    .counterContainer {
      width: auto;

      &.withDivider {
        border-right: 1px solid ${props => props.theme.gray};
        padding-right: 2.5rem;
        margin-right: 2.5rem;
      }
    }

    .ubahProfilButton {
      flex: 1;
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
      font-size: 0.8rem;
      line-height: 1;
      margin: 0;
    }

    button {
      float: right;
      background: ${props => props.theme.yellow};
      color: ${props => props.theme.lightBlack};
      border-radius: 0.2rem;
      padding: 0.5rem 3.5rem;
      font-size: 1rem;
      font-weight: 700;
      margin-top: 1rem;
    }

    @media screen and (max-width: 64em) {
      .counterContainer {
        width: 25%;

        &.withDivider {
          padding: 0 1rem;
          margin-right: 0;
        }
      }

      .ubahProfilButton {
        width: 100%;
        text-align: center;
        padding: 1rem;
      }

      button {
        width: 100%;
        float: none;
      }
    }

    @media screen and (max-width: 40em) {
      .counterContainer {
        width: 50%;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid ${props => props.theme.gray};
        
        &.withDivider {
          border-right: none;
          padding: 0 0 1rem;
          margin-right: 0;
        }      
      }
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

  .content {
    display: ${(props) => {
      if (props.isEmpty) {
        return 'none';
      }
      return 'block';
    }};
    width: 100%;
    padding: 2rem 0;
  }

  .isEmpty {
    display: ${props => {
      if (props.isEmpty) {
        return 'block';
      }
      return 'none';
    }};
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
    loading: React.PropTypes.func,
    fetchUserData: React.PropTypes.func,
    initialFetch: React.PropTypes.func,
  };

  // disable this constructor redirect for development acceleration
  constructor(props) {
    super(props);

    if (window.location.pathname === '/mahasiswa' || window.location.pathname === '/mahasiswa/') {
      if (!this.props.global.loggedIn) {
        this.props.push('/mahasiswa/login');
      }
    }
  }

  componentDidMount() {
    const token = this.getCookie('token');
    const studentId = this.getCookie('student_id');

    if (this.props.global.token === '' || this.props.global.id === '') {
      this.props.loading();
      if (token !== '' && studentId !== '') {
        this.props.fetchUserData({ token, student_id: studentId });
      } else {
        this.props.push('/mahasiswa/login');
      }
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.global.currentToken === '' && this.props.global.id === '') {
      if (nextProps.global.currentToken !== '' && nextProps.global.id !== '') {
        this.props.initialFetch();
      }
    } else if (isEmpty(nextProps.children)) {
      this.props.initialFetch();
    }
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
    let jobList = null;

    if (!isEmpty(this.props.mahasiswa.jobs)) {
      jobList = (<List items={this.props.mahasiswa.jobs} component={InternshipPostCard} flex dashboardCard />);
    }

    const { userData } = this.props.global;

    let mainContent = (
      <div>
        <Helmet
          titleTemplate="%s - Mahasiswa - Quint"
          title="Dashboard"
          defaultTitle="Dashboard"
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
                      <h1>{userData.first_name} {userData.last_name}</h1>
                      <h2>{userData.headline}</h2>
                    </div>
                  </div>
                  <div className="small-12 columns">
                    <div className="bottomModule">
                      <div className="counterContainer withDivider">
                        <h1>{this.props.mahasiswa.registered_num}</h1>
                        <h2>didaftarkan</h2>
                      </div>
                      <div className="counterContainer withDivider">
                        <h1>{this.props.mahasiswa.processed_num}</h1>
                        <h2>dalam proses</h2>
                      </div>
                      <div className="counterContainer withDivider">
                        <h1>{this.props.mahasiswa.accepted_num}</h1>
                        <h2>diterima</h2>
                      </div>
                      <div className="counterContainer">
                        <h1>{this.props.mahasiswa.rejected_num}</h1>
                        <h2>ditolak</h2>
                      </div>
                      <div className="ubahProfilButton">
                        <button onClick={() => this.props.push('/mahasiswa/ubah-profil')}>Ubah Profil</button>
                      </div>
                    </div>
                  </div>
                </div>
              </ProfileModule>
            </div>
            <div className="small-12 columns">
              <EntriesModule isEmpty={isEmpty(this.props.mahasiswa.jobs)}>
                <h1 className="title">Perusahaan yang telah didaftar:</h1>
                <div className="content">
                  {jobList}
                </div>
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
    loading: () => dispatch(loading()),
    loadingDone: () => dispatch(loadingDone()),
    fetchUserData: (data) => dispatch(fetchUserData(data)),
    initialFetch: () => dispatch(initialFetch()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Mahasiswa);
