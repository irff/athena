/**
*
* Select
*
*/

import React, { PropTypes, Children } from 'react';


import styles from './styles.css';

function Select(props) {
  return (
    <div className={props.className}>
      <select className={styles.select} onChange={props.handleChange}>
        {Children.toArray(props.children)}
      </select>
    </div>
  );
}

Select.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  children: PropTypes.node.isRequired,
};


export default Select;
