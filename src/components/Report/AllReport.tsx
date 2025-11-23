import { useQuery } from "@tanstack/react-query";
import { fetchAllWorkOrder } from "../../util/http";
import type { allWorkOrdersDataInterface } from "../../types";
import MetricCard from "../MetricCard";
import SlaughterReportTable from "./SlaughterReportTable";
import { downloadAllOrderExcel } from "../../util/util";
import SellingReportTable from "./SellingReportTable";
import SelledVacuumTable from "./SelledVacuumTable";

interface AllReportProps {
  workOrderCode: string;
}

const AllReport: React.FC<AllReportProps> = ({ workOrderCode }) => {
  const {
    data: allWorkOrderData,
    isFetching,
    isError,
    error,
  } = useQuery<allWorkOrdersDataInterface>({
    queryKey: ["allWorkOrderDataReport", workOrderCode],
    queryFn: ({ signal }) => {
      return fetchAllWorkOrder({ signal, workOrderCode });
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message ?? "An error occurred."}</p>;
  }

  const totalLoss = (
    (allWorkOrderData?.sellingSummary?.totalWeightSellKg ?? 0) -
    (allWorkOrderData?.sellingSummary?.totalWeightOutSellKg ?? 0)
  ).toFixed(2);
  const totalLossPercentage = (
    ((parseFloat(totalLoss) ?? 0) /
      (allWorkOrderData?.sellingSummary?.totalWeightSellKg ?? 0)) *
    100
  ).toFixed(2);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (!allWorkOrderData) return;
          downloadAllOrderExcel({
            ...allWorkOrderData,
            sellingSummary: {
              ...allWorkOrderData?.sellingSummary,
              totalLoss: totalLoss,
              totalLossPercentage: totalLossPercentage,
            },
          });
        }}
        className="px-4 py-2 bg-green-950 text-white rounded hover:bg-black hover:cursor-pointer"
      >
        Export Report to Excel
      </button>

      <h6 className="mt-5 text-2xl">Slaughter</h6>
      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-5 mt-2">
        <MetricCard
          title="Client Name"
          value={allWorkOrderData?.cutsSummary?.clientName ?? ""}
        />
        <MetricCard
          title="Supplier Name"
          value={allWorkOrderData?.cutsSummary?.supplierName ?? ""}
        />
        <MetricCard
          title="Cow Type"
          value={allWorkOrderData?.cutsSummary?.cowType ?? ""}
        />
        <MetricCard
          title="Number Of Cows"
          value={(allWorkOrderData?.cutsSummary?.numberOfCows ?? 0) + ""}
        />
        <MetricCard
          title="Total Cuts"
          value={(allWorkOrderData?.cutsSummary?.totalCuts ?? 0) + ""}
        />
        <MetricCard
          title="Total Weight"
          value={(allWorkOrderData?.cutsSummary?.totalWeightKg ?? 0) + " Kg"}
        />
        <MetricCard
          title="Total Weight Out"
          value={(allWorkOrderData?.cutsSummary?.totalWeightOutKg ?? 0) + " Kg"}
        />

        <MetricCard
          title="حلويات"
          value={(allWorkOrderData?.cutsSummary?.حلويات ?? 0) + " Kg"}
        />
        <MetricCard
          title="دبر"
          value={(allWorkOrderData?.cutsSummary?.دبر ?? 0) + " Kg"}
        />
        <MetricCard
          title="دهن بوش"
          value={(allWorkOrderData?.cutsSummary?.["دهن بوش"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="دهن حلويات"
          value={(allWorkOrderData?.cutsSummary?.["دهن حلويات"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="دهن دبر"
          value={(allWorkOrderData?.cutsSummary?.["دهن دبر"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="دهن كلاوي"
          value={(allWorkOrderData?.cutsSummary?.["دهن كلاوي"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="زور"
          value={(allWorkOrderData?.cutsSummary?.زور ?? 0) + " Kg"}
        />
        <MetricCard
          title="عرق دم"
          value={(allWorkOrderData?.cutsSummary?.["عرق دم"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="عطم"
          value={(allWorkOrderData?.cutsSummary?.عطم ?? 0) + " Kg"}
        />
        <MetricCard
          title="كرشه"
          value={(allWorkOrderData?.cutsSummary?.كرشه ?? 0) + " Kg"}
        />
        <MetricCard
          title="كلاوي"
          value={(allWorkOrderData?.cutsSummary?.كلاوي ?? 0) + " Kg"}
        />
        <MetricCard
          title="لحم ابر"
          value={(allWorkOrderData?.cutsSummary?.["لحم ابر"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="لحم رقبه"
          value={(allWorkOrderData?.cutsSummary?.["لحم رقبه"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="لحوم كدمات"
          value={(allWorkOrderData?.cutsSummary?.["لحوم كدمات"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="مخاصي"
          value={(allWorkOrderData?.cutsSummary?.مخاصي ?? 0) + " Kg"}
        />
        <MetricCard
          title="مفاريم"
          value={(allWorkOrderData?.cutsSummary?.مفاريم ?? 0) + " Kg"}
        />
        <MetricCard
          title="ممبار"
          value={(allWorkOrderData?.cutsSummary?.ممبار ?? 0) + " Kg"}
        />
        <MetricCard
          title="مواسير تصنيع"
          value={(allWorkOrderData?.cutsSummary?.["مواسير تصنيع"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="نخاع"
          value={(allWorkOrderData?.cutsSummary?.نخاع ?? 0) + " Kg"}
        />
        <MetricCard
          title="هالك دبحه"
          value={(allWorkOrderData?.cutsSummary?.["هالك دبحه"] ?? 0) + " Kg"}
        />
      </div>

      <div className="mt-5">
        <h6 className="font-bold text-2xl text-right">قلب</h6>
        {Array.isArray(allWorkOrderData?.cutsSummary?.قلب) && (
          <SlaughterReportTable
            data={allWorkOrderData?.cutsSummary?.قلب ?? []}
          />
        )}
      </div>

      <div className="mt-5">
        <h6 className="font-bold text-2xl text-right">كبد</h6>
        {Array.isArray(allWorkOrderData?.cutsSummary?.كبد) && (
          <SlaughterReportTable
            data={allWorkOrderData?.cutsSummary?.كبد ?? []}
          />
        )}
      </div>

      <h6 className="mt-5 text-2xl">Cutting</h6>
      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-5 mt-2">
        <MetricCard
          title="Total Cut Further"
          value={(allWorkOrderData?.cuttingSummary?.totalCutFurther ?? 0) + ""}
        />
        <MetricCard
          title="Total Cut Further Out"
          value={
            (allWorkOrderData?.cuttingSummary?.totalCutFurtherOut ?? 0) + ""
          }
        />
        <MetricCard
          title="Total Vacuum Pieces"
          value={
            (allWorkOrderData?.cuttingSummary?.totalVacuumPieces ?? 0) + ""
          }
        />
        <MetricCard
          title="Total Vacuum Weight"
          value={
            (allWorkOrderData?.cuttingSummary?.totalVacuumWeightKg ?? 0) + " Kg"
          }
        />
        <MetricCard
          title="Total Weight In"
          value={(allWorkOrderData?.cuttingSummary?.totalWeightIn ?? 0) + " Kg"}
        />
        <MetricCard
          title="Total Weight Out"
          value={
            (allWorkOrderData?.cuttingSummary?.totalWeightOut ?? 0) + " Kg"
          }
        />

        <MetricCard
          title="GA لحوم"
          value={(allWorkOrderData?.cuttingSummary?.["GA لحوم"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="GB لحوم"
          value={(allWorkOrderData?.cuttingSummary?.["GB لحوم"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="حلويات"
          value={(allWorkOrderData?.cuttingSummary?.حلويات ?? 0) + " Kg"}
        />
        <MetricCard
          title="دهن بوش"
          value={(allWorkOrderData?.cuttingSummary?.["دهن بوش"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="دهن كلاوي"
          value={(allWorkOrderData?.cuttingSummary?.["دهن كلاوي"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="دهون مشفاه"
          value={
            (allWorkOrderData?.cuttingSummary?.["دهون مشفاه"] ?? 0) + " Kg"
          }
        />
        <MetricCard
          title="سنم"
          value={(allWorkOrderData?.cuttingSummary?.سنم ?? 0) + " Kg"}
        />
        <MetricCard
          title="عرق دم"
          value={(allWorkOrderData?.cuttingSummary?.["عرق دم"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="عظام تشافي"
          value={
            (allWorkOrderData?.cuttingSummary?.["عظام تشافي"] ?? 0) + " Kg"
          }
        />
        <MetricCard
          title="غدد اعدام"
          value={(allWorkOrderData?.cuttingSummary?.["غدد اعدام"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="غضاريف"
          value={(allWorkOrderData?.cuttingSummary?.غضاريف ?? 0) + " Kg"}
        />
        <MetricCard
          title="قراقيش"
          value={(allWorkOrderData?.cuttingSummary?.قراقيش ?? 0) + " Kg"}
        />
        <MetricCard
          title="كلاوي"
          value={(allWorkOrderData?.cuttingSummary?.كلاوي ?? 0) + " Kg"}
        />
        <MetricCard
          title="كنسه"
          value={(allWorkOrderData?.cuttingSummary?.كنسه ?? 0) + " Kg"}
        />
        <MetricCard
          title="لحوم اعدام"
          value={
            (allWorkOrderData?.cuttingSummary?.["لحوم اعدام"] ?? 0) + " Kg"
          }
        />
        <MetricCard
          title="لحوم كدمات"
          value={
            (allWorkOrderData?.cuttingSummary?.["لحوم كدمات"] ?? 0) + " Kg"
          }
        />
        <MetricCard
          title="لحوم مشفاه"
          value={
            (allWorkOrderData?.cuttingSummary?.["لحوم مشفاه"] ?? 0) + " Kg"
          }
        />
        <MetricCard
          title="لحوم ناف"
          value={(allWorkOrderData?.cuttingSummary?.["لحوم ناف"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="مخاصي"
          value={(allWorkOrderData?.cuttingSummary?.مخاصي ?? 0) + " Kg"}
        />
        <MetricCard
          title="نخاع"
          value={(allWorkOrderData?.cuttingSummary?.نخاع ?? 0) + " Kg"}
        />
        <MetricCard
          title="ورق حجر"
          value={(allWorkOrderData?.cuttingSummary?.["ورق حجر"] ?? 0) + " Kg"}
        />
      </div>

      <h6 className="mt-5 text-2xl">Selling</h6>
      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-5 mt-2">
        <MetricCard
          title="Total Sell Cuts"
          value={(allWorkOrderData?.sellingSummary?.totalSellCuts ?? 0) + ""}
        />
        <MetricCard
          title="Total Sell Cuts Out"
          value={(allWorkOrderData?.sellingSummary?.totalSellCutsOut ?? 0) + ""}
        />
        <MetricCard
          title="Total Weight Out Sell"
          value={
            (allWorkOrderData?.sellingSummary?.totalWeightOutSellKg ?? 0) +
            " Kg"
          }
        />
        <MetricCard
          title="Total Weight Sell"
          value={
            (allWorkOrderData?.sellingSummary?.totalWeightSellKg ?? 0) + " Kg"
          }
        />

        <MetricCard title="Total Loss" value={(totalLoss ?? 0) + " Kg"} />
        <MetricCard
          title="Total Loss Percentage"
          value={(totalLossPercentage ?? 0) + " %"}
        />
      </div>

      <div className="mt-5">
        {Array.isArray(allWorkOrderData?.sellingSummary?.cutsTable) && (
          <SellingReportTable
            data={allWorkOrderData?.sellingSummary?.cutsTable ?? []}
          />
        )}
      </div>

      <h6 className="mt-5 text-2xl">Vacuum Selling</h6>
      <div className="mt-5">
        {Array.isArray(allWorkOrderData?.vacuumSellSummary) && (
          <SelledVacuumTable
            data={allWorkOrderData?.vacuumSellSummary ?? []}
          />
        )}
      </div>
    </>
  );
};

export default AllReport;
