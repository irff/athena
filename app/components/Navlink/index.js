/**
*
* Navlink
*
*/

import React from 'react';

import styles from './styles.css';

function Navlink(props) {
  let navStyle = props.isRightElement ? styles.rightlink : styles.leftlink;
  return (
    <button className={navStyle} disabled={props.isCurrentElement} onClick={props.handleRoute} >{React.Children.toArray(props.children)}</button>
  );
}

Navlink.propTypes = {
  handleRoute: React.PropTypes.func,
  isRightElement: React.PropTypes.bool,
  isCurrentElement: React.PropTypes.bool,
  children: React.PropTypes.node.isRequired,
};

export default Navlink;
