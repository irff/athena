/**
*
* Button
*
*/

import React from 'react';

function Button(props) {
  const className = props.className;

  // Render an anchor tag
  let button = (
    <a className={className} href={props.href} onClick={props.onClick}>
      {React.Children.toArray(props.children)}
    </a>
  );

  // If the Button has a handleRoute prop, we want to render a button
  if (props.handleRoute) {
    button = (
      <button className={className} onClick={props.handleRoute}>
        {React.Children.toArray(props.children)}
      </button>
    );
  }

  return (
    <div className={props.containerClassName}>
      {button}
    </div>
  );
}

Button.propTypes = {
  className: React.PropTypes.string,
  handleRoute: React.PropTypes.func,
  href: React.PropTypes.string,
  onClick: React.PropTypes.func,
  children: React.PropTypes.node.isRequired,
  containerClassName: React.PropTypes.string,
};

export default Button;
