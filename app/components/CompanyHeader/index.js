/**
*
* CompanyHeader
*
*/

import React from 'react';
import styled from 'styled-components';

function CompanyHeader({ title }) {
  return (
    <Wrapper>
      <div className="row">
        <div className="small-12 columns">
          <h1>{title}</h1>
        </div>
      </div>
    </Wrapper>
  );
}

CompanyHeader.propTypes = {
  title: React.PropTypes.string,
};

const Wrapper = styled.div`
  margin-top: 3rem;
  padding: 1.5rem;
  padding-top: 4.6875rem;
  padding-bottom: 2.5rem;
  background: ${props => props.theme.lightBlue};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.21);

  h1 {
    font-size: 2.25rem;
    font-weight: 700;
    color: ${props => props.theme.white};
  }
`;

export default CompanyHeader;
