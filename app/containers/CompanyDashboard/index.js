/*
 *
 * CompanyDashboard
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectCompanyDashboard from './selectors';

import styled from 'styled-components';

import Accordion from 'components/Accordion';
import Navbar from 'containers/Navbar';
import Footer from 'components/Footer';
import SectionTitle from 'components/SectionTitle';
import CompanyInfoCard from 'components/CompanyInfoCard';
import SubsectionTitle from 'components/SubsectionTitle';
import ApplicantCard from 'components/ApplicantCard';

import searchIcon from './search.svg';

export class CompanyDashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  renderEmptyState() {
    return (
      <EmptyStateWrapper>
        <img src={searchIcon} alt="empty" />
        <div>Belum ada Posisi Intern yang ditawarkan.</div>
        <div><a href="http://null">Tambah Posisi Intern</a> Sekarang</div>
      </EmptyStateWrapper>
    );
  }

  render() {
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
            <div className="small-12 columns">
              <CompanyInfoCard />
            </div>
            <div className="small-12 columns sectionMargin">
              <Accordion initialState={[0]}>
                <Accordion.Item title={<span><strong>Pendaftar Baru &middot;</strong> 0 pendaftar</span>} backgroundColor="#5fb81e">
                  <SubsectionTitle>Product Designer Intern</SubsectionTitle>
                  <ApplicantCard />
                  <ApplicantCard />
                  <SubsectionTitle>Software Engineer Intern</SubsectionTitle>
                  <ApplicantCard />
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="small-12 columns">
              <SectionTitle>Data Pendaftar</SectionTitle>
              {this.renderEmptyState()}
              <Accordion>
                <Accordion.Item title={<span><strong>Product Designer Intern &middot;</strong> 0 pendaftar</span>}>
                  <p>lorem ipsum</p>
                </Accordion.Item>
                <Accordion.Item title="asd">
                  <p>lorem ipsum</p>
                </Accordion.Item>
                <Accordion.Item title="asd">
                  <p>lorem ipsum</p>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </ContentContainer>

        <Footer hasMargin />
      </div>
    );
  }
}


const EmptyStateWrapper = styled.div`
  padding: 4.5rem 0;
  text-align: center;
  color: ${props => props.theme.gray};

  img {
    margin-bottom: 1.375rem;
  }

  a {
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

const mapStateToProps = selectCompanyDashboard();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDashboard);
