import { useQuery } from "@tanstack/react-query";
import { fetchClientVacuumPieces } from "../../util/http";
import type { clientVacuumPiecesDataInterface } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import ClientVacuumPiecesTable from "./ClientVacuumPiecesTable";
import { useState } from "react";
import ClientVacuumPieceTypesTable from "./ClientVacuumPieceTypesTable";

const ClientVacuumPieces: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();

  const [selectedPieceType, setSelectedPieceType] = useState({
    typeOfPiece: "",
    cowType: "",
  });

  if (!clientId) {
    return <p>No client selected.</p>;
  }

  const {
    data: clientData,
    isFetching,
    isError,
    error,
  } = useQuery<clientVacuumPiecesDataInterface[]>({
    queryKey: ["Client", clientId],
    queryFn: ({ signal }) => {
      return fetchClientVacuumPieces({ signal, clientId });
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
      <button
        type="button"
        onClick={() => navigate("../clients")}
        className="underline underline-offset-4 p-3 hover:cursor-pointer hover:no-underline"
      >
        Go back
      </button>

      <ClientVacuumPieceTypesTable
        data={clientData ?? []}
        setSelectedPieceType={setSelectedPieceType}
      />

      {selectedPieceType?.typeOfPiece && selectedPieceType?.cowType && (
        <div className="mt-5">
          <h6 className="font-bold text-2xl mb-2">{selectedPieceType.typeOfPiece} - {selectedPieceType.cowType}</h6>

          <ClientVacuumPiecesTable
            data={
              (clientData ?? []).filter(
                (client) =>
                  client.typeOfPiece === selectedPieceType.typeOfPiece &&
                  client.cowType === selectedPieceType.cowType
              )[0]?.pieces ?? []
            }
          />
        </div>
      )}
    </>
  );
};

export default ClientVacuumPieces;
