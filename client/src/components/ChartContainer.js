import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../utils/AuthContext";
import API from "../utils/API";
import ChartJS from "../components/ChartJS";
import moment from "moment-timezone";

const ChartData = props => {
  const [authState] = useContext(AuthContext);
  const [userState, setUserState] = useState();
  const [lowercaseState, setlowercaseState] = useState();
  const [testDates, setTestDates] = useState();
  const [increaseHos, setincreaseHos] = useState();
  const [posTests, setPosTests] = useState();
  const [trend, setTrend] = useState();

  useEffect(() => {
    API.getUser(authState.userId)
      .then(res => {
        let lowerState = res.data.state.toLowerCase();
        setlowercaseState(lowerState);
        chartData();
      })
      .catch(err => console.log(err));

    function chartData() {
      axios
        .get(
          `https://covidtracking.com/api/v1/states/${lowercaseState}/daily.json`
        )
        .then(res => {
          setUserState(res.data[0].state);

          let dataset = {
            testDates: [],
            increaseHos: [],
            positiveTests: [],
          };

          for (let i = 0; i < 13; i++) {
            dataset.testDates.push(
              moment(res.data[i].dateChecked).format("MM/DD")
            );
            dataset.increaseHos.push(res.data[i].hospitalizedIncrease);
            dataset.positiveTests.push(res.data[i].positiveIncrease);
          }

          setTestDates(dataset.testDates.reverse());
          setincreaseHos(dataset.increaseHos.reverse());
          setPosTests(dataset.positiveTests.reverse());

          const a = parseInt(dataset.positiveTests[13]);
          const b = parseInt(dataset.positiveTests[0]);
          a > b ? setTrend("higher") : setTrend("lower");
        })
        .catch(err => console.log(err));
    }
  }, [authState.userId, userState, lowercaseState]);

  return (
    <ChartJS
      state={userState}
      testDates={testDates}
      posTests={posTests}
      increaseHos={increaseHos}
      trend={trend}
    />
  );
};

export default ChartData;
