import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Chart(props) {
  return (
    <>
      <LineChart
        width={1000}
        height={300}
        data={props.dataset}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="positiveTests"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        {/* <Line type="monotone" dataKey="totalTests" stroke="#82ca9d" /> */}
      </LineChart>
      <h2>Trending: {props.trendDirection}</h2>
      <p>* Number of positive cases is +/- 10% as of two weeks ago</p>
    </>
  );
}

export default Chart;
