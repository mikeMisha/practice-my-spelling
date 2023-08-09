import React from 'react';

const ToggleSwitch = (props) => {
  return (
    <div className=" form-switch ">
      <input
        checked={props.checked}
        onChange={props.onSwitch}
        className="form-check-input"
        type="checkbox"
        id="toggleSwitch"
      />
      <label
        className="form-check-label text-nowrap ms-2"
        htmlFor="flexSwitchCheckDefault"
      >
        {props.label}
      </label>
    </div>
  );
};

export default ToggleSwitch;
