type TableRow = {
  workOrderCode: string;
  typeOfPiece: string;
  pieceCount: number;
  totalWeight: number;
};

type Props = {
  data: TableRow[];
};

const VacuumDashboardTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-full overflow-auto border-2 border-white rounded h-64">
      <table className="border-2 border-white border-collapse w-full text-center">
        <thead className="bg-green-950 sticky top-0">
          <tr>
            <th className="border border-white px-4 py-2">Work Order Code</th>
            <th className="border border-white px-4 py-2">Type Of Piece</th>
            <th className="border border-white px-4 py-2">Piece Count</th>
            <th className="border border-white px-4 py-2">Total Weight</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border border-white px-4 py-2">{row.workOrderCode}</td>
              <td className="border border-white px-4 py-2">{row.typeOfPiece}</td>
              <td className="border border-white px-4 py-2">{row.pieceCount}</td>
              <td className="border border-white px-4 py-2">{row.totalWeight} Kg</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VacuumDashboardTable;