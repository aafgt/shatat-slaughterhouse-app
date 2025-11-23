type TableRow = {
  status: string;
  count: number;
  weight: number;
};

type Props = {
  data: TableRow[];
};

const SlaughterReportTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-full overflow-auto border-2 border-white rounded h-48">
      <table className="border-2 border-white border-collapse w-full text-center">
        <thead className="bg-green-950 sticky top-0">
          <tr>
            <th className="border border-white px-4 py-2">Status</th>
            <th className="border border-white px-4 py-2">Count</th>
            <th className="border border-white px-4 py-2">Weight</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border border-white px-4 py-2">{row.status}</td>
              <td className="border border-white px-4 py-2">{row.count}</td>
              <td className="border border-white px-4 py-2">{row.weight} Kg</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SlaughterReportTable;