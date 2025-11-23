import { useState } from "react";
import DashboardDashboard from "./DashboardDashboard";
import VacuumDashboard from "./VacuumDashboard";
import CutDashboard from "./CutDashboard";
import DatePicker from "../DatePicker";
import Miscourages from "./Miscourages/Miscourages";

const dateToday: string = new Date().toISOString().split("T")[0];

const Dashboard: React.FC = () => {
  const [dashboardType, setDashboardType] = useState("slaughter");

  const [fromSelectedDate, setFromSelectedDate] = useState<string>(dateToday);
  const [toSelectedDate, setToSelectedDate] = useState<string>("");

  return (
    <div className="h-full">
      <div className="flex justify-end space-x-3">
        <div className="flex justify-center items-center">
          <p className="mr-2">From:</p>
          <DatePicker
            selectedDate={fromSelectedDate}
            setSelectedDate={setFromSelectedDate}
          />
        </div>

        <div className="flex justify-center items-center">
          <p className="mr-2">To:</p>
          <DatePicker
            selectedDate={toSelectedDate}
            setSelectedDate={setToSelectedDate}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h5 className="uppercase">{dashboardType}</h5>
        <div>
          <button
            type="button"
            onClick={() => setDashboardType("slaughter")}
            className="underline underline-offset-4 p-3 hover:cursor-pointer hover:no-underline"
          >
            Slaughter
          </button>
          <button
            type="button"
            onClick={() => setDashboardType("cuts")}
            className="underline underline-offset-4 p-3 hover:cursor-pointer hover:no-underline"
          >
            Cuts
          </button>
          <button
            type="button"
            onClick={() => setDashboardType("vacuum")}
            className="underline underline-offset-4 p-3 hover:cursor-pointer hover:no-underline"
          >
            Vacuum
          </button>
          <button
            type="button"
            onClick={() => setDashboardType("miscourages")}
            className="underline underline-offset-4 p-3 hover:cursor-pointer hover:no-underline"
          >
            Miscourages
          </button>
        </div>
      </div>

      {dashboardType === "slaughter" && (
        <DashboardDashboard
          startDate={fromSelectedDate}
          endDate={toSelectedDate}
        />
      )}

      {dashboardType === "cuts" && (
        <CutDashboard startDate={fromSelectedDate} endDate={toSelectedDate} />
      )}

      {dashboardType === "vacuum" && (
        <VacuumDashboard
          startDate={fromSelectedDate}
          endDate={toSelectedDate}
        />
      )}

      {dashboardType === "miscourages" && (
        <Miscourages />
      )}
    </div>
  );
};

export default Dashboard;
