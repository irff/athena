/**
*
* SectionTitle
*
*/

import React from 'react';


import styles from './styles.css';

function SectionTitle(props) {
  return (
    <h1 className={styles.sectionTitle}>
      {React.Children.toArray(props.children)}
    </h1>
  );
}

SectionTitle.propTypes = {
  children: React.PropTypes.node.isRequired,
}

export default SectionTitle;
