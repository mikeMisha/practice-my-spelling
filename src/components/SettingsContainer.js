import React from 'react';
import NumDropdown from './NumDropdown';
import ToggleMode from './ToggleMode';
import { connect } from 'react-redux';
import { setReps, setCurrentRep, setShuffleList } from '../actions';

const SettingsContainer = (props) => {
  const { setReps, setCurrentRep, setShuffleList, isShuffleMode, reps } = props;

  const onToggleClick = (e) => {
    setShuffleList(e.target.checked);
  };

  const onDropdownChange = (e) => {
    setReps(e.target.value);
    setCurrentRep(e.target.value);
  };

  return (
    <div className="d-flex text-light gap-4 align-items-center">
      <NumDropdown
        onChange={onDropdownChange}
        label="Reps"
        value={reps}
        count={10}
        infinity
      />

      <ToggleMode
        checked={isShuffleMode}
        onSwitch={onToggleClick}
        label="Shuffle Mode"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    reps: state.userAppSettings.reps,
    isShuffleMode: state.userAppSettings.isShuffleMode,
    lists: state.lists,
    shuffledList: state.session.shuffledList,
  };
};

export default connect(mapStateToProps, {
  setReps,
  setCurrentRep,
  setShuffleList,
})(SettingsContainer);
