type TableRow = {
  workOrderCode: string;
  cuttingOrderCode: string;
  cowType: string;
  cutKind: string;
  storeName: string;
  barcode: string;
  weight: number;
  weightOut: number;
};

type Props = {
  data: TableRow[];
};

const CutDashboardTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-full overflow-auto border-2 border-white rounded h-64">
      <table className="border-2 border-white border-collapse w-full text-center">
        <thead className="bg-green-950 sticky top-0">
          <tr>
            <th className="border border-white px-4 py-2">Work Order Code</th>
            <th className="border border-white px-4 py-2">
              Cutting Order Code
            </th>
            <th className="border border-white px-4 py-2">Barcode</th>
            <th className="border border-white px-4 py-2">Cow Type</th>
            <th className="border border-white px-4 py-2">Cut Kind</th>
            <th className="border border-white px-4 py-2">Weight</th>
            <th className="border border-white px-4 py-2">Weight Out</th>
            <th className="border border-white px-4 py-2">Store Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.barcode}>
              <td className="border border-white px-4 py-2">
                {row.workOrderCode}
              </td>
              <td className="border border-white px-4 py-2">
                {row.cuttingOrderCode}
              </td>
              <td className="border border-white px-4 py-2">{row.barcode}</td>
              <td className="border border-white px-4 py-2">{row.cowType}</td>
              <td className="border border-white px-4 py-2">{row.cutKind}</td>
              <td className="border border-white px-4 py-2">{row.weight} Kg</td>
              <td className="border border-white px-4 py-2">
                {row.weightOut} Kg
              </td>
              <td className="border border-white px-4 py-2">{row.storeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CutDashboardTable;
