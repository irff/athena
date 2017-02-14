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
import CompanyHeader from 'components/CompanyHeader';

export class CompanyDashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="CompanyDashboard"
          meta={[
            { name: 'description', content: 'Description of CompanyDashboard' },
          ]}
        />

        <Navbar />

        <ContentContainer>
          <div className="row">
            <div className="small-12 columns">
              <SectionTitle>Dashboard</SectionTitle>
            </div>
            <div className="small-12 columns">
              <CompanyHeader />
            </div>
            <div className="small-12 columns sectionMargin">
              <Accordion>
                <Accordion.Item title={<span><strong>Pendaftar Baru &middot;</strong> 0 pendaftar</span>} backgroundColor="#5fb81e">
                  <p>lorem ipsum</p>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="small-12 columns">
              <SectionTitle>Data Pendaftar</SectionTitle>
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
