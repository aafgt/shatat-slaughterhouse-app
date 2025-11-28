import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchAllWorkOrdersByDate } from "../../util/http";
import AllReport from "./AllReport";

interface AllWorkOrdersProps {
  date: string;
}

const AllWorkOrders: React.FC<AllWorkOrdersProps> = ({ date }) => {
  const [selectedWorkOrderCode, setSelectedWorkOrderCode] = useState("");

  const {
    data: allWorkOrdersByDateData,
    isFetching,
    isError,
    error,
  } = useQuery<string[] | { message: string; }>({
    queryKey: ["allWorkOrdersByDateReport", date],
    queryFn: ({ signal, queryKey }) => {
      const [, date] = queryKey as [string, string];
      return fetchAllWorkOrdersByDate({ signal, date });
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
        {allWorkOrdersByDateData &&
        Array.isArray(allWorkOrdersByDateData) ? (
          allWorkOrdersByDateData.map((wo: string) => (
            <button
              key={wo}
              type="button"
              className="px-4 py-2 w-fit bg-green-950 text-white rounded hover:bg-black hover:cursor-pointer"
              onClick={() => {
                setSelectedWorkOrderCode(wo);
              }}
            >
              {wo}
            </button>
          ))
        ) : (
          <p>{allWorkOrdersByDateData?.message}</p>
        )}
      </div>

      {selectedWorkOrderCode && (
        <AllReport workOrderCode={selectedWorkOrderCode} />
      )}
    </>
  );
};

export default AllWorkOrders;