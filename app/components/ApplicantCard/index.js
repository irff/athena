/**
*
* ApplicantCard
*
*/

import React from 'react';
import styled from 'styled-components';

function ApplicantCard() {
  return (
    <Card>
      <div className="wrapper">
        <div className="profile">
          <div className="head">
            <h1>Uvuvwevwe Onyetenyevwe Ugwemubwem Ossas</h1>
            <div className="links">
              <a className="linkedin" href="https://linkedin.com/">LinkedIn</a>
              <a className="resume" href="https://drive.google.com/">Resume</a>
            </div>
          </div>
          <p>Former Product Designer at Google</p>
        </div>
        <div className="counter">
          <h1>88</h1>
          <h2>penghargaan</h2>
        </div>
        <div className="counter">
          <h1>88</h1>
          <h2>pengalaman</h2>
        </div>
        <div className="counter">
          <h1>88</h1>
          <h2>proyek</h2>
        </div>
        <div className="status">
          <h2>Update status</h2>
        </div>
      </div>
    </Card>
  );
}

const Card = styled.div`
  background: ${props => props.theme.white};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 1.5rem;
  padding: 1.5rem;

  .wrapper {
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.black};

    @media screen and (min-width: 40em) {
      flex-direction: row;
    }

    h1, h2 {
      font-weight: 700;
      line-height: 1;
    }

    .profile {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;

      h1 {
        font-size: 1.25rem;
        margin-bottom: .875rem;
      }

      p {
        font-size: .875rem;
        line-height: 1;
      }

      @media screen and (min-width: 40em) {
        p {
          margin: 0;
        }
      }

      .head {
        display: flex;
        flex-direction: column;
        margin-bottom: 1.25rem;

        @media screen and (min-width: 40em) {
          flex-direction: row;
          margin-bottom: 0;
        }

        h1 {
          flex: 1;
        }

        .links a {
          color: ${props => props.theme.white};
          font-size: .875rem;
          font-weight: 700;
          padding: .375rem;
          border-radius: 3px;
          margin-right: 1.125rem;
        }

        .linkedin {
          background: ${props => props.theme.lightBlue};
        }

        .resume {
          background: ${props => props.theme.gray};
        }
      }
    }

    .counter {
      min-width: 6.75rem;
      text-align: center;
      padding: 0.5rem;

      @media screen and (min-width: 40em) {
        border-left: 1px solid ${props => props.theme.altGray};
      }

      h1 {
        font-size: 1.5rem;
      }

      h2 {
        font-size: .875rem;
        color: ${props => props.theme.darkGray};
      }
    }

    .status {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      padding: 1.25rem;

      @media screen and (min-width: 40em) {
        margin: -1.5rem;
        margin-left: 0;
        border-left: 1px solid ${props => props.theme.lightGray};
      }

      h2 {
        font-size: .875rem;
        color: ${props => props.theme.gray};
      }
    }
  }
`;

export default ApplicantCard;
