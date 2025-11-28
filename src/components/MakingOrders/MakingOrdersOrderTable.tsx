type TableRow = {
  cowType: string;
  totalCount: number;
  totalWeightKg: number;
};

type Props = {
  data: TableRow[];
  setSelectedCowType: any;
};

const MakingOrdersOrderTable: React.FC<Props> = ({ data, setSelectedCowType }) => {
  return (
    <div className="max-w-full overflow-auto border-2 border-white rounded h-64 print:overflow-visible print:h-auto">
      <table className="border-2 border-white border-collapse w-full text-center">
        <thead className="bg-green-950 sticky top-0">
          <tr>
            <th className="border border-white px-4 py-2">Cow Type</th>
            <th className="border border-white px-4 py-2">Total Count</th>
            <th className="border border-white px-4 py-2">Total Weight</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="hover:cursor-pointer hover:bg-green-950"
              onClick={() => {
                setSelectedCowType(row.cowType);
              }}
            >
              <td className="border border-white px-4 py-2">
                {row.cowType}
              </td>
              <td className="border border-white px-4 py-2">
                {row.totalCount}
              </td>
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

export default MakingOrdersOrderTable;
