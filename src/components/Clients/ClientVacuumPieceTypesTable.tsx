type TableRow = {
  typeOfPiece: string;
  cowType: string;
  count: number;
  totalWeight: number;
};

type Props = {
  data: TableRow[];
  setSelectedPieceType: any;
};

const ClientVacuumPieceTypesTable: React.FC<Props> = ({
  data,
  setSelectedPieceType,
}) => {
  return (
    <div className="max-w-full overflow-auto border-2 border-white rounded h-64 print:overflow-visible print:h-auto">
      <table className="border-2 border-white border-collapse w-full text-center">
        <thead className="bg-green-950 sticky top-0">
          <tr>
            <th className="border border-white px-4 py-2">Type of Piece</th>
            <th className="border border-white px-4 py-2">Cow Type</th>
            <th className="border border-white px-4 py-2">Count</th>
            <th className="border border-white px-4 py-2">Total Weight</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="hover:cursor-pointer hover:bg-green-950"
              onClick={() => {
                setSelectedPieceType({
                  typeOfPiece: row.typeOfPiece,
                  cowType: row.cowType,
                });
              }}
            >
              <td className="border border-white px-4 py-2">
                {row.typeOfPiece}
              </td>
              <td className="border border-white px-4 py-2">{row.cowType}</td>
              <td className="border border-white px-4 py-2">{row.count}</td>
              <td className="border border-white px-4 py-2">
                {row.totalWeight} Kg
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientVacuumPieceTypesTable;
