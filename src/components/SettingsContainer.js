import React from "react";
import NumDropdown from "./NumDropdown";
import ToggleMode from "./ToggleMode";
import { connect } from "react-redux";
import { setReps, setCurrentRep, setShuffleList } from "../actions";

const SettingsContainer = (props) => {
    const { setReps, setCurrentRep, setShuffleList, isShuffleMode, reps }= props

  

    const onToggleClick = (e) =>{
      
        setShuffleList(e.target.checked);
       
    }

    const onDropdownChange = (e) => {
            setReps(e.target.value)
            setCurrentRep(e.target.value)
    }
    
    return (
        <div className="row">
            <div className="d-flex col-6 justify-content-center">
                <NumDropdown onChange={onDropdownChange} label="Reps" value={reps} count={10} infinity />
            </div>
            <div className="col-6 d-flex justify-content-center ">
                <ToggleMode checked={isShuffleMode} onSwitch={onToggleClick} label="Shuffle Mode" />
            </div>  
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        reps:state.userAppSettings.reps,
        isShuffleMode:state.userAppSettings.isShuffleMode,
        currentList: state.session.currentWordList,
        lists: state.lists,
        shuffledList:state.session.shuffledList
        

    }
}

export default connect(mapStateToProps,{ setReps, setCurrentRep, setShuffleList})(SettingsContainer);