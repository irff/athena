/**
*
* AlertSuccess
*
*/

import React from 'react';
import styled from 'styled-components';
import iconSuccess from './checked.png';

function AlertSuccess({ children, doneText, onDoneClick }) {
  return (
    <Card>
      <Content>
        <img src={iconSuccess} alt="success icon" />
        {children}
      </Content>
      <Button onClick={onDoneClick}>{doneText}</Button>
    </Card>
  );
}

AlertSuccess.propTypes = {
  children: React.PropTypes.node,
  doneText: React.PropTypes.string.isRequired,
  onDoneClick: React.PropTypes.func,
};

const Card = styled.div`
  background: ${props => props.theme.white};
  width: 35.375rem;
  max-width: 100%;
  font-size: 0.875rem;

  img {
    width: 7.75rem;
    height: 7.75rem;
    max-width: 100%;
    margin-bottom: 2rem;
  }
`;

const Content = styled.div`
  padding: 2.375rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.div`
  width: 100%;
  padding: 0.75rem;
  background: ${props => props.theme.lightGray};
  color: ${props => props.theme.black};
  font-weight: 400;
  font-size: 0.75rem;
  text-align: center;
  cursor: pointer;
`;

export default AlertSuccess;
