type TableRow = {
  cutType: string;
  weightInKg: number;
  weightOutKg: number;
  barcode: string;
  workOrderCode: string;
  storeName: string;
  cowCode: string;
  cowType: string;
};

type Props = {
  data: TableRow[];
};

const SellingReportTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-full overflow-auto border-2 border-white rounded h-60">
      <table className="border-2 border-white border-collapse w-full text-center">
        <thead className="bg-green-950 sticky top-0">
          <tr>
            <th className="border border-white px-4 py-2">Cut Type</th>
            <th className="border border-white px-4 py-2">Weight In</th>
            <th className="border border-white px-4 py-2">Weight Out</th>
            <th className="border border-white px-4 py-2">Barcode</th>
            <th className="border border-white px-4 py-2">Work Order Code</th>
            <th className="border border-white px-4 py-2">Store Name</th>
            <th className="border border-white px-4 py-2">Cow Code</th>
            <th className="border border-white px-4 py-2">Cow Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border border-white px-4 py-2">{row.cutType}</td>
              <td className="border border-white px-4 py-2">{row.weightInKg} Kg</td>
              <td className="border border-white px-4 py-2">{row.weightOutKg} Kg</td>
              <td className="border border-white px-4 py-2">{row.barcode}</td>
              <td className="border border-white px-4 py-2">{row.workOrderCode}</td>
              <td className="border border-white px-4 py-2">{row.storeName}</td>
              <td className="border border-white px-4 py-2">{row.cowCode}</td>
              <td className="border border-white px-4 py-2">{row.cowType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellingReportTable;
