import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchCuttingWorkOrdersByDate } from "../../util/http";
import CuttingReport from "./CuttingReport";

interface CuttingWorkOrdersProps {
  date: string;
}

const CuttingWorkOrders: React.FC<CuttingWorkOrdersProps> = ({ date }) => {
  const [selectedWorkOrderCode, setSelectedWorkOrderCode] = useState("");

  const {
    data: cuttingWorkOrdersByDateData,
    isFetching,
    isError,
    error,
  } = useQuery<string[] | { message: string; }>({
    queryKey: ["cuttingWorkOrdersByDateReport", date],
    queryFn: ({ signal, queryKey }) => {
      const [, date] = queryKey as [string, string];
      return fetchCuttingWorkOrdersByDate({ signal, date });
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
        {cuttingWorkOrdersByDateData &&
        Array.isArray(cuttingWorkOrdersByDateData) ? (
          cuttingWorkOrdersByDateData.map((wo: string) => (
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
          <p>{cuttingWorkOrdersByDateData?.message}</p>
        )}
      </div>

      {selectedWorkOrderCode && (
        <CuttingReport cuttingWorkOrderCode={selectedWorkOrderCode} />
      )}
    </>
  );
};

export default CuttingWorkOrders;