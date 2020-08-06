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
        setUserState(res.data.state.toLowerCase());
      })
      .catch(err => console.log(err));
  }, [])

  function handleFormSubmit() {
    axios.get(`/api/current/${userState}`)
      .then(res2 => {
        setStateData(res2.data);
      })
      .catch(e => console.log(e));
  }

  return (
    <div className="container">
      <h3 className="text-center">Current Data for {userState}</h3>
      {userState === null ? "" : handleFormSubmit()}
      <SearchResults stateData={stateData} search={userState}/>
    </div>
  );
};

export default CurrentData;