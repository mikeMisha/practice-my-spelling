import React, {useState} from "react";
import { setSpellInput } from "../actions";
import { connect } from "react-redux";
const TypingInput = (props) => {
   const onChange = (e) =>{
      
      props.setSpellInput(e.target.value.toLowerCase().replace(' ',''))
   }

   return (
    <input id="user-input" value={props.textInput} onChange={onChange} placeholder="Spell word here" autoComplete="off" className={`form-control text-center ${props.invInputColor}`}  />
   )
};

const mapStateToProps = (state) => {
   return {textInput:state.session.userTextInput}
}

export default connect(mapStateToProps,{ setSpellInput })(TypingInput);
