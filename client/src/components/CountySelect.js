import React from "react";
import stateCounties from "./stateCounties.json";

function CountySelect(props) {

    let inc = 0;

    return (
        <div className="form-group">
            <label><strong>{props.label}</strong></label>
            <select className="form-control" id="county-selector" {...props}> 
                {props.selectedstate !== undefined ? 
                stateCounties.find(state => state.id === props.selectedstate).counties.map(state => (<option key={inc++}>{state}</option>))
                : "N/A"
                }
            </select>
        </div>
    );
}

export default CountySelect;