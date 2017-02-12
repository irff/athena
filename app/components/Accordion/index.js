/**
*
* Accordion
*
*/

import React, { Component } from 'react';
import styled from 'styled-components';

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

const AccordionWrapper = styled.div`
  background: #eee;
`;

const AccordionHeader = styled.button`
  background: #666;
  color: #fff;
  width: 100%;
  text-align: left;
  padding: 1em;
`;

const AccordionBody = styled.div`
  background: #eee;
  color: #333;
  padding: 1em;
  padding-left: 2em;
`;

export const Item = props => (
  <AccordionWrapper>
    <AccordionHeader onClick={props.onClick}>
      {props.title}
    </AccordionHeader>
    { !!props.opened &&
      <AccordionBody>
        {props.children}
      </AccordionBody>
    }
  </AccordionWrapper>
);

Item.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.node,
  opened: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

Accordion.Item = Item;

export default Accordion;
