import React from "react";
import "./style.css";
import moment from "moment-timezone";

function SearchResults(props) {  
  
  return (
    <div className="text-center">
      <div className="text-center">
        <p>As of: {props.stateData.date == null ? "N/A" : moment(props.stateData.date, "YYYYMMDD").format('MMMM Do, YYYY')}</p>
      </div>

      <div className="data-group">
        <div className="data col-2">
          <p className="data-title">Daily New Cases:</p>
          <p className="data-result">{props.stateData.positiveIncrease == null ? "N/A" : props.stateData.positiveIncrease.toLocaleString()}</p>
        </div>
        <div className="data col-2">
          <p className="data-title">Total Cases:</p>
          <p className="data-result">{props.stateData.positive == null ? "N/A" : props.stateData.positive.toLocaleString()}</p>
        </div>
        <div className="data col-2">
          <p className="data-title">New Hospitalized:</p>
          <p className="data-result">{props.stateData.hospitalizedIncrease == null ? "N/A" : props.stateData.hospitalizedIncrease.toLocaleString()}</p>
        </div>
        <div className="data col-2">
          <p className="data-title">Total Hospitalized:</p>
          <p className="data-result">{props.stateData.hospitalizedCumulative == null ? "N/A" : props.stateData.hospitalizedCumulative.toLocaleString()}</p>
        </div>
        <div className="data col-2">
          <p className="data-title">New Deaths:</p>
          <p className="data-result">{props.stateData.deathIncrease == null ? "N/A" : props.stateData.deathIncrease.toLocaleString()}</p>
        </div>
        <div className="data col-2">
          <p className="data-title">Total Deaths:</p>
          <p className="data-result">{props.stateData.death == null ? "N/A" : props.stateData.death.toLocaleString()}</p>
        </div>
        <div className="data col-2">
          <p className="data-title">New Tests:</p>
          <p className="data-result">{props.stateData.totalTestResultsIncrease == null ? "N/A" : props.stateData.totalTestResultsIncrease.toLocaleString()}</p>
        </div>
        <div className="data col-2">
          <p className="data-title">Total Tests:</p>
          <p className="data-result">{props.stateData.totalTestResults == null ? "N/A" : props.stateData.totalTestResults.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
