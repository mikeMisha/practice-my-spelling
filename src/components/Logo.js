import React from 'react';

const Logo = (props) => {
  const style = {
    height: props.height,
    width: props.width,
  };
  return (
    <img
      src="./images/logo.png"
      alt="logo"
      className={props.addClass}
      style={style}
    />
  );
};

export default Logo;
