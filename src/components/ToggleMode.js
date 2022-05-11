import React from "react";

const ToggleSwitch = (props) => {
	return (
		<div className="form-check form-switch ">
			<input
				checked={props.checked}
				onChange={props.onSwitch}
				className="form-check-input"
				type="checkbox"
				id="toggleSwitch"
			/>
			<label
				className="form-check-label text-nowrap px-1"
				htmlFor="flexSwitchCheckDefault"
			>
				{props.label}
			</label>
		</div>
	);
};

export default ToggleSwitch;
