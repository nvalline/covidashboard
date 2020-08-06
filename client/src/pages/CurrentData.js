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
  }, [])

  return (
    <div className="container">
      <h3 className="text-center">Current Data for {userState}</h3>
      <SearchResults stateData={stateData} />
    </div>
  );
};

export default CurrentData;