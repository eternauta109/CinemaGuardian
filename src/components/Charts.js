import { ListItemSecondaryAction } from "@material-ui/core";
import Enumerable from "linq";
import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  RadialBar,
  RadialBarChart,
  Bar,
  Cell,
  Label,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { priority } from "../config/struttura";

const COLORS = [
  "#DFFF00",
  "#FFBF00",
  "#FF7F50",
  "#DE3163",
  "#9FE2BF",
  "#40E0D0",
  "#6495ED",
  "#CCCCFF",
  "#5F9EA0"
];

const Charts = ({ items }) => {
  console.log(items);

  var cinemaRes = Enumerable.from(items)
    .groupBy((g) => g.cinema)
    .select((s) => ({
      cinema: s.key(),
      quotation: s.sum((m) => (m.quotation ? Number(m.quotation) : null)),
      orderCost: s.sum((m) => (m.orderCost ? Number(m.orderCost) : null)),
      finalCost: s.sum((m) => (m.finalCost ? Number(m.finalCost) : null)),
      count: s.count(),
      p1: s.count((m) => m.priority === "P1"),
      p2: s.count((m) => m.priority === "P2"),
      p3: s.count((m) => m.priority === "P3"),
      p4: s.count((m) => m.priority === "P4"),
      p5: s.count((m) => m.priority === "P5"),
      p6: s.count((m) => m.priority === "P6"),
      resoltP1: s.count((m) => m.priority === "P1" && m.closed === true),
      resoltP2: s.count((m) => m.priority === "P2" && m.closed === true)
      /*  orderId: s.key(),
      max: s.max((m) => m.cost),
      min: s.min((m) => m.cost),
      avg: s.average((m) => m.cost),
      count: s.count(),
      sum: s.sum((s) => s.cost) */
    }))
    .toArray();

  var priorityRes = Enumerable.from(items)
    .groupBy((g) => g.priority)
    .select((s) => ({
      priority: s.key(),
      quotation: s.sum((m) => (m.quotation ? Number(m.quotation) : null)),
      orderCost: s.sum((m) => (m.orderCost ? Number(m.orderCost) : null)),
      finalCost: s.sum((m) => (m.finalCost ? Number(m.finalCost) : null)),
      count: s.count(),

      resolved: s.count((m) => m.priority === s.key() && m.closed === true)
      /*  orderId: s.key(),
      max: s.max((m) => m.cost),
      min: s.min((m) => m.cost),
      avg: s.average((m) => m.cost),
      count: s.count(),
      sum: s.sum((s) => s.cost) */
    }))
    .toArray();

  console.log(priorityRes);

  return (
    <div style={{ marginTop: "20px" }}>
      <h4>total cost</h4>
      <PieChart width={800} height={400}>
        <h5>quotation</h5>
        <Tooltip />

        <Pie
          data={items}
          dataKey="quotation"
          nameKey="cinema"
          cx="20%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {items.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>

        <Pie
          data={items}
          dataKey="finalCost"
          nameKey="cinema"
          cx="50%"
          cy="50%"
          outerRadius={25}
          fill="#8884d8"
          label
        >
          {items.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Pie
          data={items}
          dataKey="orderCost"
          nameKey="cinema"
          cx="80%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#82ca9d"
          label
        >
          {items.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>

        {/*  <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label /> */}
      </PieChart>
      <div style={{ marginTop: "20px" }}>
        <h4>cost comparation</h4>
        <BarChart width={730} height={250} data={cinemaRes}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cinema" />

          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quotation" fill="#8884d8" />
          <Bar dataKey="orderCost" fill="#82ca9d" />
          <Bar dataKey="finalCost" fill="orange" />
        </BarChart>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h4>priority analisys</h4>
        <BarChart width={730} height={250} data={cinemaRes}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cinema" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="p1" fill="#8884d8" />
          <Bar dataKey="p2" fill="#82ca9d" />
          <Bar dataKey="p3" fill="orange" />
          <Bar dataKey="p4" fill="#4dc9f6" />
          <Bar dataKey="p5" fill="#58595b" />
          <Bar dataKey="p6" fill="#8549ba" />
        </BarChart>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h4>p1-p2 comparation resolved for cinema</h4>
        <BarChart width={730} height={250} data={cinemaRes}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cinema" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="p1" fill="red" />
          <Bar dataKey="resoltP1" fill="green" />
          <Bar dataKey="p2" fill="orange" />
          <Bar dataKey="resoltP2" fill="green" />
        </BarChart>
      </div>

      <RadialBarChart
        width={730}
        height={250}
        innerRadius="10%"
        outerRadius="80%"
        data={priorityRes}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar
          minAngle={15}
          label={{ fill: "#666", position: "insideStart" }}
          background
          clockWise={true}
          dataKey="resolved"
        />

        <Legend
          iconSize={10}
          width={120}
          height={140}
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
        <Tooltip />
      </RadialBarChart>
    </div>
  );
};

export default Charts;
