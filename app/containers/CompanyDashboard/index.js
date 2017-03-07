/*
 *
 * CompanyDashboard
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import selectCompanyDashboard from './selectors';
import { selectGlobal } from 'containers/App/selectors';
import styled from 'styled-components';
import Accordion from 'components/Accordion';
import Navbar from 'containers/Navbar';
import Footer from 'components/Footer';
import SectionTitle from 'components/SectionTitle';
import CompanyInfoCard from 'components/CompanyInfoCard';
import { loading } from 'containers/App/actions';
import { fetchUserData } from 'containers/UserAccess/actions';
import { initialFetch } from './actions';
import SubsectionTitle from 'components/SubsectionTitle';
import ApplicantCard from 'components/ApplicantCard';
import Modal from 'components/Modal';
import { isEmpty } from 'lodash';
import RejectionLetterPrompt from 'components/RejectionLetterPrompt';

import searchIcon from './search.svg';

export class CompanyDashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    push: React.PropTypes.func,
    global: React.PropTypes.object,
    local: React.PropTypes.object,
    loading: React.PropTypes.func,
    fetchUserData: React.PropTypes.func,
    initialFetch: React.PropTypes.func,
  };

  componentDidMount() {
    const token = this.getCookie('company_token');
    const companyId = this.getCookie('company_id');

    if (this.props.global.token === '' || this.props.global.id === '') {
      this.props.loading();
      if (token !== '' && companyId !== '') {
        this.props.fetchUserData({ token, id: companyId, isCompany: true });
      } else {
        this.props.push('/perusahaan/login');
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

  titleCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => (word.charAt(0).toUpperCase() + word.slice(1)))
      .join(' ');
  }

  formatStatusOptions(status) {
    return status
      .filter(st => st.value !== 'RESUME_REVIEWED')
      .map(st => ({ ...st, text: this.titleCase(st.text) }));
  }

  renderEmptyState() {
    return (
      <EmptyStateWrapper>
        <img src={searchIcon} alt="empty" />
        <div>Belum ada Posisi Intern yang ditawarkan.</div>
        <div><button onClick={() => this.props.push('/perusahaan/new-job')}>Tambah Posisi Intern</button> Sekarang</div>
      </EmptyStateWrapper>
    );
  }

  renderEmptyApplicants() {
    return (
      <EmptyStateWrapper padding="2.875rem">
        <img src={searchIcon} alt="empty" />
        <div>Belum ada pendaftar di posisi ini.</div>
      </EmptyStateWrapper>
    );
  }

  render() {
    const { local } = this.props;
    const newApplicants = local.new_applications.filter(item => item.applicant_num > 0);
    const newApplicantsNum = newApplicants.reduce((sum, o) => sum + o.applicant_num, 0);

    return (
      <div>
        <Helmet
          title="Dasbor Perusahaan"
          meta={[
            { name: 'description', content: 'Dasbor Perusahaan' },
          ]}
        />

        <Navbar />

        <ContentContainer>
          <div className="row">
            <div className="small-12 columns">
              <SectionTitle>Dashboard</SectionTitle>
            </div>
            {JSON.stringify(this.props.global)}
            <div className="small-12 columns">
              <CompanyInfoCard
                {...this.props.global.userData}
                {...this.props.local.statistics}
                onAddJob={() => this.props.push('/perusahaan/new-job')}
                onEditProfile={() => this.props.push('/perusahaan/edit-profil')}
              />
            </div>
            {newApplicantsNum > 0 &&
              <div className="small-12 columns sectionMargin">
                <Accordion initialState={[0]}>
                  <Accordion.Item title={<span><strong>Pendaftar Baru &middot;</strong> {newApplicantsNum} pendaftar</span>} backgroundColor="#5fb81e">
                    {newApplicants.map((item, k) =>
                      <div key={k}>
                        <SubsectionTitle>{item.role}</SubsectionTitle>
                        {item.applicants.map((applicant, idx) =>
                          <ApplicantCard key={idx} {...applicant} statusOptions={this.formatStatusOptions(item.status)} />
                        )}
                      </div>
                    )}
                  </Accordion.Item>
                </Accordion>
              </div>
            }
            <div className="small-12 columns">
              <SectionTitle>Data Pendaftar</SectionTitle>
              {!local.applications && this.renderEmptyState()}
              <Accordion>
                {local.applications.map((application, k1) =>
                  <Accordion.Item key={k1} title={<span><strong>{application.role} &middot;</strong> {application.applicant_num} pendaftar</span>}>
                    {!application.applicant_num && this.renderEmptyApplicants()}
                    {application.applicants.map((applicant, k2) =>
                      <ApplicantCard key={k2} {...applicant} statusOptions={this.formatStatusOptions(application.status)} />
                    )}
                  </Accordion.Item>
                )}
              </Accordion>
            </div>
          </div>
        </ContentContainer>

        <Modal>
          <RejectionLetterPrompt to="John Maeda" />
        </Modal>

        <Footer hasMargin />
      </div>
    );
  }
}


const EmptyStateWrapper = styled.div`
  padding: ${props => (props.padding ? props.padding : '4.5rem')} 0;
  text-align: center;
  color: ${props => props.theme.gray};

  img {
    margin-bottom: 1.375rem;
  }

  button {
    color: ${props => props.theme.darkGray};
    font-weight: 700;
    text-decoration: underline;
  }
`;

const ContentContainer = styled.div`
  min-height: calc(100vh - 3rem);
  padding: 8rem 1rem 1rem;

  .sectionMargin {
    margin-bottom: 2.75rem;
  }
`;

const mapStateToProps = createStructuredSelector({
  global: selectGlobal(),
  local: selectCompanyDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    push: (url) => dispatch(push(url)),
    loading: () => dispatch(loading()),
    fetchUserData: (val) => dispatch(fetchUserData(val)),
    initialFetch: () => dispatch(initialFetch()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDashboard);
