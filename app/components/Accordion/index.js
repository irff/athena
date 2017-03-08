/**
*
* Accordion
*
*/

import React, { Component } from 'react';
import styled from 'styled-components';
import globalStyle from 'containers/App/styles.css';

class Accordion extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    initialState: React.PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      opened: props.initialState || [],
    };

    this.toggleItem = this.toggleItem.bind(this);
  }

  toggleItem(index) {
    const { opened } = this.state;
    if (this.isOpened(opened, index)) {
      this.setState({ opened: opened.filter(item => item !== index) });
    } else {
      this.setState({ opened: [...opened, index] });
    }
  }

  isOpened(state, index) {
    return state.indexOf(index) !== -1;
  }

  render() {
    const { children } = this.props;
    const { opened } = this.state;

    return (
      <div>
        {React.Children.map(children,
          (child, index) => React.cloneElement(child, {
            opened: this.isOpened(opened, index),
            onClick: () => this.toggleItem(index),
          })
        )}
      </div>
    );
  }
}

const AccordionHeader = styled.button`
  background: ${props => props.backgroundColor || props.theme.darkBlack};
  color: ${props => props.theme.white};
  width: 100%;
  text-align: left;
  font-size: 1.33rem;
  padding: 1.25rem;
  box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.14);
  display: flex;
`;

const AccordionBody = styled.div`
  background: ${props => props.theme.lightGray};
  color: ${props => props.theme.darkBlack};
  padding: 1.3125rem;
`;

const TitleContainer = styled.span`
  flex: 1;
`;

const ArrowContainer = styled.span`
  text-align: right;
`;

export const Item = props => (
  <div>
    <AccordionHeader onClick={props.onClick} backgroundColor={props.backgroundColor}>
      <TitleContainer>{props.title}</TitleContainer>
      <ArrowContainer>
        { !props.opened && <span className={globalStyle.icondownarrow} /> }
        { !!props.opened && <span className={globalStyle.iconuparrow} /> }
      </ArrowContainer>
    </AccordionHeader>
    { !!props.opened &&
      <AccordionBody>
        {props.children}
      </AccordionBody>
    }
  </div>
);

Item.propTypes = {
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.node,
  ]),
  backgroundColor: React.PropTypes.string,
  children: React.PropTypes.node,
  opened: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

Accordion.Item = Item;

export default Accordion;
