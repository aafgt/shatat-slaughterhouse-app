type TableRow = {
  cowCode: string;
  weightSell: number;
};

type Props = {
  data: TableRow[];
};

const ReceiptTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-full overflow-auto border-2 border-white rounded h-64 print:overflow-visible print:h-auto">
      <table className="border-2 border-white border-collapse w-full text-center">
        <thead className="bg-green-950 sticky top-0">
          <tr>
            <th className="border border-white px-4 py-2">Cow Code</th>
            <th className="border border-white px-4 py-2">Weight</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border border-white px-4 py-2">{row.cowCode}</td>
              <td className="border border-white px-4 py-2">{row.weightSell} Kg</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceiptTable;