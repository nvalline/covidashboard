import React from "react";
import { Line } from "react-chartjs-2";

function ChartJSChart(props) {
  const options = {
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
          gridLines: {
            display: false,
          },
          labels: {
            show: true,
          },
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          gridLines: {
            display: false,
          },
          labels: {
            show: true,
          },
        },
      ],
    },
  };

  const data = {
    labels: props.testDates,
    datasets: [
      {
        label: "New Hospitalized",
        data: props.increaseHos,
        fill: false,
        borderColor: "#324aa8",
        backgroundColor: "#324aa8",
        pointBorderColor: "#324aa8",
        pointBackgroundColor: "#324aa8",
        pointHoverBackgroundColor: "#324aa8",
        pointHoverBorderColor: "#324aa8",
        yAxisID: "y-axis-1",
      },
      {
        label: "New Positive Tests",
        data: props.posTests,
        fill: false,
        borderColor: "#EC932F",
        backgroundColor: "#EC932F",
        pointBorderColor: "#EC932F",
        pointBackgroundColor: "#EC932F",
        pointHoverBackgroundColor: "#EC932F",
        pointHoverBorderColor: "#EC932F",
        yAxisID: "y-axis-2",
      },
    ],
  };

  return (
    <div>
      <h4 className="section-title">{props.state} Trend</h4>
      <p>Number of positive cases is {props.trend} than two weeks ago.</p>
      <Line data={data} options={options} />
    </div>
  );
}

export default ChartJSChart;
