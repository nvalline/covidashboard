import React, { useState } from 'react';
import axios from 'axios';
import Container from "./Container";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

const CurrentData = props => {
  const [search, setSearch] = useState();
  const [stateData, setStateData] = useState({});

  //handle this when search input is changed
  function handleInputChange(event) {
    setSearch(event.target.value);
  };

  //handle this when search button clicked
  function handleFormSubmit(event) {
    event.preventDefault();

    axios.get("/api/covid-data")
      .then(res => {
        console.log(res);
        setStateData(res.data);
      })

    // axios.get("https://covidtracking.com/api/v1/states/"
    // + search
    // + "/current.json")
    //   .then(res => {
    //       setStateData(res.data);
    //   })
    //   .catch(e => console.log(e));
  };

  return (
    <Container>
      <h3 id="search-header" className="text-center">State</h3>
      <SearchForm
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
      />
      <SearchResults stateData={stateData} search={search}/>
    </Container>
  );
};

export default CurrentData;