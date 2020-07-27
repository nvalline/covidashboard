import React, { useState } from 'react';
import axios from "axios";
import { Select } from "../components/FormElements";
import SubmitBtn from "../components/SubmitBtn";
import SearchResults from "../components/SearchResults";

const CurrentData = props => {
  const [search, setSearch] = useState();
  const [stateData, setStateData] = useState({});

  //handle this when search input is changed
  function handleInputChange(event) {
    let selector = document.getElementById("state-selector");
    setSearch(selector.options[selector.selectedIndex].value.toLowerCase());
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
      <h3 className="text-center">Select State</h3>
            <Select 
              onChange={handleInputChange}
            />
            <SubmitBtn 
                text="Submit"
                name="submit"
                onClick={handleFormSubmit}
            />
      <SearchResults stateData={stateData} search={search}/>
    </div>
  );
};

export default CurrentData;