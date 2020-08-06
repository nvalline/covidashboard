import React from "react";
import "./style.css";
import moment from "moment-timezone";

function SearchResults(props) {  

  return (
    <div className="text-center">
      <div className="text-center">
        <p>Last Checked: {moment(props.stateData.dateModified).tz('America/New_York').format('MMMM Do, YYYY h:mm')} PM</p>
      </div>

      <div className="data-group">
        <div className="data col-2">
          <p className="data-title">Daily New Cases:</p>
          <p className="data-result">{props.stateData.positiveIncrease === undefined ? "N/A" : props.stateData.positiveIncrease.toLocaleString()}</p>
        </div>
        <div className="data col-2">
          <p className="data-title">Total Cases:</p>
          <p className="data-result">{props.stateData.positive === undefined ? "N/A" : props.stateData.positive.toLocaleString()}</p>
        </div>
        <div className="data col-2">
          <p className="data-title">New Hospitalized:</p>
          <p className="data-result">{props.stateData.hospitalizedIncrease === undefined ? "N/A" : props.stateData.hospitalizedIncrease.toLocaleString()}</p>
        </div>
        <div className="data col-2">
          <p className="data-title">Total Hospitalized:</p>
          <p className="data-result">{props.stateData.hospitalizedCumulative === undefined ? "N/A" : props.stateData.hospitalizedCumulative.toLocaleString()}</p>
        </div>
        <div className="data col-2">
          <p className="data-title">New Deaths:</p>
          <p className="data-result">{props.stateData.deathIncrease === undefined ? "N/A" : props.stateData.deathIncrease.toLocaleString()}</p>
        </div>
        <div className="data col-2">
          <p className="data-title">Total Deaths:</p>
          <p className="data-result">{props.stateData.death === undefined ? "N/A" : props.stateData.death.toLocaleString()}</p>
        </div>
        <div className="data col-2">
          <p className="data-title">New Tests:</p>
          <p className="data-result">{props.stateData.totalTestResultsIncrease === undefined ? "N/A" : props.stateData.totalTestResultsIncrease.toLocaleString()}</p>
        </div>
        <div className="data col-2">
          <p className="data-title">Total Tests:</p>
          <p className="data-result">{props.stateData.totalTestResults === undefined ? "N/A" : props.stateData.totalTestResults.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
