type TableRow = {
  workOrderCode: string;
  totalPieceCount: number;
  totalWeight: number;
};

type Props = {
  data: TableRow[];
};

const VacuumDashboardAggregatedTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-full overflow-auto border-2 border-white rounded h-64">
      <table className="border-2 border-white border-collapse w-full text-center">
        <thead className="bg-green-950 sticky top-0">
          <tr>
            <th className="border border-white px-4 py-2">Work Order Code</th>
            <th className="border border-white px-4 py-2">Total Piece Count</th>
            <th className="border border-white px-4 py-2">Total Weight</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border border-white px-4 py-2">
                {row.workOrderCode}
              </td>
              <td className="border border-white px-4 py-2">
                {row.totalPieceCount}
              </td>
              <td className="border border-white px-4 py-2">
                {row.totalWeight.toFixed(2)} Kg
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VacuumDashboardAggregatedTable;
