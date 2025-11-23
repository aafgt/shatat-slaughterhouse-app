type TableRow = {
  barcode: string;
  workOrder: string;
  weight: number;
  date: string;
};

type Props = {
  data: TableRow[];
};

const ClientVacuumPiecesTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-full overflow-auto border-2 border-white rounded h-64 print:overflow-visible print:h-auto">
      <table className="border-2 border-white border-collapse w-full text-center">
        <thead className="bg-green-950 sticky top-0">
          <tr>
            <th className="border border-white px-4 py-2">Barcode</th>
            <th className="border border-white px-4 py-2">Work Order</th>
            <th className="border border-white px-4 py-2">Weight</th>
            <th className="border border-white px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border border-white px-4 py-2">{row.barcode}</td>
              <td className="border border-white px-4 py-2">{row.workOrder}</td>
              <td className="border border-white px-4 py-2">{row.weight} Kg</td>
              <td className="border border-white px-4 py-2">{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientVacuumPiecesTable;
