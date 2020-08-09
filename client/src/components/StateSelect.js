import React from "react";
import abbr from "./abbrvStates.json";

function StateSelect(props) {

    let inc = 0;

    return (
        <div className="form-group">
            <label><strong>{props.label}</strong></label>
            <select className="form-control" id="state-selector" {...props}>
                {abbr.map(state => (
                    <option key={inc++}>{state.abbreviation}</option>
                ))}
            </select>
        </div>
    );
}

export default StateSelect;