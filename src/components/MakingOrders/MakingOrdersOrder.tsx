import { useQuery } from "@tanstack/react-query";
import { fetchMakingOrder } from "../../util/http";
import type { makingOrdersOrderData } from "../../types";
// import { downloadSingleOrderExcel } from "../../util/util";
import MakingOrdersOrderTable from "./MakingOrdersOrderTable";
import { useState } from "react";
import MakingOrderByCowType from "./MakingOrderByCowType";

interface MakingOrdersOrderProps {
  orderCode: string;
}

const MakingOrdersOrder: React.FC<MakingOrdersOrderProps> = ({ orderCode }) => {
  const [selectedCowType, setSelectedCowType] = useState("");

  const {
    data: makingOrdersOrderData,
    isFetching,
    isError,
    error,
  } = useQuery<makingOrdersOrderData[]>({
    queryKey: ["makingOrdersOrderByOrderCode", orderCode],
    queryFn: ({ signal }) => {
      return fetchMakingOrder({
        signal,
        orderCode,
      });
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
      {/* <button
        type="button"
        onClick={() =>
          downloadSingleOrderExcel(makingOrdersOrderData)
        }
        className="px-4 py-2 bg-green-950 text-white rounded hover:bg-black hover:cursor-pointer"
      >
        Export to Excel
      </button> */}

      <h6 className="mt-5 text-2xl">{orderCode}</h6>

      <div className="mt-5">
        {Array.isArray(makingOrdersOrderData) && (
          <MakingOrdersOrderTable
            data={makingOrdersOrderData ?? []}
            setSelectedCowType={setSelectedCowType}
          />
        )}
      </div>

      <div className="mt-5">
        {selectedCowType && (
          <MakingOrderByCowType
            orderCode={orderCode}
            cowType={selectedCowType}
          />
        )}
      </div>
    </>
  );
};

export default MakingOrdersOrder;
