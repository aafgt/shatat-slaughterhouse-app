import { useState } from "react";
import DatePicker from "../DatePicker";
import SlaughterWorkOrders from "../Report/SlaughterWorkOrders";

const dateToday: string = new Date().toISOString().split("T")[0];

const Receipt = () => {
  const [selectedDate, setSelectedDate] = useState<string>(dateToday);

  return (
    <>
      <div className="flex justify-between">
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <button
          onClick={() => {
            window.print();
          }}
          className="px-4 py-2 bg-green-950 text-white rounded hover:bg-black hover:cursor-pointer print:hidden"
        >
          Print
        </button>
      </div>

      <SlaughterWorkOrders date={selectedDate} forPage="receipt" />
    </>
  );
};

export default Receipt;
