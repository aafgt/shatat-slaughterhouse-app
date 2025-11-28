import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchSlaughterWorkOrdersByDate } from "../../util/http";
import SlaughterReport from "./SlaughterReport";
import SlaughteredCowsReceipt from "../Receipt/SlaughteredCowsReceipt";

interface SlaughterWorkOrdersProps {
  date: string;
  forPage: 'report' | 'receipt';
}

const SlaughterWorkOrders: React.FC<SlaughterWorkOrdersProps> = ({ date, forPage }) => {
  const [selectedWorkOrderCode, setSelectedWorkOrderCode] = useState("");

  const {
    data: slaughterWorkOrdersByDateData,
    isFetching,
    isError,
    error,
  } = useQuery<string[] | { message: string; }>({
    queryKey: ["slaughterWorkOrdersByDateReport", date],
    queryFn: ({ signal, queryKey }) => {
      const [, date] = queryKey as [string, string];
      return fetchSlaughterWorkOrdersByDate({ signal, date });
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
      <div className="my-5 flex flex-wrap gap-3">
        {slaughterWorkOrdersByDateData &&
        Array.isArray(slaughterWorkOrdersByDateData) ? (
          slaughterWorkOrdersByDateData.map((wo: string) => (
            <button
              key={wo}
              type="button"
              className="px-4 py-2 w-fit bg-green-950 text-white rounded hover:bg-black hover:cursor-pointer print:hidden"
              onClick={() => {
                setSelectedWorkOrderCode(wo);
              }}
            >
              {wo}
            </button>
          ))
        ) : (
          <p>{slaughterWorkOrdersByDateData?.message}</p>
        )}
      </div>

      {selectedWorkOrderCode && forPage === "report" && (
        <SlaughterReport workOrderCode={selectedWorkOrderCode} />
      )}

      {selectedWorkOrderCode && forPage === "receipt" && (
        <SlaughteredCowsReceipt workOrderCode={selectedWorkOrderCode} />
      )}
    </>
  );
};

export default SlaughterWorkOrders;