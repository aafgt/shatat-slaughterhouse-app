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
    staleTime: 0,
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
          title="GA لحوم IN"
          value={(allWorkOrderData?.cuttingSummary?.["GA لحوم"].in ?? 0) + " Kg"}
        />
        <MetricCard
          title="GA لحوم OUT"
          value={(allWorkOrderData?.cuttingSummary?.["GA لحوم"].out ?? 0) + " Kg"}
        />

        <MetricCard
          title="GB لحوم IN"
          value={(allWorkOrderData?.cuttingSummary?.["GB لحوم"].in ?? 0) + " Kg"}
        />
        <MetricCard
          title="GB لحوم OUT"
          value={(allWorkOrderData?.cuttingSummary?.["GB لحوم"].out ?? 0) + " Kg"}
        />

        <MetricCard
          title="حلويات IN"
          value={(allWorkOrderData?.cuttingSummary?.حلويات.in ?? 0) + " Kg"}
        />
        <MetricCard
          title="حلويات OUT"
          value={(allWorkOrderData?.cuttingSummary?.حلويات.out ?? 0) + " Kg"}
        />

        <MetricCard
          title="دهن بوش IN"
          value={(allWorkOrderData?.cuttingSummary?.["دهن بوش"].in ?? 0) + " Kg"}
        />
        <MetricCard
          title="دهن بوش OUT"
          value={(allWorkOrderData?.cuttingSummary?.["دهن بوش"].out ?? 0) + " Kg"}
        />

        <MetricCard
          title="دهن كلاوي IN"
          value={(allWorkOrderData?.cuttingSummary?.["دهن كلاوي"].in ?? 0) + " Kg"}
        />
        <MetricCard
          title="دهن كلاوي OUT"
          value={(allWorkOrderData?.cuttingSummary?.["دهن كلاوي"].out ?? 0) + " Kg"}
        />

        <MetricCard
          title="دهون مشفاه IN"
          value={
            (allWorkOrderData?.cuttingSummary?.["دهون مشفاه"].in ?? 0) + " Kg"
          }
        />
        <MetricCard
          title="دهون مشفاه OUT"
          value={
            (allWorkOrderData?.cuttingSummary?.["دهون مشفاه"].out ?? 0) + " Kg"
          }
        />

        <MetricCard
          title="سنم IN"
          value={(allWorkOrderData?.cuttingSummary?.سنم.in ?? 0) + " Kg"}
        />
        <MetricCard
          title="سنم OUT"
          value={(allWorkOrderData?.cuttingSummary?.سنم.out ?? 0) + " Kg"}
        />

        <MetricCard
          title="عرق دم IN"
          value={(allWorkOrderData?.cuttingSummary?.["عرق دم"].in ?? 0) + " Kg"}
        />
        <MetricCard
          title="عرق دم OUT"
          value={(allWorkOrderData?.cuttingSummary?.["عرق دم"].out ?? 0) + " Kg"}
        />

        <MetricCard
          title="عظام تشافي IN"
          value={
            (allWorkOrderData?.cuttingSummary?.["عظام تشافي"].in ?? 0) + " Kg"
          }
        />
        <MetricCard
          title="عظام تشافي OUT"
          value={
            (allWorkOrderData?.cuttingSummary?.["عظام تشافي"].out ?? 0) + " Kg"
          }
        />

        <MetricCard
          title="غدد اعدام IN"
          value={(allWorkOrderData?.cuttingSummary?.["غدد اعدام"].in ?? 0) + " Kg"}
        />
        <MetricCard
          title="غدد اعدام OUT"
          value={(allWorkOrderData?.cuttingSummary?.["غدد اعدام"].out ?? 0) + " Kg"}
        />

        <MetricCard
          title="غضاريف IN"
          value={(allWorkOrderData?.cuttingSummary?.غضاريف.in ?? 0) + " Kg"}
        />
        <MetricCard
          title="غضاريف OUT"
          value={(allWorkOrderData?.cuttingSummary?.غضاريف.out ?? 0) + " Kg"}
        />

        <MetricCard
          title="قراقيش IN"
          value={(allWorkOrderData?.cuttingSummary?.قراقيش.in ?? 0) + " Kg"}
        />
        <MetricCard
          title="قراقيش OUT"
          value={(allWorkOrderData?.cuttingSummary?.قراقيش.out ?? 0) + " Kg"}
        />

        <MetricCard
          title="كلاوي IN"
          value={(allWorkOrderData?.cuttingSummary?.كلاوي.in ?? 0) + " Kg"}
        />
        <MetricCard
          title="كلاوي OUT"
          value={(allWorkOrderData?.cuttingSummary?.كلاوي.out ?? 0) + " Kg"}
        />

        <MetricCard
          title="كنسه IN"
          value={(allWorkOrderData?.cuttingSummary?.كنسه.in ?? 0) + " Kg"}
        />
        <MetricCard
          title="كنسه OUT"
          value={(allWorkOrderData?.cuttingSummary?.كنسه.out ?? 0) + " Kg"}
        />

        <MetricCard
          title="لحوم اعدام IN"
          value={
            (allWorkOrderData?.cuttingSummary?.["لحوم اعدام"].in ?? 0) + " Kg"
          }
        />
        <MetricCard
          title="لحوم اعدام OUT"
          value={
            (allWorkOrderData?.cuttingSummary?.["لحوم اعدام"].out ?? 0) + " Kg"
          }
        />

        <MetricCard
          title="لحوم كدمات IN"
          value={
            (allWorkOrderData?.cuttingSummary?.["لحوم كدمات"].in ?? 0) + " Kg"
          }
        />
        <MetricCard
          title="لحوم كدمات OUT"
          value={
            (allWorkOrderData?.cuttingSummary?.["لحوم كدمات"].out ?? 0) + " Kg"
          }
        />

        <MetricCard
          title="لحوم مشفاه IN"
          value={
            (allWorkOrderData?.cuttingSummary?.["لحوم مشفاه"].in ?? 0) + " Kg"
          }
        />
        <MetricCard
          title="لحوم مشفاه OUT"
          value={
            (allWorkOrderData?.cuttingSummary?.["لحوم مشفاه"].out ?? 0) + " Kg"
          }
        />

        <MetricCard
          title="لحوم ناف IN"
          value={(allWorkOrderData?.cuttingSummary?.["لحوم ناف"].in ?? 0) + " Kg"}
        />
        <MetricCard
          title="لحوم ناف OUT"
          value={(allWorkOrderData?.cuttingSummary?.["لحوم ناف"].out ?? 0) + " Kg"}
        />

        <MetricCard
          title="مخاصي IN"
          value={(allWorkOrderData?.cuttingSummary?.مخاصي.in ?? 0) + " Kg"}
        />
        <MetricCard
          title="مخاصي OUT"
          value={(allWorkOrderData?.cuttingSummary?.مخاصي.out ?? 0) + " Kg"}
        />

        <MetricCard
          title="نخاع IN"
          value={(allWorkOrderData?.cuttingSummary?.نخاع.in ?? 0) + " Kg"}
        />
        <MetricCard
          title="نخاع OUT"
          value={(allWorkOrderData?.cuttingSummary?.نخاع.out ?? 0) + " Kg"}
        />

        <MetricCard
          title="ورق حجر IN"
          value={(allWorkOrderData?.cuttingSummary?.["ورق حجر"].in ?? 0) + " Kg"}
        />
        <MetricCard
          title="ورق حجر OUT"
          value={(allWorkOrderData?.cuttingSummary?.["ورق حجر"].out ?? 0) + " Kg"}
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
