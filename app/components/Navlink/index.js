/**
*
* Navlink
*
*/

import React from 'react';

import styles from './styles.css';

function Navlink(props) {
  let navStyle = props.isRightElement ? styles.rightlink : styles.leftlink;

  if (props.isPlaceholder) {
    navStyle = styles.placeholder;
  }

  return (
    <button className={navStyle} disabled={props.isCurrentElement || props.isPlaceholder} onClick={props.handleRoute} >{React.Children.toArray(props.children)}</button>
  );
}

Navlink.propTypes = {
  handleRoute: React.PropTypes.func,
  isRightElement: React.PropTypes.bool,
  isCurrentElement: React.PropTypes.bool,
  children: React.PropTypes.node.isRequired,
  isPlaceholder: React.PropTypes.bool,
};

export default Navlink;
