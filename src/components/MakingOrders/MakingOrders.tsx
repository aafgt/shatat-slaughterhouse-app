import { useState } from "react";
import DatePicker from "../DatePicker";
import MakingOrdersOrders from "./MakingOrdersOrders";

const dateToday: string = new Date().toISOString().split("T")[0];

const MakingOrders = () => {
  const [selectedDate, setSelectedDate] = useState<string>(dateToday);

  return (
    <>
      <div className="flex justify-between">
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      {<MakingOrdersOrders date={selectedDate} />}
    </>
  );
};

export default MakingOrders;
