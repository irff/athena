/**
*
* CompanyInfoCard
*
*/

/* eslint-disable camelcase */

import React from 'react';
import styled from 'styled-components';

const CompanyInfoCard = ({
    onAddJob,
    onEditProfile,
    name,
    category,
    website,
    description,
    logo_url,
    accepted_num,
    applicant_num,
    in_progress_num,
    job_num,
    rejected_num,
  }) => (
  <CompanyInfoCardWrapper>
    <div className="row expanded">
      <div className="small-12 columns">
        <div className="topModule">
          <div className="row">
            <div className="medium-1 columns">
              <img src={logo_url} alt="logo" />
            </div>
            <div className="medium-6 columns">
              <h1>{name} <small>&middot; &nbsp; {category}</small></h1>
              <div className="companyLinks">
                <a href={website}>{website}</a>
              </div>
              <p>{description}</p>
            </div>
            <div className="medium-3 medium-offset-2 columns contactPerson">
            </div>
          </div>
        </div>
      </div>
      <div className="small-12 columns">
        <div className="bottomModule">
          <div className="row expanded">
            <div className="small-12 columns">
              <div className="counterContainer first">
                <h1>{job_num}</h1>
                <h2>posisi intern</h2>
              </div>
              <div className="counterContainer">
                <h1>{applicant_num}</h1>
                <h2>pendaftar</h2>
              </div>
              <div className="counterContainer">
                <h1>{accepted_num}</h1>
                <h2>diterima</h2>
              </div>
              <div className="counterContainer">
                <h1>{in_progress_num}</h1>
                <h2>dalam proses</h2>
              </div>
              <div className="counterContainer">
                <h1>{rejected_num}</h1>
                <h2>ditolak</h2>
              </div>
              <button onClick={onEditProfile}>Ubah Profil Perusahaan</button>
            </div>
          </div>
        </div>
      </div>
      <div className="small-12 columns">
        <button className="addJob" onClick={onAddJob}>+ Tambah Lowongan Posisi Intern</button>
      </div>
    </div>
  </CompanyInfoCardWrapper>
);

CompanyInfoCard.propTypes = {
  name: React.PropTypes.string,
  category: React.PropTypes.string,
  website: React.PropTypes.string,
  description: React.PropTypes.string,
  logo_url: React.PropTypes.string,
  accepted_num: React.PropTypes.number,
  applicant_num: React.PropTypes.number,
  in_progress_num: React.PropTypes.number,
  job_num: React.PropTypes.number,
  rejected_num: React.PropTypes.number,
  onAddJob: React.PropTypes.func,
  onEditProfile: React.PropTypes.func,
};

const CompanyInfoCardWrapper = styled.div`
  width: 100%;
  background: ${props => props.theme.darkBlack};
  margin-bottom: 3.875rem;

  .topModule {
    padding: 2rem;
    padding-bottom: 1.1875rem;
    font-size: 0.75rem;
    color: ${props => props.theme.white};

    h1 {
      font-size: 2.25rem;
      font-weight: 700;
      line-height: 1;
      margin: 0;
      margin-bottom: 1rem;

      small {
        font-size: 1.125rem;
      }
    }

    h2 {
      font-size: 1rem;
      line-height: 1;
      margin: 0;
    }

    img {
      height: calc(4rem - 4px);
      width: calc(4rem - 4px);
    }

    .logoWrapper {
      width: 4rem;
      float: left;
      display: inline-block;
    }

    .contactPerson {
      p {
        margin: 0;
        line-height: 1.25;
      }

      h3 {
        font-size: 0.75rem;
      }
    }

    .companyLinks {

      margin-bottom: 0.7rem;

      a {
        color: ${props => props.theme.white};
      }

    }
  }

  .bottomModule {
    background: ${props => props.theme.lightBlack};
    padding: 1.25rem 2rem;

    .counterContainer {
      width: 7.5rem;
      display: inline-block;
      float: left;

      @media screen and (min-width: 40rem) {
        border-right: 1px solid ${props => props.theme.gray};

        &.first {
          border-left: 1px solid ${props => props.theme.gray};
        }
      }
    }

    h1,
    h2 {
      color: ${props => props.theme.white};
      text-align: center;
      line-height: 1.125;
    }

    h1 {
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
    }

    h2 {
      font-size: .875rem;
      margin: 0;
    }

    button {
      background: ${props => props.theme.lightBlue};
      color: ${props => props.theme.white};
      border-radius: 0.2rem;
      padding: 0.5rem 1rem;
      font-size: .875rem;
      font-weight: 700;
      display: inline-block;
      float: right;
      margin-top: 1rem;
    }

  }

  .addJob {
    background: ${props => props.theme.lightBlue};
    color: ${props => props.theme.white};
    padding: 1.25rem;
    text-align: center;
    width: 100%;
    font-weight: bold;
    font-size: 1.125rem;
  }
`;


export default CompanyInfoCard;
