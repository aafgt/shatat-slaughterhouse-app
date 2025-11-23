import { useQuery } from "@tanstack/react-query";
import { fetchVacuumSellingWorkOrders } from "../../util/http";
import type { vacuumSellingWorkOrderDataInterface } from "../../types";
import MetricCard from "../MetricCard";
import { downloadSingleOrderExcel } from "../../util/util";
import { useState } from "react";
import VacuumSellingReportTable from "./VacuumSellingReportTable";
import VacuumSellingReportTablePieces from "./VacuumSellingReportTablePieces";
import VacuumSellingReportPiecesDetails from "./VacuumSellingReportPiecesDetails";

interface SellingReportProps {
  date: string;
}

const VacuumSellingReport: React.FC<SellingReportProps> = ({ date }) => {
  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<vacuumSellingWorkOrderDataInterface>();

  const [selectedPiece, setSelectedPiece] = useState<any>();

  const {
    data: vacuumSellingWorkOrdersData,
    isFetching,
    isError,
    error,
  } = useQuery<vacuumSellingWorkOrderDataInterface[]>({
    queryKey: ["vacuumSellingWorkOrdersDataReport", date],
    queryFn: ({ signal }) => {
      return fetchVacuumSellingWorkOrders({ signal, date });
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
        onClick={() => downloadSingleOrderExcel(vacuumSellingWorkOrdersData)}
        className="px-4 py-2 bg-green-950 text-white rounded hover:bg-black hover:cursor-pointer"
      >
        Export Vacuum Selling Order to Excel
      </button>

      <div className="my-5 flex flex-wrap gap-3">
        {vacuumSellingWorkOrdersData &&
        Array.isArray(vacuumSellingWorkOrdersData) ? (
          vacuumSellingWorkOrdersData.map(
            (wo: vacuumSellingWorkOrderDataInterface) => (
              <button
                key={wo.orderCode}
                type="button"
                className="px-4 py-2 w-fit bg-green-950 text-white rounded hover:bg-black hover:cursor-pointer"
                onClick={() => {
                  setSelectedWorkOrder(wo);
                }}
              >
                {wo.orderCode}
              </button>
            )
          )
        ) : (
          <p>No work orders found for this date</p>
        )}
      </div>

      {selectedWorkOrder && (
        <div>
          <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-5 mt-5">
            <MetricCard title="Date" value={selectedWorkOrder?.date ?? ""} />
            <MetricCard
              title="Order Code"
              value={selectedWorkOrder?.orderCode ?? ""}
            />
            <MetricCard
              title="CLient Name"
              value={selectedWorkOrder?.clientName ?? ""}
            />
            <MetricCard
              title="Total Pieces"
              value={(selectedWorkOrder?.totalPiecesCount ?? 0) + ""}
            />
            <MetricCard
              title="Total Pieces Weight"
              value={(selectedWorkOrder?.totalPiecesWeight ?? 0) + " Kg"}
            />
          </div>

          <div className="mt-5">
            {Array.isArray(selectedWorkOrder?.cowTypes) && (
              <VacuumSellingReportTable
                data={selectedWorkOrder?.cowTypes ?? []}
              />
            )}
          </div>

          <div className="mt-5">
            {Array.isArray(selectedWorkOrder?.cowTypes) && (
              <VacuumSellingReportTablePieces
                data={selectedWorkOrder?.pieces ?? []}
                setSelectedPiece={setSelectedPiece}
              />
            )}
          </div>

          {selectedPiece && (
            <div className="mt-5">
              <VacuumSellingReportPiecesDetails
                cowType={selectedPiece?.cowType}
                orderCode={selectedWorkOrder?.orderCode}
                typeOfPiece={selectedPiece?.typeOfPiece}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default VacuumSellingReport;
