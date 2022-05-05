import React from "react";


const NumDropdown = (props) => {
    
 
   
    const renderOptions = (count,infinity) =>{
        let options = []
        
        for (let i =1; i<=count; i++){
            options.push(<option key={i} value={i}>{i}</option>)
        }
        if(infinity){
            options.push(<option key="infinity" value="infinity">&infin;</option>)
        }
        return options
    }
    return (
        <div>
            <label className="text-light px-1">{props.label}:</label>
            <select 
            value={props.value} onChange={props.onChange} className=" form-select-sm col-lg-6 w-auto">
                {renderOptions(props.count,props.infinity)}
            </select>
        </div>
        
    )
}

export default NumDropdown;