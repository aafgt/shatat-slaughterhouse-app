import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  createClient,
  createSupplier,
  type customError,
} from "../../util/http";
import type { createClientSupplierData } from "../../types";
import Input from "../UI/Input";

const Create = () => {
  const [mode, setMode] = useState("client");
  const toggleMode = () => {
    mode === "client" ? setMode("supplier") : setMode("client");
  };

  const {
    mutate: clientMutate,
    isPending: clientIsPending,
    isError: clientIsError,
    error: clientError,
  } = useMutation<any, customError, createClientSupplierData>({
    mutationFn: createClient,
    onSuccess: (data) => {
      alert(data?.message);
    },
  });

  const {
    mutate: supplierMutate,
    isPending: supplierIsPending,
    isError: supplierIsError,
    error: supplierError,
  } = useMutation<any, customError, createClientSupplierData>({
    mutationFn: createSupplier,
    onSuccess: (data) => {
      alert(data?.message);
    },
  });

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const userData = Object.fromEntries(fd.entries());

    if (typeof userData.name === "string" && !userData.name.trim()) {
      alert("Name cannot be empty.");
      return;
    }

    if (typeof userData.code === "string" && !userData.code.trim()) {
      alert("Code cannot be empty.");
      return;
    }

    const typedUserData: createClientSupplierData = {
      name: userData.name as string,
      code: userData.code as string,
    };

    mode === "client"
      ? clientMutate(typedUserData)
      : supplierMutate(typedUserData);
  };

  return (
    <div>
      <div className="flex gap-5">
        <button
          type="button"
          onClick={toggleMode}
          className="px-4 py-2 bg-green-950 text-white rounded hover:bg-black hover:cursor-pointer"
        >
          Create Client
        </button>

        <button
          type="button"
          onClick={toggleMode}
          className="px-4 py-2 bg-green-950 text-white rounded hover:bg-black hover:cursor-pointer"
        >
          Create Supplier
        </button>
      </div>

      <div className="flex justify-center items-center">
        <form
          onSubmit={handleCreate}
          className="bg-green-950 text-white p-10 space-y-5 my-3 rounded-2xl min-w-2/5 max-lg:w-1/2 max-md:w-full max-md:mx-32 max-sm:mx-5 font-bold"
        >
          <h2 className="uppercase text-2xl">{mode}</h2>

          {mode === "client" && clientIsError && (
            <p className="text-red-600">
              {String(
                clientError?.info?.error ??
                  "An error occurred... Try again later."
              )}
            </p>
          )}
          {mode === "supplier" && supplierIsError && (
            <p className="text-red-600">
              {String(
                supplierError?.info?.error ??
                  "An error occurred... Try again later."
              )}
            </p>
          )}

          <div className="flex gap-5 max-lg:flex-col">
            <Input label="name" id="name" type="text" required />
          </div>

          <div className="flex gap-5 max-lg:flex-col">
            <Input label="code" id="code" type="text" required />
          </div>

          <div className="flex justify-end">
            {(clientIsPending || supplierIsPending) && <p>Loading...</p>}
            {!(clientIsPending || supplierIsPending) && (
              <button className="bg-green-500 px-5 py-2 rounded-md uppercase hover:cursor-pointer hover:bg-green-400">
                create {mode}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
