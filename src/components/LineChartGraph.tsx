import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type GraphPoint = {
  time: string;
  [key: string]: number | string;
};

interface GraphProps {
  graph: GraphPoint[];
  dataKey: string;
}

const LineChartGraph: React.FC<GraphProps> = ({ graph, dataKey }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={graph} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="0 3" />
        <XAxis dataKey="time" />
        <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
        <Tooltip />
        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" strokeWidth={4} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartGraph;