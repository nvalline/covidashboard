import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../utils/AuthContext";
import axios from "axios";
import SearchResults from "../components/SearchResults";
import API from "../utils/API";
import SubmitBtn from "../components/SubmitBtn";

const CurrentData = props => {
  const [search, setSearch] = useState();
  const [stateData, setStateData] = useState({});
  const [authState, setAuthState] = useContext(AuthContext);
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
        console.log(res2.data);
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