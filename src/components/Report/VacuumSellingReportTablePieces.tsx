type TableRow = {
  typeOfPiece: string;
  count: number;
  totalWeight: number;
  cowType: string;
};

type Props = {
  data: TableRow[];
  setSelectedPiece: any;
};

const VacuumSellingReportTablePieces: React.FC<Props> = ({
  data,
  setSelectedPiece,
}) => {
  return (
    <div className="max-w-full overflow-auto border-2 border-white rounded max-h-60">
      <table className="border-2 border-white border-collapse w-full text-center">
        <thead className="bg-green-950 sticky top-0">
          <tr>
            <th className="border border-white px-4 py-2">Type of Piece</th>
            <th className="border border-white px-4 py-2">Count</th>
            <th className="border border-white px-4 py-2">Total Weight</th>
            <th className="border border-white px-4 py-2">Cow Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="hover:cursor-pointer hover:bg-green-950"
              onClick={() => {
                setSelectedPiece({
                  typeOfPiece: row.typeOfPiece,
                  cowType: row.cowType,
                });
              }}
            >
              <td className="border border-white px-4 py-2">
                {row.typeOfPiece}
              </td>
              <td className="border border-white px-4 py-2">{row.count}</td>
              <td className="border border-white px-4 py-2">
                {row.totalWeight} Kg
              </td>
              <td className="border border-white px-4 py-2">{row.cowType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VacuumSellingReportTablePieces;
