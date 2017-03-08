/**
*
* SubsectionTitle
*
*/

import React from 'react';
import styled from 'styled-components';

const Content = styled.h1`
  color: ${props => props.theme.darkGray};
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1;
  margin: 0;
  margin-top: 0.6875rem;
  margin-bottom: 0.875rem;
`;

const SubsectionTitle = (props) => (
  <Content>
    {React.Children.toArray(props.children)}
  </Content>
);

SubsectionTitle.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default SubsectionTitle;
