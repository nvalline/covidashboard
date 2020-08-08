import React, { useState } from 'react';
import axios from "axios";
import Papa from "papaparse";

export function Input(props) {
    return (
        <div className="form-group">
            <label><strong>{props.label}</strong></label>
            <input className="form-control" {...props} />
        </div>
    );
}

export function Textarea(props) {
    return (
        <div className="form-group">
            <label><strong>{props.label}</strong></label>
            <textarea className="form-control" rows="8" {...props} />
        </div>
    );
}

export function Select(props) {

    const [stateOptions, setStateOptions] = useState([]);

    axios.get("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv")
    .then(res => {
        let converted = Papa.parse(res.data, { header: true });
        let latest = converted.data.slice(converted.data.length - 55);
        let states = [];
        for (let i = 0; i < latest.length; i++) {
            states.push(latest[i].state)
        }
        setStateOptions(states);
    })
    .catch(err => console.log(err));

    return (
        <div className="form-group">
            <label><strong>{props.label}</strong></label>
            <select className="form-control" id="state-selector" {...props}>
                {stateOptions.map(state => (
                    <option>{state}</option>
                ))}
            </select>
        </div>
    );
}
