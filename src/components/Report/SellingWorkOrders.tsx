import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchSellingWorkOrdersByDate } from "../../util/http";
import SellingReport from "./SellingReport";

interface SellingWorkOrdersProps {
  date: string;
}

const SellingWorkOrders: React.FC<SellingWorkOrdersProps> = ({ date }) => {
  const [selectedWorkOrderCode, setSelectedWorkOrderCode] = useState("");

  const {
    data: sellingWorkOrdersByDateData,
    isFetching,
    isError,
    error,
  } = useQuery<string[] | { message: string; }>({
    queryKey: ["sellingWorkOrdersByDateReport", date],
    queryFn: ({ signal, queryKey }) => {
      const [, date] = queryKey as [string, string];
      return fetchSellingWorkOrdersByDate({ signal, date });
    },
    staleTime: 5 * 60 * 1000,
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
        {sellingWorkOrdersByDateData &&
        Array.isArray(sellingWorkOrdersByDateData) ? (
          sellingWorkOrdersByDateData.map((wo: string) => (
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
          <p>{sellingWorkOrdersByDateData?.message}</p>
        )}
      </div>

      {selectedWorkOrderCode && (
        <SellingReport sellingWorkOrderCode={selectedWorkOrderCode} />
      )}
    </>
  );
};

export default SellingWorkOrders;