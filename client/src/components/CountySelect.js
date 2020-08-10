import React from "react";
import stateCounties from "./stateCounties.json";

function CountySelect(props) {

    let inc = 0;

    return (
        <div className="form-group">
            <label><strong>{props.label}</strong></label>
            <select className="form-control" id="county-selector" {...props}> 
                {props.selectedstate !== undefined ? 
                stateCounties.find(state => state.id === props.selectedstate).counties.map(county => (<option key={inc++}>{county}</option>))
                : "N/A"
                }
            </select>
        </div>
    );
}

export default CountySelect;