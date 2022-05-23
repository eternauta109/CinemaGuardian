import Enumerable from "linq";
import React, { useState } from "react";
import { Chart } from "primereact/chart";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  /* ResponsiveContainer, */
  BarChart,
  RadarChart,
  Radar,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  /*  RadialBar,
  RadialBarChart, */
  Bar,
  Cell,
  Label,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { Container, Typography, Box } from "@mui/material";
/* import { priority } from "../config/struttura"; */

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
  /* const [maxCount, setMaxCount] = useState(0); */

  /* console.log("items", items); */

  /* let risultato = items.reduce(
    (res, p) => {
      //nel vettore res è presente la chiave con il nome?
      if (res.key[p.cinema] != null) {
        console.log(res.value[key]);
        let key = res.key[p.cinema];
        //si è presente aggiungo costi e spese9
        res.value[key].quotation += p.quotation;
        res.value[key].orderCost += p.orderCost;
        res.value[key].finalCost += p.finalCost;
        switch (p.priority) {
          case "P1":
            res.value[key].P1 += 1;
            break;

          default:
            break;
        }
      } else {
        //non è presente assegno l'oggetto alla posizione col nome
        let key = res.value.length;

        res.key[p.cinema] = key;
        console.log("key, res", key, res.value);
        res.value[key] = {
          cinema: p.cinema,
          quotation: p.quotation ? p.quotation : 0,
          orderCost: p.orderCost ? p.orderCost : 0,
          finalCost: p.finalCost ? p.finalCost : 0,
          [p.priority]: 1,
        };
        console.log("res", res);
      }
      return res;
      //ritorno il vettore
    },
    { key: {}, value: [] }
  );

  //il vettore risultato lo inizializzo a vettore vuoto []
  console.log("risultato", risultato.value);
 */
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
  console.log();

  var priorityRes = Enumerable.from(items)
    .groupBy((g) => g.priority)
    .select((s) => ({
      priority: s.key(),
      quotation: s.sum((m) => (m.quotation ? Number(m.quotation) : null)),
      orderCost: s.sum((m) => (m.orderCost ? Number(m.orderCost) : null)),
      finalCost: s.sum((m) => (m.finalCost ? Number(m.finalCost) : null)),
      quotationTodo: s.sum((m) =>
        m.quotation && !m.closed ? Number(m.quotation) : null
      ),
      orderCostTodo: s.sum((m) =>
        m.orderCost && !m.closed ? Number(m.orderCost) : null
      ),
      finalCostTodo: s.sum((m) =>
        m.finalCost && !m.closed ? Number(m.finalCost) : null
      ),
      count: s.count(),

      resolved: s.count((m) => m.priority === s.key() && m.closed === true),
      todo: s.count((m) => m.priority === s.key() && m.inProgress === true)
      /*  orderId: s.key(),
      max: s.max((m) => m.cost),
      min: s.min((m) => m.cost),
      avg: s.average((m) => m.cost),
      count: s.count(),
      sum: s.sum((s) => s.cost) */
    }))
    .toArray();

  /* const findTheCount = (array) => {
    array.forEach((e) => {
      if (e.count > maxCount) {
        setMaxCount(e.count);
      }
    });
  }; */
  /* console.log(priorityRes); */

  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057"
        }
      }
    }
  });

  return (
    <Container sx={{ marginTop: "40px", bgcolor: "#f9fbe7", opacity: 0.97 }}>
      <Typography variant="h3">total cost</Typography>
      {/* <div className="card flex justify-content-center">
        <Chart
          type="pie"
          dataKey="quotation"
          nameKey="cinema"
          data={items}
          options={lightOptions}
          style={{ position: "relative", width: "40%" }}
        />
      </div> */}
      <PieChart width={800} height={350}>
        <h5>quotation</h5>
        <Tooltip />

        <Pie
          data={items}
          dataKey="quotation"
          nameKey="cinema"
          cx="20%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          <Label value="quotation" offset={0} position="center" />
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
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          <Label value="final cost" offset={0} position="center" />
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
          <Label value="order cost" offset={0} position="center" />
          {items.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>

        {/*  <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label /> */}
      </PieChart>

      <div style={{ marginTop: "40px" }}>
        <Typography variant="h3">cost comparation</Typography>

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
      <div style={{ marginTop: "40px" }}>
        <Typography variant="h3">priority analisys</Typography>
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
      <div style={{ marginTop: "40px" }}>
        <Typography variant="h3">priority resolved comparation</Typography>
        <RadarChart
          outerRadius={90}
          width={730}
          height={250}
          data={priorityRes}
        >
          <Tooltip />
          <PolarGrid />
          <PolarAngleAxis dataKey="priority" />
          <PolarRadiusAxis angle={30} domain={[0, 0]} />
          <Radar
            name="resolved"
            dataKey="resolved"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            name="todo"
            dataKey="todo"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </div>

      <div style={{ marginTop: "40px" }}>
        <Typography variant="h3">priority total cost</Typography>
        <BarChart width={730} height={250} data={priorityRes}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="priority" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quotation" fill="#8884d8" />
          <Bar dataKey="orderCost" fill="#82ca9d" />
          <Bar dataKey="finalCost" fill="orange" />
        </BarChart>
      </div>

      <div style={{ marginTop: "40px" }}>
        <Typography variant="h3">priority to do cost</Typography>
        <BarChart width={730} height={250} data={priorityRes}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="priority" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quotationTodo" fill="#8884d8" />
          <Bar dataKey="orderCostTodo" fill="#82ca9d" />
          <Bar dataKey="finalCostTodo" fill="orange" />
        </BarChart>
      </div>
    </Container>
  );
};

export default Charts;
