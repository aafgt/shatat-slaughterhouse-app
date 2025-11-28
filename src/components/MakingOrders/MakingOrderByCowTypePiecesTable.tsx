type TableRow = {
  barcode: string;
  batchNumber: string;
  grossWeight: number;
  netWeight: number;
};

type Props = {
  data: TableRow[];
};

const MakingOrderByCowTypePiecesTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-full overflow-auto border-2 border-white rounded h-64 print:overflow-visible print:h-auto">
      <table className="border-2 border-white border-collapse w-full text-center">
        <thead className="bg-green-950 sticky top-0">
          <tr>
            <th className="border border-white px-4 py-2">Barcode</th>
            <th className="border border-white px-4 py-2">Batch Number</th>
            <th className="border border-white px-4 py-2">Gross Weight</th>
            <th className="border border-white px-4 py-2">Net Weight</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border border-white px-4 py-2">{row.barcode}</td>
              <td className="border border-white px-4 py-2">
                {row.batchNumber}
              </td>
              <td className="border border-white px-4 py-2">
                {row.grossWeight} Kg
              </td>
              <td className="border border-white px-4 py-2">
                {row.netWeight} Kg
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MakingOrderByCowTypePiecesTable;
