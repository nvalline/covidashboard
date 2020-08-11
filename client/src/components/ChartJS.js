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
        label: "New Positive Tests",
        data: props.posTests,
        fill: false,
        borderColor: "#75ABDE",
        backgroundColor: "#75ABDE",
        pointBorderColor: "#75ABDE",
        pointBackgroundColor: "#75ABDE",
        pointHoverBackgroundColor: "#75ABDE",
        pointHoverBorderColor: "#75ABDE",
        yAxisID: "y-axis-2",
      },
      {
        label: "New Hospitalized",
        data: props.increaseHos,
        fill: false,
        borderColor: "#D0D0D0",
        backgroundColor: "#D0D0D0",
        pointBorderColor: "#D0D0D0",
        pointBackgroundColor: "#D0D0D0",
        pointHoverBackgroundColor: "#D0D0D0",
        pointHoverBorderColor: "#D0D0D0",
        yAxisID: "y-axis-1",
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
