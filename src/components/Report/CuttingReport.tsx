import { useQuery } from "@tanstack/react-query";
import { fetchCuttingWorkOrder } from "../../util/http";
import type { cuttingWorkOrderDataInterface } from "../../types";
import MetricCard from "../MetricCard";
import { downloadSingleOrderExcel } from "../../util/util";

interface CuttingReportProps {
  cuttingWorkOrderCode: string;
}

const CuttingReport: React.FC<CuttingReportProps> = ({
  cuttingWorkOrderCode,
}) => {
  const {
    data: cuttingWorkOrderData,
    isFetching,
    isError,
    error,
  } = useQuery<cuttingWorkOrderDataInterface>({
    queryKey: ["cuttingWorkOrderDataReport", cuttingWorkOrderCode],
    queryFn: ({ signal }) => {
      return fetchCuttingWorkOrder({ signal, cuttingWorkOrderCode });
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
        onClick={() => downloadSingleOrderExcel(cuttingWorkOrderData)}
        className="px-4 py-2 bg-green-950 text-white rounded hover:bg-black hover:cursor-pointer"
      >
        Export Cutting Order to Excel
      </button>

      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-5 mt-5">
        <MetricCard
          title="Total Cut Further"
          value={(cuttingWorkOrderData?.totalCutFurther ?? 0) + ""}
        />
        <MetricCard
          title="Total Cut Further Out"
          value={(cuttingWorkOrderData?.totalCutFurtherOut ?? 0) + ""}
        />
        <MetricCard
          title="Total Vacuum Pieces"
          value={(cuttingWorkOrderData?.totalVacuumPieces ?? 0) + ""}
        />
        <MetricCard
          title="Total Vacuum Weight"
          value={(cuttingWorkOrderData?.totalVacuumWeightKg ?? 0) + " Kg"}
        />
        <MetricCard
          title="Total Weight In"
          value={(cuttingWorkOrderData?.totalWeightIn ?? 0) + " Kg"}
        />
        {/* <MetricCard
          title="Total Weight Of Order"
          value={(cuttingWorkOrderData?.totalWeightOfOrder ?? 0) + " Kg"}
        /> */}
        <MetricCard
          title="Total Weight Out"
          value={(cuttingWorkOrderData?.totalWeightOut ?? 0) + " Kg"}
        />

        <MetricCard
          title="GA لحوم"
          value={(cuttingWorkOrderData?.["GA لحوم"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="GB لحوم"
          value={(cuttingWorkOrderData?.["GB لحوم"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="حلويات"
          value={(cuttingWorkOrderData?.حلويات ?? 0) + " Kg"}
        />
        <MetricCard
          title="دهن بوش"
          value={(cuttingWorkOrderData?.["دهن بوش"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="دهن كلاوي"
          value={(cuttingWorkOrderData?.["دهن كلاوي"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="دهون مشفاه"
          value={(cuttingWorkOrderData?.["دهون مشفاه"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="سنم"
          value={(cuttingWorkOrderData?.سنم ?? 0) + " Kg"}
        />
        <MetricCard
          title="عرق دم"
          value={(cuttingWorkOrderData?.["عرق دم"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="عظام تشافي"
          value={(cuttingWorkOrderData?.["عظام تشافي"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="غدد اعدام"
          value={(cuttingWorkOrderData?.["غدد اعدام"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="غضاريف"
          value={(cuttingWorkOrderData?.غضاريف ?? 0) + " Kg"}
        />
        <MetricCard
          title="قراقيش"
          value={(cuttingWorkOrderData?.قراقيش ?? 0) + " Kg"}
        />
        <MetricCard
          title="كلاوي"
          value={(cuttingWorkOrderData?.كلاوي ?? 0) + " Kg"}
        />
        <MetricCard
          title="كنسه"
          value={(cuttingWorkOrderData?.كنسه ?? 0) + " Kg"}
        />
        <MetricCard
          title="لحوم اعدام"
          value={(cuttingWorkOrderData?.["لحوم اعدام"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="لحوم كدمات"
          value={(cuttingWorkOrderData?.["لحوم كدمات"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="لحوم مشفاه"
          value={(cuttingWorkOrderData?.["لحوم مشفاه"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="لحوم ناف"
          value={(cuttingWorkOrderData?.["لحوم ناف"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="مخاصي"
          value={(cuttingWorkOrderData?.مخاصي ?? 0) + " Kg"}
        />
        <MetricCard
          title="نخاع"
          value={(cuttingWorkOrderData?.نخاع ?? 0) + " Kg"}
        />
        <MetricCard
          title="ورق حجر"
          value={(cuttingWorkOrderData?.["ورق حجر"] ?? 0) + " Kg"}
        />
      </div>
    </>
  );
};

export default CuttingReport;
