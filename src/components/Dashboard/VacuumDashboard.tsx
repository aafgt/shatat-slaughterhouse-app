import { useQuery } from "@tanstack/react-query";
import { fetchVacuumDashboard } from "../../util/http";
import type { vacuumDashboardDataInterface } from "../../types";
import MetricCard from "../MetricCard";
import VacuumDashboardTable from "./VacuumDashboardTable";
import LineChartGraph from "../LineChartGraph";
import { useState } from "react";
import { downloadMultipleOrdersExcel } from "../../util/util";
import VacuumDashboardAggregatedTable from "./VacuumDashboardAggregatedTable";

type AggregatedItem = {
  workOrderCode: string;
  totalPieceCount: number;
  totalWeight: number;
};

interface DashboardProps {
  startDate: string;
  endDate: string;
}

const VacuumDashboard: React.FC<DashboardProps> = ({ startDate, endDate }) => {
  const [selectedWorkOrder, setSelectedWorkOrder] = useState("");

  const {
    data: dashboardData,
    isFetching,
    isError,
    error,
  } = useQuery<vacuumDashboardDataInterface>({
    queryKey: ["vacuum_dashboard", startDate, endDate],
    queryFn: ({ signal, queryKey }) => {
      const [, startDate, endDate] = queryKey as [string, string, string];
      return fetchVacuumDashboard({ signal, startDate, endDate });
    },
    staleTime: 0,
  });

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message ?? "An error occurred."}</p>;
  }

  const uniqueWorkOrders = Array.from(
    new Set(dashboardData?.table.map((item) => item.workOrderCode))
  );

  const aggregated: AggregatedItem[] = Object.values(
    (dashboardData?.table ?? []).reduce<Record<string, AggregatedItem>>(
      (acc, curr) => {
        if (!acc[curr.workOrderCode]) {
          acc[curr.workOrderCode] = {
            workOrderCode: curr.workOrderCode,
            totalPieceCount: 0,
            totalWeight: 0,
          };
        }

        acc[curr.workOrderCode].totalPieceCount += curr.pieceCount;
        acc[curr.workOrderCode].totalWeight += curr.totalWeight;

        return acc;
      },
      {}
    )
  );

  return (
    <>
      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-5">
        <MetricCard
          title="Total Pieces"
          value={(dashboardData?.totalPieces ?? 0) + ""}
        />
        <MetricCard
          title="Total Weight"
          value={(dashboardData?.totalWeight ?? 0) + " Kg"}
        />
        <MetricCard
          title="Done Work Orders"
          value={(dashboardData?.doneWorkOrders ?? 0) + ""}
        />
        <MetricCard
          title="Total Work Orders"
          value={(dashboardData?.totalWorkOrders ?? 0) + ""}
        />
      </div>

      <div className="my-5 bg-green-950 rounded-lg shadow-lg p-5">
        <p className="mb-3 text-xl">Production Rate</p>
        <LineChartGraph graph={dashboardData?.graph ?? []} dataKey="pieces" />
      </div>

      <div className="mt-5">
        <div className="flex justify-between">
          <div>
            {uniqueWorkOrders.map((wo) => (
              <button
                key={wo}
                type="button"
                onClick={() => setSelectedWorkOrder(wo)}
                className="underline underline-offset-4 p-3 hover:cursor-pointer hover:no-underline"
              >
                {wo}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              downloadMultipleOrdersExcel(dashboardData?.table ?? [])
            }
            className="my-3 px-4 py-2 bg-green-950 text-white rounded hover:bg-black hover:cursor-pointer"
          >
            Export to Excel
          </button>
        </div>

        {!selectedWorkOrder && (
          <VacuumDashboardTable data={dashboardData?.table ?? []} />
        )}
        {selectedWorkOrder && (
          <VacuumDashboardTable
            data={
              dashboardData?.table.filter(
                (item) => item.workOrderCode === selectedWorkOrder
              ) ?? []
            }
          />
        )}

        <div className="mt-5">
          <h6 className="text-2xl">Total</h6>
          <VacuumDashboardAggregatedTable data={aggregated} />
        </div>
      </div>
    </>
  );
};

export default VacuumDashboard;
