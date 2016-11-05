/**
*
* Logo
*
*/

import React from 'react';


import styles from './styles.css';
import LogoImg from './logo.png';

function Logo(props) {
  const className = props.className ? props.className : styles.logo;
  
  return (
    <img src={LogoImg} alt="Quint - Logo" className={className} />
  );
}

Logo.propTypes = {
  className: React.PropTypes.string,
};

export default Logo;
