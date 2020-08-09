import React from "react";
import stateCounties from "./stateCounties.json";

function StateSelect(props) {

    let inc = 0;

    return (
        <div className="form-group">
            <label><strong>{props.label}</strong></label>
            <select className="form-control" id="state-selector" {...props}>
                {stateCounties.map(state => (
                    <option key={inc++}>{state.id}</option>
                ))}
            </select>
        </div>
    );
}

export default StateSelect;