import React from "react";
import { connect } from 'react-redux';
const NumTracker = (props) => {


    return (
        <div id="word-tracker" className="text-light text-center">{props.current}/{props.total}</div>
    )

};
const mapStateToProps = (state) =>{
    return {
        wordList:state.wordList
    }
}

export default connect(mapStateToProps)(NumTracker);