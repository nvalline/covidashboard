import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../utils/AuthContext";
import axios from "axios";
import SearchResults from "../components/SearchResults";
import API from "../utils/API";
import nytCounties from "../components/nyt-counties-data.json";
import counties from "../components/stateCounties.json";

const CurrentData = () => {
  const [stateData, setStateData] = useState({});
  const [authState] = useContext(AuthContext);
  const [userState, setUserState] = useState();
  const [userCounty, setUserCounty] = useState();

  useEffect(() => {
    API.getUser(authState.userId)
      .then(res => {
        let county = res.data.county;
        setUserCounty(county);
        let state = res.data.state.toLowerCase();
        axios.get(`/api/current/${state}`)
          .then(res2 => {
            setStateData(res2.data);
          })
        state = state.toUpperCase();
        setUserState(state);
      })
      .catch(err => console.log(err));
  }, [authState.userId])

  function getCountyResults(userS, userC) {
    let stateName = counties.find(state => state.id === userS).name;
    let cases = nytCounties.filter(county => county.county === userC && county.state === stateName);
    return cases[0];
  }

  return (
    <div className="mm-15">
      <div className="container-fluid">
        <h3 className="text-center mt-3">Current Data for {userState}</h3>
        <SearchResults stateData={stateData} />
        <div className="text-center">
          <h3 className="mb-0">{userCounty} County</h3>
          <div className="data col-2 mt-3">
            <p className="data-title">Total Deaths</p>
            <p className="data-result">
              { userState == null ? "N/A" : JSON.parse(getCountyResults(userState, userCounty).deaths).toLocaleString() } 
            </p>
          </div>
          <div className="data col-2 mt-3">
            <p className="data-title">Total Cases</p>
            <p className="data-result">
              { userState == null ? "N/A" : JSON.parse(getCountyResults(userState, userCounty).cases).toLocaleString() } 
            </p>
          </div>
          <div className="text-center mt-3">
            State Data Source: <a href="https://covidtracking.com/">The Covid Tracking Project</a>
          </div>
          <div className="text-center data-source">
            County Data Source: <a href="https://github.com/nytimes/covid-19-data">The New York Times</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentData;