import { useQuery } from "@tanstack/react-query";
import { fetchVacuumSellingWorkOrderPieces } from "../../util/http";
import type { vacuumSellingWorkOrderPieceDataInterface } from "../../types";
import { downloadSingleOrderExcel } from "../../util/util";
import VacuumSellingReportTablePiecesDetails from "./VacuumSellingReportTablePiecesDetails";

interface SellingReportProps {
  typeOfPiece: string;
  orderCode: string;
  cowType: string;
}

const VacuumSellingReportPiecesDetails: React.FC<SellingReportProps> = ({
  typeOfPiece,
  orderCode,
  cowType,
}) => {
  const {
    data: vacuumSellingWorkOrderPiecesData,
    isFetching,
    isError,
    error,
  } = useQuery<vacuumSellingWorkOrderPieceDataInterface[]>({
    queryKey: [
      "vacuumSellingWorkOrderPiecesDataReport",
      typeOfPiece,
      orderCode,
      cowType,
    ],
    queryFn: ({ signal }) => {
      return fetchVacuumSellingWorkOrderPieces({
        signal,
        typeOfPiece,
        orderCode,
        cowType,
      });
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message ?? "An error occurred."}</p>;
  }

  return (
    <>
      <button
        type="button"
        onClick={() =>
          downloadSingleOrderExcel(vacuumSellingWorkOrderPiecesData)
        }
        className="px-4 py-2 bg-green-950 text-white rounded hover:bg-black hover:cursor-pointer"
      >
        Export Vacuum Selling Order Pieces to Excel
      </button>

      <div className="mt-5">
        {Array.isArray(vacuumSellingWorkOrderPiecesData) && (
          <VacuumSellingReportTablePiecesDetails
            data={vacuumSellingWorkOrderPiecesData ?? []}
          />
        )}
      </div>
    </>
  );
};

export default VacuumSellingReportPiecesDetails;