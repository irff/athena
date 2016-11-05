/**
*
* Navlink
*
*/

import React from 'react';

import Button from 'components/Button';
import styles from './styles.css';

function Navlink(props) {
  let navStyle = props.isRightElement ? styles.rightlink : styles.leftlink;
  return (
    <Button className={navStyle}>{React.Children.toArray(props.children)}</Button>
  );
}

Navlink.propTypes = {
  handleRoute: React.PropTypes.func,
  isRightElement: React.PropTypes.bool,
  children: React.PropTypes.node.isRequired,
}

export default Navlink;
