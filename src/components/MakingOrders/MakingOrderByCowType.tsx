import { useQuery } from "@tanstack/react-query";
import { fetchMakingOrderCowType } from "../../util/http";
import type { makingOrderByCowTypeData } from "../../types";
// import { downloadSingleOrderExcel } from "../../util/util";
import MakingOrderByCowTypeTable from "./MakingOrderByCowTypeTable";
import { useState } from "react";
import MakingOrderByCowTypePiecesTable from "./MakingOrderByCowTypePiecesTable";

interface MakingOrderByCowTypeProps {
  orderCode: string;
  cowType: string;
}

const MakingOrderByCowType: React.FC<MakingOrderByCowTypeProps> = ({
  orderCode,
  cowType,
}) => {
  const [selectedPieces, setSelectedPieces] = useState({
    pieceType: "",
    pieces: [],
  });

  const {
    data: makingOrderByCowTypeData,
    isFetching,
    isError,
    error,
  } = useQuery<makingOrderByCowTypeData[]>({
    queryKey: ["makingOrderByCowType", orderCode, cowType],
    queryFn: ({ signal }) => {
      return fetchMakingOrderCowType({
        signal,
        orderCode,
        cowType,
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
        onClick={() => downloadSingleOrderExcel(makingOrderByCowTypeData)}
        className="px-4 py-2 bg-green-950 text-white rounded hover:bg-black hover:cursor-pointer"
      >
        Export to Excel
      </button> */}

      <h6 className="mt-5 text-2xl">{cowType}</h6>

      <div className="mt-5">
        {Array.isArray(makingOrderByCowTypeData) && (
          <MakingOrderByCowTypeTable
            data={makingOrderByCowTypeData ?? []}
            setSelectedPieces={setSelectedPieces}
          />
        )}
      </div>

      {selectedPieces.pieceType && selectedPieces.pieces.length > 0 && (
        <>
          <h6 className="mt-5 text-2xl">{selectedPieces.pieceType}</h6>
          <div className="mt-5">
            {Array.isArray(selectedPieces.pieces) && (
              <MakingOrderByCowTypePiecesTable
                data={selectedPieces.pieces ?? []}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MakingOrderByCowType;
