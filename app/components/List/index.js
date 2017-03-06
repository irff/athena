import React from 'react';

import styles from './styles.css';

import styled from 'styled-components';

const FlexContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
`;

function List(props) {
  const ComponentToRender = props.component;
  let content = (<div></div>);

  // If we have items, render them
  if (props.items) {
    content = props.items.map((item, index) => (
      <ComponentToRender key={`item-${index}`} index={index} item={item} validation={props.validation} dashboardCard={props.dashboardCard} />
    ));
  } else {
    // Otherwise render a single component
    content = (<ComponentToRender index={1} dashboardCard={props.dashboardCard} />);
  }

  if (props.flex) {
    return (
      <FlexContainer>
        {content}
      </FlexContainer>
    );
  }

  return (
    <div className={styles.listWrapper}>
      {content}
    </div>
  );
}

List.propTypes = {
  component: React.PropTypes.func.isRequired,
  items: React.PropTypes.array,
  validation: React.PropTypes.array,
  flex: React.PropTypes.bool,
  dashboardCard: React.PropTypes.bool,
};

export default List;
