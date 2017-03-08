/**
*
* Modal
*
*/

import React from 'react';
import styled from 'styled-components';

function Modal({ opened, opacity, children }) {
  return (
    <ModalBackground opened={opened} opacity={opacity}>
      {children}
    </ModalBackground>
  );
}

Modal.propTypes = {
  opened: React.PropTypes.bool,
  opacity: React.PropTypes.number,
  children: React.PropTypes.node,
};

const ModalBackground = styled.div`
  display: ${props => (props.opened ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, ${props => props.opacity || 0.7});
`;

export default Modal;
