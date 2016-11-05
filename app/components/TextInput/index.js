/**
*
* TextInput
*
*/
import React, { PropTypes } from 'react';

import styles from './styles.css';

function TextInput(props) {
  const className = props.className ? props.className : styles.textInput;
  const inputType = props.type ? props.type : "text";
  console.log(inputType);

  let maincontent = props.autoFocus ? <input type={inputType} className={className} onChange={props.handleChange} placeholder={props.placeholder} value={props.value} autoFocus={true} /> : <input type={inputType} className={className} onChange={props.handleChange} placeholder={props.placeholder} value={props.value} />;

  return (
    <div>
      {maincontent}
    </div>
  );
}

TextInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  autoFocus: PropTypes.bool,
  type: PropTypes.string,
};

export default TextInput;
