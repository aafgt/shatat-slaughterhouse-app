import { useState } from "react";
import DatePicker from "../DatePicker";
import SlaughterWorkOrders from "./SlaughterWorkOrders";
import CuttingWorkOrders from "./CuttingWorkOrders";
import SellingWorkOrders from "./SellingWorkOrders";
import VacuumSellingReport from "./VacuumSellingReport";
import AllWorkOrders from "./AllWorkOrders";
import VacuumDashboard from "../Dashboard/VacuumDashboard";

const dateToday: string = new Date().toISOString().split("T")[0];

const Report: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(dateToday);

  const [reportType, setReportType] = useState("all");

  return (
    <div>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="flex justify-between items-center">
        <h5 className="uppercase">{reportType}</h5>
        <div>
          <button
            type="button"
            onClick={() => setReportType("all")}
            className="underline underline-offset-4 p-3 hover:cursor-pointer hover:no-underline"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setReportType("slaughter")}
            className="underline underline-offset-4 p-3 hover:cursor-pointer hover:no-underline"
          >
            Slaughter
          </button>
          <button
            type="button"
            onClick={() => setReportType("cutting")}
            className="underline underline-offset-4 p-3 hover:cursor-pointer hover:no-underline"
          >
            Cutting
          </button>
          <button
            type="button"
            onClick={() => setReportType("selling")}
            className="underline underline-offset-4 p-3 hover:cursor-pointer hover:no-underline"
          >
            Selling
          </button>
          <button
            type="button"
            onClick={() => setReportType("vacuum-selling")}
            className="underline underline-offset-4 p-3 hover:cursor-pointer hover:no-underline"
          >
            Vacuum Selling
          </button>
          <button
            type="button"
            onClick={() => setReportType("vacuum")}
            className="underline underline-offset-4 p-3 hover:cursor-pointer hover:no-underline"
          >
            Vacuum
          </button>
        </div>
      </div>

      {reportType === "all" && <AllWorkOrders date={selectedDate} />}

      {reportType === "slaughter" && (
        <SlaughterWorkOrders date={selectedDate} forPage="report" />
      )}

      {reportType === "cutting" && <CuttingWorkOrders date={selectedDate} />}

      {reportType === "selling" && <SellingWorkOrders date={selectedDate} />}

      {reportType === "vacuum-selling" && (
        <VacuumSellingReport date={selectedDate} />
      )}

      {reportType === "vacuum" && (
        <VacuumDashboard startDate={selectedDate} endDate={""} />
      )}
    </div>
  );
};

export default Report;
