import type React from "react";
import ReceiptTable from "./SlaughteredCowsReceiptTable";
import { useQuery } from "@tanstack/react-query";
import { fetchReceiptWorkOrder } from "../../util/http";
import type { receiptWorkOrderDataInterface } from "../../types";
import { downloadMultipleOrdersExcel } from "../../util/util";

interface SlaughterReceiptProps {
  workOrderCode: string;
}

const SlaughteredCowsReceipt: React.FC<SlaughterReceiptProps> = ({
  workOrderCode,
}) => {
  const {
    data: receiptWorkOrderData,
    isFetching,
    isError,
    error,
  } = useQuery<receiptWorkOrderDataInterface>({
    queryKey: ["receiptWorkOrderData", workOrderCode],
    queryFn: ({ signal }) => {
      return fetchReceiptWorkOrder({ signal, orderCode: workOrderCode });
    },
    staleTime: 0,
  });

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message ?? "An error occurred."}</p>;
  }

  const totalWeight = receiptWorkOrderData?.cows?.reduce((acc, cow) => {
    return acc + cow.weightSell;
  }, 0);

  return (
    <div>
      <h6>
        Order Code: <span className="text-xl">{workOrderCode}</span>
      </h6>
      <h6>
        Client:{" "}
        <span className="text-xl">{receiptWorkOrderData?.clientName}</span>
      </h6>
      <h6>
        Supplier:{" "}
        <span className="text-xl">{receiptWorkOrderData?.supplierName}</span>
      </h6>
      <h6>
        Cow Type:{" "}
        <span className="text-xl">{receiptWorkOrderData?.cowType}</span>
      </h6>
      <h6>
        Total Cows:{" "}
        <span className="text-xl">{receiptWorkOrderData?.cows?.length}</span>
      </h6>
      <h6>
        Total Weight: <span className="text-xl">{totalWeight} Kg</span>
      </h6>

      <div className="mt-5">
        <button
          type="button"
          onClick={() => downloadMultipleOrdersExcel(receiptWorkOrderData?.cows ?? [])}
          className="my-3 px-4 py-2 bg-green-950 text-white rounded hover:bg-black hover:cursor-pointer"
        >
          Export to Excel
        </button>

        <h6 className="font-bold text-2xl"></h6>
        {Array.isArray(receiptWorkOrderData?.cows) && (
          <ReceiptTable data={receiptWorkOrderData?.cows ?? []} />
        )}
      </div>
    </div>
  );
};

export default SlaughteredCowsReceipt;
