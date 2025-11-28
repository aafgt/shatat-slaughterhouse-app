import { useQuery } from "@tanstack/react-query";
import { fetchDashboard } from "../../util/http";
import MetricCard from "../MetricCard";
import type { dashboardDataInterface } from "../../types";
import DashboardTable from "./DashboardTable";
import LineChartGraph from "../LineChartGraph";
import { useState } from "react";
import { downloadMultipleOrdersExcel } from "../../util/util";

interface DashboardProps {
  startDate: string;
  endDate: string;
}

const DashboardDashboard: React.FC<DashboardProps> = ({
  startDate,
  endDate,
}) => {
  const [selectedWorkOrder, setSelectedWorkOrder] = useState("");

  const {
    data: dashboardData,
    isFetching,
    isError,
    error,
  } = useQuery<dashboardDataInterface>({
    queryKey: ["dashboard", startDate, endDate],
    queryFn: ({ signal, queryKey }) => {
      const [, startDate, endDate] = queryKey as [string, string, string];
      return fetchDashboard({ signal, startDate, endDate });
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
    new Set(dashboardData?.table.map((item) => item.workOrder))
  );

  return (
    <>
      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-5">
        <MetricCard
          title="Cows Slaughtered"
          value={(dashboardData?.cowsSlaughtered ?? 0) + ""}
        />
        <MetricCard
          title="Total Cuts"
          value={(dashboardData?.totalCuts ?? 0) + ""}
        />
        <MetricCard
          title="Total Cuts Weight"
          value={(dashboardData?.totalCutsWeight ?? 0) + " Kg"}
        />
        <MetricCard
          title="Liver Weight"
          value={(dashboardData?.liverWeight ?? 0) + " Kg"}
        />
        <MetricCard
          title="Heart Weight"
          value={(dashboardData?.heartWeight ?? 0) + " Kg"}
        />
        <MetricCard
          title="Fat Bosh"
          value={(dashboardData?.fatBosh ?? 0) + " Kg"}
        />
        <MetricCard
          title="Fat Kidney"
          value={(dashboardData?.fatKidney ?? 0) + " Kg"}
        />
        <MetricCard
          title="Two Kidneys Weight"
          value={(dashboardData?.twoKidneysWeight ?? 0) + " Kg"}
        />
        <MetricCard
          title="Two Testicles Weight"
          value={(dashboardData?.twoTesticlesWeight ?? 0) + " Kg"}
        />
      </div>

      <div className="my-5 bg-green-950 rounded-lg shadow-lg p-5">
        <p className="mb-3 text-xl">Production Rate</p>
        <LineChartGraph graph={dashboardData?.graph ?? []} dataKey="weight" />
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
          <DashboardTable data={dashboardData?.table ?? []} />
        )}
        {selectedWorkOrder && (
          <DashboardTable
            data={
              dashboardData?.table.filter(
                (item) => item.workOrder === selectedWorkOrder
              ) ?? []
            }
          />
        )}
      </div>
    </>
  );
};

export default DashboardDashboard;
