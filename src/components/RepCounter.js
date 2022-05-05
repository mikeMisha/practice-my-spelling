import React from "react";
import { connect } from "react-redux";


const RepCounter = ({ currentRep, selectedReps, handleRep}) => {
  
   
    const renderRep = (rep) =>{
      
        return (rep === 'infinity') ? <span>&infin;</span> : rep

    }

    return  (
        <div id="counter" className="word-counter text-center">{renderRep(currentRep)}</div>
    )
}
const mapStateToProps = (state) =>{
    return {
        selectedReps: state.userAppSettings.reps,
        currentRep: state.session.currentRep
    }
}

export default connect(mapStateToProps)(RepCounter)