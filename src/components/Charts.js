import React from "react";

import { Stack, Typography } from "@mui/material";
/* import { cloneDeep } from "lodash";
import * as agCharts from "ag-charts-community"; */
import { AgChartsReact } from "ag-charts-react";

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
  };

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

  return (
    <Stack container spacing={2} sx={{ mt: 3 }}>
      <Typography>Priority analisys</Typography>
      <AgChartsReact options={options} />
      <Typography>Cost analisys</Typography>
      <AgChartsReact options={options2} />
    </Stack>
  );
}

export default Charts;
