"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Main({ tesData }) {
  const count = tesData.length;
  const barWidth = 10;
  const height = 500;
  const widthByRow = count * barWidth;
  const minWidth = 1500;
  const width = widthByRow > minWidth ? widthByRow : minWidth;

  function onClick(event: any) {
    window.open(event.url, "_blank");
  }

  return (
    <div style={{ width: "100%" }} className="overflow-y-auto">
      <BarChart width={width} height={height} data={tesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value, name, props) => {
            return `${props.payload[name].toLocaleString()} - ${
              props.payload.title
            }`;
          }}
        />
        <Legend />
        <Bar dataKey="views" fill="#8884d8" stackId="a" onClick={onClick} />
      </BarChart>
      <BarChart width={width} height={height} data={tesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value, name, props) => {
            return `${props.payload[name].toLocaleString()} - ${
              props.payload.title
            }`;
          }}
        />
        <Legend />
        <Bar dataKey="comments" fill="#FF0000" stackId="a" onClick={onClick} />
      </BarChart>
    </div>
  );
}
