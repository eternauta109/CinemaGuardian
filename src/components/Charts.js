import React, { useState } from "react";
import { Chart } from "primereact/chart";
import { priority } from "../config/struttura";

const Charts = ({ items }) => {
  //count p1

  const COLORS = [
    "#4dc9f6",
    "#f67019",
    "#f53794",
    "#537bc4",
    "#acc236",
    "#166a8f",
    "#00a950",
    "#58595b",
    "#8549ba"
  ];

  let res = items.reduce(function (obj, v) {
    // increment or set the property
    // `(obj[v.status] || 0)` returns the property value if defined
    // or 0 ( since `undefined` is a falsy value
    obj[v.priority] = (obj[v.priority] || 0) + 1;
    // return the updated object
    return obj;
    // set the initial value as an object
  }, {});

  let label1 = [];
  let data1 = [];

  for (const [labels, data] of Object.entries(res)) {
    console.log(`${labels}: ${data}`);
    label1.push(`${labels}`);
    data1.push(data);
  }

  const chartData1 = {
    labels: label1,
    datasets: [
      {
        data: data1,
        backgroundColor: COLORS
      }
    ]
  };

  const [lightOptions1] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057"
        },
        title: {
          display: true,
          text: "priority count"
        }
      }
    }
  });

  return (
    <div className="card flex justify-content-center mt-6">
      <Chart
        type="pie"
        data={chartData1}
        options={lightOptions1}
        style={{ position: "relative", width: "40%" }}
      />
    </div>
  );
};
/* import { Stack, Typography } from "@mui/material";
/* import { cloneDeep } from "lodash";
import * as agCharts from "ag-charts-community"; */
/* import { AgChartsReact } from "ag-charts-react";

function Charts({ items }) {
  console.log("item in proiva", items);

  const countp1 = items.filter((item) => item.priority === "P1").length;
  const countp2 = items.filter((item) => item.priority === "P2").length;
  const countp3 = items.filter((item) => item.priority === "P3").length;
  const countp4 = items.filter((item) => item.priority === "P4").length;
  const countp5 = items.filter((item) => item.priority === "P5").length;
  const countp6 = items.filter((item) => item.priority === "P6").length;

  const options = {
    data: [
      { label: "P1", value: countp1 },
      { label: "P2", value: countp2 },
      { label: "P3", value: countp3 },
      { label: "P4", value: countp4 },
      { label: "P5", value: countp5 },
      { label: "P6", value: countp6 }
    ],
    series: [
      {
        type: "pie",
        angleKey: "value",
        labelKey: "label"
      }
    ]
  };

  const options2 = {
    data: items,
    series: [
      {
        type: "column",
        xKey: "cinema",
        yKey: "quotation"
      },
      {
        type: "column",
        xKey: "cinema",
        yKey: "orderCost"
      },
      {
        type: "column",
        xKey: "cinema",
        yKey: "finalCost"
      }
    ]
  }; */

/* const options = {
    data: items,
    series: [
      {
        type: "pie",
        angleKey: "quotation",
        labelKey: "cinema"
      }
    ]
  }; */

/* const options = {
    data: [
      { value: 56.9 },
      { value: 22.5 },
      { value: 6.8 },
      { value: 8.5 },
      { value: 2.6 },
      { value: 1.9 }
    ],
    series: [
      {
        type: "pie",
        angleKey: "value"
      }
    ]
  }; */

/* return (
    <Stack container spacing={2} sx={{ mt: 3 }}>
      <Typography>Priority analisys</Typography>
      <AgChartsReact options={options} />
      <Typography>Cost analisys</Typography>
      <AgChartsReact options={options2} />
    </Stack>
  );
} */

export default Charts;
