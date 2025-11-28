import { useQuery } from "@tanstack/react-query";
import { fetchCutDashboard } from "../../util/http";
import type { cutDashboardDataInterface } from "../../types";
import MetricCard from "../MetricCard";
import CutDashboardTable from "./CutDashboardTable";
import LineChartGraph from "../LineChartGraph";
import { useState } from "react";
import { downloadMultipleOrdersExcel } from "../../util/util";

interface DashboardProps {
  startDate: string;
  endDate: string;
}

const CutDashboard: React.FC<DashboardProps> = ({ startDate, endDate }) => {
  const [selectedWorkOrder, setSelectedWorkOrder] = useState("");

  const {
    data: dashboardData,
    isFetching,
    isError,
    error,
  } = useQuery<cutDashboardDataInterface>({
    queryKey: ["cut_dashboard", startDate, endDate],
    queryFn: ({ signal, queryKey }) => {
      const [, startDate, endDate] = queryKey as [string, string, string];
      return fetchCutDashboard({ signal, startDate, endDate });
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
    new Set(dashboardData?.table.map((item) => item.cuttingOrderCode))
  );

  return (
    <>
      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-5">
        <MetricCard
          title="Total Cuts"
          value={(dashboardData?.totalCuts ?? 0) + ""}
        />
        <MetricCard
          title="Cut Further Count"
          value={(dashboardData?.cutFurtherCount ?? 0) + ""}
        />
        <MetricCard
          title="Remaining Count"
          value={(dashboardData?.remainingCount ?? 0) + ""}
        />

        <MetricCard
          title="Total Weight"
          value={(dashboardData?.totalWeight ?? 0) + " Kg"}
        />
        <MetricCard
          title="Total Weight Out"
          value={(dashboardData?.totalWeightOut ?? 0) + " Kg"}
        />
        <MetricCard
          title="Total Loss Percentage"
          value={(dashboardData?.totalLossPercentage ?? 0) + " %"}
        />
      </div>

      <div className="my-5 bg-green-950 rounded-lg shadow-lg p-5">
        <p className="mb-3 text-xl">Production Rate</p>
        <LineChartGraph graph={dashboardData?.graph ?? []} dataKey="cuts" />
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
          <CutDashboardTable data={dashboardData?.table ?? []} />
        )}
        {selectedWorkOrder && (
          <CutDashboardTable
            data={
              dashboardData?.table.filter(
                (item) => item.cuttingOrderCode === selectedWorkOrder
              ) ?? []
            }
          />
        )}
      </div>
    </>
  );
};

export default CutDashboard;
