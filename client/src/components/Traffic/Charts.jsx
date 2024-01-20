import React, { useEffect } from "react";
import * as echarts from "echarts";

const Charts = () => {
  // Use useEffect to initialize the chart after the component is mounted
  useEffect(() => {
    // Create the echarts instance
    var myChart = echarts.init(document.getElementById("mainTraffic"));

    // Draw the chart
    myChart.setOption({
      title: {
        // text: "Traffic Data for Raja Park",
        textStyle: {
          fontSize: 30,
          color: "#f4cb18",
        },
      },
      //   legend: {
      //     data: ["Number of Vehicles", "Time"],

      //   },
      tooltip: {},
      xAxis: {
        type: "category",
        data: ["12:00", "3:00", "6:00", "9:00", "12:00"],
      },
      yAxis: {
        axisTick: true,
      },

      series: [
        {
          name: "Vehicles",
          type: "line",
          data: [25, 20, 30, 50, 20, 10],
          itemStyle: {
            color: "#fede48",
          },
        },
      ],
    });

    // Cleanup the chart when the component is unmounted
    return () => {
      myChart.dispose();
    };
  }, []); // Empty dependency array ensures the effect runs only once after mount

  return (
    <div
      id="mainTraffic"
      //   className="w-max"
      style={{ width: "600px", height: "400px", color: "yellow" }}
    />
  );
};

export default Charts;
