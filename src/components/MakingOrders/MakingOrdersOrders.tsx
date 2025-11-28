import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchMakingOrdersDate } from "../../util/http";
import MakingOrdersTable from "./MakingOrdersTable";
import type { makingOrdersByDateData } from "../../types";
import MakingOrdersOrder from "./MakingOrdersOrder";

interface MakingOrdersOrdersProps {
  date: string;
}

const MakingOrdersOrders: React.FC<MakingOrdersOrdersProps> = ({ date }) => {
  const [selectedWorkOrderCode, setSelectedWorkOrderCode] = useState("");

  const {
    data: makingOrdersOrdersByDateData,
    isFetching,
    isError,
    error,
  } = useQuery<makingOrdersByDateData[] | { message: string }>({
    queryKey: ["makingOrdersOrdersByDate", date],
    queryFn: ({ signal, queryKey }) => {
      const [, date] = queryKey as [string, string];
      return fetchMakingOrdersDate({ signal, date });
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
      <div className="mt-5">
        {Array.isArray(makingOrdersOrdersByDateData) && (
          <MakingOrdersTable
            data={makingOrdersOrdersByDateData ?? []}
            setSelectedWorkOrderCode={setSelectedWorkOrderCode}
          />
        )}
      </div>
      <div className="mt-5">
        {selectedWorkOrderCode && (
          <MakingOrdersOrder orderCode={selectedWorkOrderCode} />
        )}
      </div>
    </>
  );
};

export default MakingOrdersOrders;
