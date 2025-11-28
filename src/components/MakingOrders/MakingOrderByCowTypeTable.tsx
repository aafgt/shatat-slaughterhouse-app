type TableRow = {
  count: number;
  pieceType: string;
  pieces: {
    barcode: string;
    batchNumber: string;
    grossWeight: number;
    netWeight: number;
  }[];
  totalWeightKg: number;
};

type Props = {
  data: TableRow[];
  setSelectedPieces: any;
};

const MakingOrderByCowTypeTable: React.FC<Props> = ({
  data,
  setSelectedPieces,
}) => {
  return (
    <div className="max-w-full overflow-auto border-2 border-white rounded h-64 print:overflow-visible print:h-auto">
      <table className="border-2 border-white border-collapse w-full text-center">
        <thead className="bg-green-950 sticky top-0">
          <tr>
            <th className="border border-white px-4 py-2">Count</th>
            <th className="border border-white px-4 py-2">Piece Type</th>
            <th className="border border-white px-4 py-2">Total Weight</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="hover:cursor-pointer hover:bg-green-950"
              onClick={() => {
                setSelectedPieces({
                  pieceType: row.pieceType,
                  pieces: row.pieces,
                });
              }}
            >
              <td className="border border-white px-4 py-2">{row.count}</td>
              <td className="border border-white px-4 py-2">{row.pieceType}</td>
              <td className="border border-white px-4 py-2">
                {row.totalWeightKg} Kg
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MakingOrderByCowTypeTable;
