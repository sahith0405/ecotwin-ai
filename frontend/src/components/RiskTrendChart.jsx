import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Aug 08", risk: 82 },
  { date: "Aug 13", risk: 79 },
  { date: "Aug 18", risk: 81 },
  { date: "Aug 23", risk: 77 },
  { date: "Aug 28", risk: 78 },
  { date: "Sep 02", risk: 74 },
  { date: "Sep 06", risk: 76 },
];

function RiskTrendChart() {
  return (
    <div className="risk-trend-chart">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e4ebe8"
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#7b8883" }}
          />

          <YAxis
            domain={[40, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#7b8883" }}
          />

          <Tooltip
            contentStyle={{
              border: "1px solid #dce7e4",
              borderRadius: "10px",
              boxShadow: "0 8px 24px rgba(18, 59, 50, 0.08)",
              fontSize: "11px",
            }}
          />

          <Line
            type="monotone"
            dataKey="risk"
            stroke="#4f8875"
            strokeWidth={3}
            dot={{ r: 4, fill: "#4f8875" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RiskTrendChart;
