import React, { useState } from 'react';
import axios from "axios";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";

const CurrentData = props => {
  const [search, setSearch] = useState();
  const [stateData, setStateData] = useState({});

  //handle this when search input is changed
  function handleInputChange(event) {
    setSearch(event.target.value.toLowerCase());
  };

  //handle this when search button clicked
  function handleFormSubmit(event) {
    event.preventDefault();
    
    axios.get(`/api/current/${search}`)
      .then(res => {
        setStateData(res.data);
      })
      .catch(e => console.log(e));
  };

  return (
    <div className="container">
      <h3 id="search-header" className="text-center">State</h3>
      <SearchForm
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
      />
      <SearchResults stateData={stateData} search={search}/>
    </div>
  );
};

export default CurrentData;