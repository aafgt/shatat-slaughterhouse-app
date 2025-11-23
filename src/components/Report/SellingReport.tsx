import { useQuery } from "@tanstack/react-query";
import { fetchSellingWorkOrder } from "../../util/http";
import type { sellingWorkOrderDataInterface } from "../../types";
import MetricCard from "../MetricCard";
import { downloadSingleOrderExcel } from "../../util/util";
import SellingReportTable from "./SellingReportTable";

interface SellingReportProps {
  sellingWorkOrderCode: string;
}

const SellingReport: React.FC<SellingReportProps> = ({
  sellingWorkOrderCode,
}) => {
  const {
    data: sellingWorkOrderData,
    isFetching,
    isError,
    error,
  } = useQuery<sellingWorkOrderDataInterface>({
    queryKey: ["sellingWorkOrderDataReport", sellingWorkOrderCode],
    queryFn: ({ signal }) => {
      return fetchSellingWorkOrder({ signal, sellingWorkOrderCode });
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message ?? "An error occurred."}</p>;
  }

  const totalLoss = ((sellingWorkOrderData?.totalWeightSellKg ?? 0) - (sellingWorkOrderData?.totalWeightOutSellKg ?? 0)).toFixed(2);
  const totalLossPercentage = (((parseFloat(totalLoss) ?? 0) / (sellingWorkOrderData?.totalWeightSellKg ?? 0)) * 100).toFixed(2);

  return (
    <>
      <button
        type="button"
        onClick={() => downloadSingleOrderExcel(sellingWorkOrderData)}
        className="px-4 py-2 bg-green-950 text-white rounded hover:bg-black hover:cursor-pointer"
      >
        Export Selling Order to Excel
      </button>

      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-5 mt-5">
        <MetricCard
          title="Total Sell Cuts"
          value={(sellingWorkOrderData?.totalSellCuts ?? 0) + ""}
        />
        <MetricCard
          title="Total Sell Cuts Out"
          value={(sellingWorkOrderData?.totalSellCutsOut ?? 0) + ""}
        />
        <MetricCard
          title="Total Weight Out Sell"
          value={(sellingWorkOrderData?.totalWeightOutSellKg ?? 0) + " Kg"}
        />
        <MetricCard
          title="Total Weight Sell"
          value={(sellingWorkOrderData?.totalWeightSellKg ?? 0) + " Kg"}
        />

        <MetricCard
          title="Total Loss"
          value={(totalLoss ?? 0) + " Kg"}
        />
        <MetricCard
          title="Total Loss Percentage"
          value={(totalLossPercentage ?? 0) + " %"}
        />
      </div>

      <div className="mt-5">
        {Array.isArray(sellingWorkOrderData?.cutsTable) && (
          <SellingReportTable data={sellingWorkOrderData?.cutsTable ?? []} />
        )}
      </div>
    </>
  );
};

export default SellingReport;
