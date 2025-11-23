type TableRow = {
  weightKg: number;
  barcode: string;
  orderCode: string;
};

type Props = {
  data: TableRow[];
};

const VacuumSellingReportTablePiecesDetails: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-full overflow-auto border-2 border-white rounded max-h-60">
      <table className="border-2 border-white border-collapse w-full text-center">
        <thead className="bg-green-950 sticky top-0">
          <tr>
            <th className="border border-white px-4 py-2">Weight</th>
            <th className="border border-white px-4 py-2">barcode</th>
            <th className="border border-white px-4 py-2">Order Code</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border border-white px-4 py-2">{row.weightKg} Kg</td>
              <td className="border border-white px-4 py-2">{row.barcode}</td>
              <td className="border border-white px-4 py-2">{row.orderCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VacuumSellingReportTablePiecesDetails;