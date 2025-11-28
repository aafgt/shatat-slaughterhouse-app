import { useQuery } from "@tanstack/react-query";
import { fetchSlaughterWorkOrder } from "../../util/http";
import type { slaughterWorkOrderDataInterface } from "../../types";
import MetricCard from "../MetricCard";
import SlaughterReportTable from "./SlaughterReportTable";
import { downloadSingleOrderExcel } from "../../util/util";

interface SlaughterReportProps {
  workOrderCode: string;
}

const SlaughterReport: React.FC<SlaughterReportProps> = ({ workOrderCode }) => {
  const {
    data: slaughterWorkOrderData,
    isFetching,
    isError,
    error,
  } = useQuery<slaughterWorkOrderDataInterface>({
    queryKey: ["slaughterWorkOrderDataReport", workOrderCode],
    queryFn: ({ signal }) => {
      return fetchSlaughterWorkOrder({ signal, workOrderCode });
    },
    staleTime: 0,
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
        onClick={() => downloadSingleOrderExcel(slaughterWorkOrderData, "order.xlsx", ["totalWeightOfOrder"])}
        className="px-4 py-2 bg-green-950 text-white rounded hover:bg-black hover:cursor-pointer"
      >
        Export Slaughter Order to Excel
      </button>

      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-5 mt-5">
        <MetricCard
          title="Client Name"
          value={slaughterWorkOrderData?.clientName ?? ""}
        />
        <MetricCard
          title="Cow Type"
          value={slaughterWorkOrderData?.cowType ?? ""}
        />
        <MetricCard
          title="Number Of Cows"
          value={(slaughterWorkOrderData?.numberOfCows ?? 0) + ""}
        />
        <MetricCard
          title="Supplier Name"
          value={slaughterWorkOrderData?.supplierName ?? ""}
        />
        <MetricCard
          title="Total Cuts"
          value={(slaughterWorkOrderData?.totalCuts ?? 0) + ""}
        />
        <MetricCard
          title="Total Weight"
          value={(slaughterWorkOrderData?.totalWeightKg ?? 0) + " Kg"}
        />
        {/* <MetricCard
          title="Total Weight Of Order"
          value={(slaughterWorkOrderData?.totalWeightOfOrder ?? 0) + " Kg"}
        /> */}
        <MetricCard
          title="Total Weight Out"
          value={(slaughterWorkOrderData?.totalWeightOutKg ?? 0) + " Kg"}
        />

        <MetricCard
          title="حلويات"
          value={(slaughterWorkOrderData?.حلويات ?? 0) + " Kg"}
        />
        <MetricCard
          title="دبر"
          value={(slaughterWorkOrderData?.دبر ?? 0) + " Kg"}
        />
        <MetricCard
          title="دهن بوش"
          value={(slaughterWorkOrderData?.["دهن بوش"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="دهن حلويات"
          value={(slaughterWorkOrderData?.["دهن حلويات"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="دهن دبر"
          value={(slaughterWorkOrderData?.["دهن دبر"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="دهن كلاوي"
          value={(slaughterWorkOrderData?.["دهن كلاوي"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="زور"
          value={(slaughterWorkOrderData?.زور ?? 0) + " Kg"}
        />
        <MetricCard
          title="عرق دم"
          value={(slaughterWorkOrderData?.["عرق دم"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="عطم"
          value={(slaughterWorkOrderData?.عطم ?? 0) + " Kg"}
        />
        {/* <MetricCard
          title="كبده"
          value={(slaughterWorkOrderData?.كبده ?? 0) + " Kg"}
        /> */}
        <MetricCard
          title="كرشه"
          value={(slaughterWorkOrderData?.كرشه ?? 0) + " Kg"}
        />
        <MetricCard
          title="كلاوي"
          value={(slaughterWorkOrderData?.كلاوي ?? 0) + " Kg"}
        />
        <MetricCard
          title="لحم ابر"
          value={(slaughterWorkOrderData?.["لحم ابر"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="لحم رقبه"
          value={(slaughterWorkOrderData?.["لحم رقبه"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="لحوم كدمات"
          value={(slaughterWorkOrderData?.["لحوم كدمات"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="مخاصي"
          value={(slaughterWorkOrderData?.مخاصي ?? 0) + " Kg"}
        />
        <MetricCard
          title="مفاريم"
          value={(slaughterWorkOrderData?.مفاريم ?? 0) + " Kg"}
        />
        <MetricCard
          title="ممبار"
          value={(slaughterWorkOrderData?.ممبار ?? 0) + " Kg"}
        />
        <MetricCard
          title="مواسير تصنيع"
          value={(slaughterWorkOrderData?.["مواسير تصنيع"] ?? 0) + " Kg"}
        />
        <MetricCard
          title="نخاع"
          value={(slaughterWorkOrderData?.نخاع ?? 0) + " Kg"}
        />
        <MetricCard
          title="هالك دبحه"
          value={(slaughterWorkOrderData?.["هالك دبحه"] ?? 0) + " Kg"}
        />
      </div>

      <div className="mt-5">
        <h6 className="font-bold text-2xl text-right">قلب</h6>
        {Array.isArray(slaughterWorkOrderData?.قلب) && (
          <SlaughterReportTable data={slaughterWorkOrderData?.قلب ?? []} />
        )}
      </div>

      <div className="mt-5">
        <h6 className="font-bold text-2xl text-right">كبد</h6>
        {Array.isArray(slaughterWorkOrderData?.كبد) && (
          <SlaughterReportTable data={slaughterWorkOrderData?.كبد ?? []} />
        )}
      </div>
    </>
  );
};

export default SlaughterReport;
