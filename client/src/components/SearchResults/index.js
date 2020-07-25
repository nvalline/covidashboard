import React from "react";
import "./style.css";
import moment from "moment-timezone";

function SearchResults(props) {  
  let state = props.search || "";
  return (
    <div className="text-left">
      <ul className="search-results">
        <li>
          <div className="text-center">
            <h2>{state.toUpperCase()}</h2>
            <p>Last Checked: {moment(props.stateData.dateModified).tz('America/New_York').format('MMMM Do, YYYY h:mm')} PM</p>
          </div>
          <p>Daily New Cases:</p>
          <h3>{props.stateData.positiveIncrease}</h3>
          <hr></hr>
          <p>Total Cases:</p>
          <h3>{props.stateData.positive}</h3>
          <hr></hr>
          <p>New Hospitalizations:</p>
          <h3>{props.stateData.hospitalizedIncrease}</h3>
          <hr></hr>
          <p>New Deaths:</p>
          <h3>{props.stateData.deathIncrease}</h3>
          <hr></hr>
          <p>Total Deaths:</p>
          <h3>{props.stateData.death}</h3>
          <hr></hr>
          <p>New Tests:</p>
          <h3>{props.stateData.totalTestResultsIncrease}</h3>
          <hr></hr>
          <p>Total Tests:</p>
          <h3>{props.stateData.totalTestResults}</h3>
        </li>
      </ul>
    </div>
  );
}

export default SearchResults;
