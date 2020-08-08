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

export function StateSelect(props) {

    const [stateOptions, setStateOptions] = useState([]);

    let inc = 0;

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
                    <option key={inc++}>{state}</option>
                ))}
            </select>
        </div>
    );
}

export function CountySelect(props) {

    const [countyOptions, setCountyOptions] = useState([]);

    let inc = 0;

    axios.get("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv")
    .then(res => {
        let converted = Papa.parse(res.data, { header: true, fastMode: true });
        let latest = converted.data.slice(converted.data.length - 3200);
        console.log(latest[0].state)
        let counties = [];
        for (let i = 0; i < latest.length; i++) {
            if (latest[i].state === document.getElementById("state").value) {
                counties.push(latest[i].county);
            }
        }
        setCountyOptions(counties);
    })
    .catch(err => console.log(err));

    return (
        <div className="form-group">
            <label><strong>{props.label}</strong></label>
            <select className="form-control" id="state-selector" {...props}>
                {countyOptions.map(county => (
                    <option key={inc++}>{county}</option>
                ))}
            </select>
        </div>
    );
}
