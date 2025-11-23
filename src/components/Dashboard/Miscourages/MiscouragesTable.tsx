type TableRow = {
  miscourageName: string;
  weightKg: number;
  parnekaWeightKg: number;
  status: string;
  barcode: string;
};

type Props = {
  data: TableRow[];
};

const MiscouragesTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-full overflow-auto border-2 border-white rounded h-72">
      <table className="border-2 border-white border-collapse w-full text-center">
        <thead className="bg-green-950 sticky top-0">
          <tr>
            <th className="border border-white px-4 py-2">Miscourage Name</th>
            <th className="border border-white px-4 py-2">Weight</th>
            <th className="border border-white px-4 py-2">Parneka Weight</th>
            <th className="border border-white px-4 py-2">Status</th>
            <th className="border border-white px-4 py-2">Barcode</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border border-white px-4 py-2">{row.miscourageName}</td>
              <td className="border border-white px-4 py-2">{row.weightKg} Kg</td>
              <td className="border border-white px-4 py-2">{row.parnekaWeightKg} Kg</td>
              <td className="border border-white px-4 py-2">{row.status}</td>
              <td className="border border-white px-4 py-2">{row.barcode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MiscouragesTable;