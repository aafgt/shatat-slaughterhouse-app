import { useQuery } from "@tanstack/react-query";
import { fetchClients } from "../../util/http";
import type { clientsDataInterface } from "../../types";
import MetricCard from "../MetricCard";
import { useNavigate } from "react-router-dom";

const Clients: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: clientsData,
    isFetching,
    isError,
    error,
  } = useQuery<clientsDataInterface[]>({
    queryKey: ["Clients"],
    queryFn: ({ signal }) => {
      return fetchClients({ signal });
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
      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-5 mt-5">
        {clientsData?.map((client) => (
          <div
            key={client.id}
            className="hover:cursor-pointer"
            onClick={() => {
              navigate(client.id);
            }}
          >
            <MetricCard title="Client Name" value={client.name ?? ""} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Clients;
