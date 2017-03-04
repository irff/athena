/**
*
* RejectionLetterPrompt
*
*/

import React from 'react';
import styled from 'styled-components';

function RejectionLetterPrompt({ to, onCancel, onSend }) {
  return (
    <Wrapper>
      <Header>
        <h1>Kirim <em>Rejection Letter</em></h1>
      </Header>
      <Content>
        <div>
          <span className="label">Kepada</span>
          <span>:</span>
          <span className="bold">{to}</span>
        </div>
        <div>
          <span className="label">Subjek Pesan</span>
          <span>:</span>
          <input placeholder="Tuliskan subjek pesan" />
        </div>
        <textarea placeholder="Tuliskan Pesan mu disini" />
      </Content>
      <Footer>
        <Button secondary onClick={onCancel} >
          Kembali
        </Button>
        <Button primary onClick={onSend} >
          Kirim Rejection Letter
        </Button>
      </Footer>
    </Wrapper>
  );
}

RejectionLetterPrompt.propTypes = {
  to: React.PropTypes.string,
  onCancel: React.PropTypes.func,
  onSend: React.PropTypes.func,
};

const Wrapper = styled.div`
  width: 36rem;
  max-width: 100%;
  box-shadow: 0 0.125rem 0.375rem 0 rgba(0, 0, 0, 0.35);
`;

const Header = styled.div`
  padding: 1rem;
  padding-left: 2.3125rem;
  background: ${props => props.theme.black};

  h1 {
    font-weight: 700;
    color: ${props => props.theme.white};
    font-size: 0.875rem;
    margin: 0;
  }
`;

const Content = styled.div`
  padding: 1.5rem 2.5rem;
  background: ${props => props.theme.white};
  display: flex;
  flex-direction: column;

  span {
    font-size: 0.875rem;
    font-weight: 400;
    min-width: 1rem;
  }

  .label {
    width: 6.5rem;
    max-width: 100%;
  }

  .bold {
    font-weight: 700;
  }

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;

    @media screen and (min-width: 40rem) {
      flex-direction: row;
    }
  }

  input, textarea {
    border-radius: 0.15rem;
    box-shadow: inset 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    border: solid 0.1rem ${props => props.theme.gray};
    flex: 1;
    padding: 0.625rem;
  }

  textarea {
    height: 10.3125rem;
  }
`;

const Footer = styled.div`
  display:flex;
`;

const Button = styled.button`
  font-size: 0.75rem;
  color: ${props => (props.primary ? props.theme.white : props.theme.black)};
  background: ${props => (props.primary ? props.theme.lightBlue : props.theme.lightGray)};
  flex: 1;
  padding: 0.75rem;
  margin: 0;
`;

export default RejectionLetterPrompt;
