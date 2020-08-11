import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../utils/AuthContext";
import axios from "axios";
import SearchResults from "../components/SearchResults";
import API from "../utils/API";

const CurrentData = () => {
  const [stateData, setStateData] = useState({});
  const [authState] = useContext(AuthContext);
  const [userState, setUserState] = useState();

  useEffect(() => {
    API.getUser(authState.userId)
      .then(res => {
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

  return (
    <div className="container-fluid">
      <h3 className="text-center mt-3">Current Data for {userState}</h3>
      <SearchResults stateData={stateData} />
      <div className="text-center mb-5">Data Source: <a href="https://covidtracking.com/">The Covid Tracking Project</a></div>
    </div>
  );
};

export default CurrentData;