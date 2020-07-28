import React, { useState } from "react";
import axios from "axios";
import { Select } from "../components/FormElements";
import SubmitBtn from "../components/SubmitBtn";
import Chart from "../components/Chart";
import moment from "moment-timezone";

const ChartData = props => {
  const [search, setSearch] = useState();
  const [trendData, setTrendData] = useState();
  const [trendDirection, setTrendDirection] = useState();

  //handle this when search input is changed
  function handleInputChange(event) {
    let selector = document.getElementById("state-selector");
    setSearch(selector.options[selector.selectedIndex].value.toLowerCase());
  }

  //handle this when search button clicked
  function handleFormSubmit(event) {
    event.preventDefault();

    axios
      .get(`https://covidtracking.com/api/v1/states/${search}/daily.json`)
      .then(res => {
        let dataset = [];
        for (let i = 0; i < 30; i++) {
          dataset.push({
            name: moment(res.data[i].dateChecked).format("MMMM Do"),
            totalTests: res.data[i].totalTestResultsIncrease,
            positiveTests: res.data[i].positiveIncrease,
          });
        }
        setTrendData(dataset.reverse());

        function difference(a, b) {
          return a - b === 0 ? 0 : 100 * Math.abs((a - b) / b);
        }

        const a = parseInt(dataset[29].positiveTests);
        const b = parseInt(dataset[0].positiveTests);

        if (difference(a, b) < 10) {
          setTrendDirection("Neutral");
        } else if (a < b && difference(a, b) > 10) {
          setTrendDirection("Downwards");
        } else if (a > b && difference(a, b) > 10) {
          setTrendDirection("Upwards");
        }
      })
      .catch(e => console.log(e));
  }

  return (
    <div className="container">
      <h3 className="text-center">Select State</h3>
      <Select onChange={handleInputChange} />
      <SubmitBtn text="Submit" name="submit" onClick={handleFormSubmit} />
      <Chart dataset={trendData} trendDirection={trendDirection} />
    </div>
  );
};

export default ChartData;
