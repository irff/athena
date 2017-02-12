/**
*
* SectionTitle
*
*/

import React from 'react';
import styled from 'styled-components';

const Content = styled.h1`
  color: ${props => props.theme.black};
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
  margin: 0;
  margin-bottom: 2rem;
`;

function SectionTitle(props) {
  return (
    <Content>
      {React.Children.toArray(props.children)}
    </Content>
  );
}

SectionTitle.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default SectionTitle;
