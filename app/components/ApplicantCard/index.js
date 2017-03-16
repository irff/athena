/**
*
* ApplicantCard
*
*/

import React from 'react';
import styled from 'styled-components';

function ApplicantCard({ student, status, statusOptions, email, onLinkedinClicked, onResumeClicked, onStatusChange, disabled }) {
  const onLinkedin = () => {
    if (typeof onLinkedinClicked === 'function') onLinkedinClicked();
    window.open(student.linkedin_url, '_blank');
  };

  const onResume = () => {
    if (typeof onResumeClicked === 'function') onResumeClicked();
    window.open(student.resume_url, '_blank');
  };

  return (
    <Card disabled={disabled}>
      <div className="wrapper">
        <div className="profile">
          <div className="head">
            <h1>{student.first_name} {student.last_name}</h1>
            <div className="links">
              <button onClick={onLinkedin} className="linkedin">LinkedIn</button>
              <button onClick={onResume} className="resume">Resume</button>
            </div>
          </div>
          <p>{student.headline}</p>
          <a className="email" href={`mailto:${email}`}>{email}</a>
        </div>
        <div className="counter">
          <h1>{student.experiences.achievement_num}</h1>
          <h2>penghargaan</h2>
        </div>
        <div className="counter">
          <h1>{student.experiences.work_num}</h1>
          <h2>pengalaman</h2>
        </div>
        <div className="counter">
          <h1>{student.experiences.project_num}</h1>
          <h2>proyek</h2>
        </div>
        <div className="status">
          <h2>Update status</h2>
          <SelectStatus
            value={status === 'RESUME_REVIEWED' ? 'WAIT_FOR_REVIEW' : status}
            onChange={e => onStatusChange(e.target.value)}
          >
            {statusOptions.map((item, key) =>
              <option key={key} value={item.value} disabled={item.value === 'WAIT_FOR_REVIEW'}>{item.text}</option>
            )}
          </SelectStatus>
        </div>
      </div>
    </Card>
  );
}

ApplicantCard.propTypes = {
  student: React.PropTypes.object,
  status: React.PropTypes.string.isRequired,
  statusOptions: React.PropTypes.array.isRequired,
  email: React.PropTypes.string.isRequired,
  onLinkedinClicked: React.PropTypes.func,
  onResumeClicked: React.PropTypes.func,
  onStatusChange: React.PropTypes.func,
  disabled: React.PropTypes.bool,
};

const Card = styled.div`
  background: ${props => props.theme.white};
  ${props => (props.disabled ? 'pointer-events: none; opacity: 0.75' : '')}
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 1.5rem;
  padding: 1.5rem;

  .wrapper {
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.black};

    @media screen and (min-width: 40em) {
      flex-direction: row;
      align-items: center;
    }

    h1, h2 {
      font-weight: 700;
      line-height: 1;
    }

    .profile {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;

      h1 {
        font-size: 1.25rem;
        margin-bottom: .875rem;
        flex: 1;
      }

      p {
        font-size: .875rem;
        line-height: 1;
      }

      a.email {
        font-size: .875rem;
        color: ${props => props.theme.black};
        text-decoration: underline;
      }

      @media screen and (min-width: 40em) {
        a {
          margin: 0;
        }
      }

      .head {
        display: flex;
        flex-direction: column;
        margin-bottom: 1.25rem;
        overflow: hidden;

        @media screen and (min-width: 60em) {
          flex-direction: row;
          margin-bottom: 0;
        }

        & > h1 {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .links button {
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
      max-height: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;

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

const SelectStatus = styled.select`
  border-radius: 0.15rem;
  background: ${props => props.theme.lightBlue};
  color: ${props => props.theme.white};
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 700;
`;

export default ApplicantCard;
