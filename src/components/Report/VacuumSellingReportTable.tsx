type TableRow = {
  cowType: string;
  totalWeightKg: number;
};

type Props = {
  data: TableRow[];
};

const VacuumSellingReportTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-full overflow-auto border-2 border-white rounded max-h-60">
      <table className="border-2 border-white border-collapse w-full text-center">
        <thead className="bg-green-950 sticky top-0">
          <tr>
            <th className="border border-white px-4 py-2">Cow Type</th>
            <th className="border border-white px-4 py-2">Total Weight</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border border-white px-4 py-2">{row.cowType}</td>
              <td className="border border-white px-4 py-2">{row.totalWeightKg} Kg</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VacuumSellingReportTable;
