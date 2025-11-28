import { useState } from "react";
import DatePicker from "../../DatePicker";
import { useQuery } from "@tanstack/react-query";
import type { miscouragesDataInterface } from "../../../types";
import { fetchMiscourages } from "../../../util/http";
import MiscouragesTable from "./MiscouragesTable";
import { downloadMultipleOrdersExcel } from "../../../util/util";

const dateToday: string = new Date().toISOString().split("T")[0];

const Miscourages = () => {
  const [selectedDate, setSelectedDate] = useState<string>(dateToday);

  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<miscouragesDataInterface>();

  const {
    data: miscouragesData,
    isFetching,
    isError,
    error,
  } = useQuery<miscouragesDataInterface[]>({
    queryKey: ["miscourages", selectedDate],
    queryFn: ({ signal, queryKey }) => {
      const [, selectedDate] = queryKey as [string, string];
      return fetchMiscourages({ signal, date: selectedDate });
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
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="my-5 flex flex-wrap gap-3">
        {miscouragesData &&
        Array.isArray(miscouragesData) &&
        miscouragesData.length != 0 ? (
          miscouragesData.map((miscourages) => (
            <button
              key={miscourages.orderCode}
              type="button"
              className="px-4 py-2 w-fit bg-green-950 text-white rounded hover:bg-black hover:cursor-pointer print:hidden"
              onClick={() => {
                setSelectedWorkOrder(miscourages);
              }}
            >
              {miscourages.orderCode}
            </button>
          ))
        ) : (
          <p>No work orders found for this date</p>
        )}
      </div>

      {selectedWorkOrder && (
        <div>
          <div className="flex justify-between">
            <h6 className="font-bold text-2xl mb-2">
              {selectedWorkOrder.orderCode}
            </h6>

            <button
              type="button"
              onClick={() =>
                downloadMultipleOrdersExcel(selectedWorkOrder.miscourages ?? [])
              }
              className="my-3 px-4 py-2 bg-green-950 text-white rounded hover:bg-black hover:cursor-pointer"
            >
              Export to Excel
            </button>
          </div>

          <MiscouragesTable data={selectedWorkOrder.miscourages} />
        </div>
      )}
    </>
  );
};

export default Miscourages;
