type TableRow = {
  id: number;
  barcode: string;
  weightIn: number;
  weightOut: number;
  cowType: string;
  workOrder: string;
  store: string;
  status: string;
};

type Props = {
  data: TableRow[];
};

const DashboardTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-full overflow-auto border-2 border-white rounded h-64">
      <table className="border-2 border-white border-collapse w-full text-center">
        <thead className="bg-green-950 sticky top-0">
          <tr>
            <th className="border border-white px-4 py-2">ID</th>
            <th className="border border-white px-4 py-2">Barcode</th>
            <th className="border border-white px-4 py-2">Weight In</th>
            <th className="border border-white px-4 py-2">Weight Out</th>
            <th className="border border-white px-4 py-2">Cow Type</th>
            <th className="border border-white px-4 py-2">Work Order</th>
            <th className="border border-white px-4 py-2">Store</th>
            <th className="border border-white px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="border border-white px-4 py-2">{row.id}</td>
              <td className="border border-white px-4 py-2">{row.barcode}</td>
              <td className="border border-white px-4 py-2">{row.weightIn} Kg</td>
              <td className="border border-white px-4 py-2">{row.weightOut} Kg</td>
              <td className="border border-white px-4 py-2">{row.cowType}</td>
              <td className="border border-white px-4 py-2">{row.workOrder}</td>
              <td className="border border-white px-4 py-2">{row.store}</td>
              <td className="border border-white px-4 py-2">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
