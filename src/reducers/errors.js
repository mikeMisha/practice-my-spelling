const INTIAL_STATE = {
    addError: null,
    isAddErrorVis:false
}

const errors = (state=INTIAL_STATE,{type,payload}) => {
    switch(type){
        case 'ADD_ERROR':
            return {...state, addError:payload, isAddErrorVis:payload!==''&&true}
        case 'IS_ADD_ERROR':
            return {...state,  isAddErrorVis:payload}
        default: return state
    }
}
export default errors;