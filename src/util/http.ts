import { QueryClient } from "@tanstack/react-query";
import { getAuthToken } from "./auth";
import type { createClientSupplierData } from "../types";

export interface loginSignupData {
  username: string;
  password: string;
}

export class customError extends Error {
  code: number;
  info: {
    error: string;
  };

  constructor(message: string, code: number, info: { error: string }) {
    super(message);
    this.code = code;
    this.info = info;
  }
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

export const queryClient = new QueryClient();

export const signup = async (signupData: loginSignupData) => {
  const response = await fetch(API_URL + "/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to signup."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  const message = data.message;

  return message;
};

export const login = async (loginData: loginSignupData) => {
  const response = await fetch(API_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to login."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  const token = data.token;

  localStorage.setItem("token", token);

  return "";
};

export const logout = () => {
  localStorage.removeItem("token");
};

////////////////////////////////// Dashboard \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const fetchDashboard = async ({
  signal,
  startDate,
  endDate,
}: {
  signal: AbortSignal;
  startDate: string;
  endDate: string;
}) => {
  const token = getAuthToken();

  let response;
  if (endDate === "") {
    response = await fetch(
      API_URL + `/dashboard/dashboard?startDate=${startDate}`,
      {
        signal: signal,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else {
    response = await fetch(
      API_URL +
        `/dashboard/dashboard?startDate=${startDate}&endDate=${endDate}`,
      {
        signal: signal,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

export const fetchVacuumDashboard = async ({
  signal,
  startDate,
  endDate,
}: {
  signal: AbortSignal;
  startDate: string;
  endDate: string;
}) => {
  const token = getAuthToken();

  let response;
  if (endDate === "") {
    response = await fetch(
      API_URL + `/dashboard/vacuum-dashboard?startDate=${startDate}`,
      {
        signal: signal,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else {
    response = await fetch(
      API_URL +
        `/dashboard/vacuum-dashboard?startDate=${startDate}&endDate=${endDate}`,
      {
        signal: signal,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

export const fetchCutDashboard = async ({
  signal,
  startDate,
  endDate,
}: {
  signal: AbortSignal;
  startDate: string;
  endDate: string;
}) => {
  const token = getAuthToken();

  let response;
  if (endDate === "") {
    response = await fetch(
      API_URL + `/dashboard/cut-dashboard?startDate=${startDate}`,
      {
        signal: signal,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else {
    response = await fetch(
      API_URL +
        `/dashboard/cut-dashboard?startDate=${startDate}&endDate=${endDate}`,
      {
        signal: signal,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

////////////////////////////////// Report \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const fetchAllWorkOrdersByDate = async ({
  signal,
  date,
}: {
  signal: AbortSignal;
  date: string;
}) => {
  const token = getAuthToken();

  let response = await fetch(API_URL + `/reports/daily-by-date?date=${date}`, {
    signal: signal,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

export const fetchAllWorkOrder = async ({
  signal,
  workOrderCode,
}: {
  signal: AbortSignal;
  workOrderCode: string;
}) => {
  const token = getAuthToken();

  let response = await fetch(API_URL + `/reports/daily-by-ordercode?workOrderCode=${workOrderCode}`, {
    signal: signal,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

export const fetchSlaughterWorkOrdersByDate = async ({
  signal,
  date,
}: {
  signal: AbortSignal;
  date: string;
}) => {
  const token = getAuthToken();

  const requestBody = {
    date,
  };

  let response = await fetch(API_URL + "/slaughter-details/by-date", {
    signal: signal,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

export const fetchSlaughterWorkOrder = async ({
  signal,
  workOrderCode,
}: {
  signal: AbortSignal;
  workOrderCode: string;
}) => {
  const token = getAuthToken();

  const requestBody = {
    workOrderCode,
  };

  let response = await fetch(API_URL + "/work-orders-report/summary", {
    signal: signal,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

export const fetchCuttingWorkOrdersByDate = async ({
  signal,
  date,
}: {
  signal: AbortSignal;
  date: string;
}) => {
  const token = getAuthToken();

  const requestBody = {
    date,
  };

  let response = await fetch(API_URL + "/cut-report/by-date", {
    signal: signal,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

export const fetchCuttingWorkOrder = async ({
  signal,
  cuttingWorkOrderCode,
}: {
  signal: AbortSignal;
  cuttingWorkOrderCode: string;
}) => {
  const token = getAuthToken();

  const requestBody = {
    cuttingWorkOrderCode,
  };

  let response = await fetch(API_URL + "/work-orders-report/cutting-summary", {
    signal: signal,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

export const fetchSellingWorkOrdersByDate = async ({
  signal,
  date,
}: {
  signal: AbortSignal;
  date: string;
}) => {
  const token = getAuthToken();

  const requestBody = {
    date,
  };

  let response = await fetch(API_URL + "/work-orders-report/selling-by-date", {
    signal: signal,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

export const fetchSellingWorkOrder = async ({
  signal,
  sellingWorkOrderCode,
}: {
  signal: AbortSignal;
  sellingWorkOrderCode: string;
}) => {
  const token = getAuthToken();

  const requestBody = {
    sellingWorkOrderCode,
  };

  let response = await fetch(
    API_URL + "/work-orders-report/sell-cuts-summary",
    {
      signal: signal,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

////////////////////////////////// Receipt \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const fetchReceiptWorkOrder = async ({
  signal,
  orderCode,
}: {
  signal: AbortSignal;
  orderCode: string;
}) => {
  const token = getAuthToken();

  const requestBody = {
    orderCode,
  };

  let response = await fetch(API_URL + "/slaughter-details/cow-sell-weights", {
    signal: signal,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

//////////////////////////////////  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const fetchMiscourages = async ({
  signal,
  date,
}: {
  signal: AbortSignal;
  date: string;
}) => {
  const token = getAuthToken();

  const requestBody = {
    date,
  };

  let response = await fetch(
    API_URL + "/miscourages-cutting/miscourages-by-date",
    {
      signal: signal,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

export const fetchVacuumSellingWorkOrders = async ({
  signal,
  date,
}: {
  signal: AbortSignal;
  date: string;
}) => {
  const token = getAuthToken();

  const requestBody = {
    date,
  };

  let response = await fetch(API_URL + "/selling-orders/by-date-with-pieces", {
    signal: signal,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

export const fetchVacuumSellingWorkOrderPieces = async ({
  signal,
  typeOfPiece,
  orderCode,
  cowType,
}: {
  signal: AbortSignal;
  typeOfPiece: string;
  orderCode: string;
  cowType: string;
}) => {
  const token = getAuthToken();

  let response = await fetch(
    API_URL +
      `/selling-orders/selling-piece-details?typeOfPiece=${typeOfPiece}&orderCode=${orderCode}&cowType=${cowType}`,
    {
      signal: signal,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

////////////////////////////////// Clients \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const fetchClients = async ({ signal }: { signal: AbortSignal }) => {
  const token = getAuthToken();

  let response = await fetch(API_URL + "/data/clients-with-id", {
    signal: signal,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

export const fetchClientVacuumPieces = async ({
  signal,
  clientId,
}: {
  signal: AbortSignal;
  clientId: string;
}) => {
  const token = getAuthToken();

  let response = await fetch(API_URL + `/web-item/client/${clientId}`, {
    signal: signal,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};


////////////////////////////////// Create \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const createClient = async (createData: createClientSupplierData) => {
  const token = getAuthToken();

  let response = await fetch(API_URL + "/data/add-clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(createData),
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

export const createSupplier = async (createData: createClientSupplierData) => {
  const token = getAuthToken();

  let response = await fetch(API_URL + "/data/add-suppliers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(createData),
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};


////////////////////////////////// Making Orders \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const fetchMakingOrdersDate = async ({
  signal,
  date,
}: {
  signal: AbortSignal;
  date: string;
}) => {
  const token = getAuthToken();

  let response = await fetch(API_URL + `/making-orders/by-date?date=${date}`, {
    signal: signal,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

export const fetchMakingOrder = async ({
  signal,
  orderCode,
}: {
  signal: AbortSignal;
  orderCode: string;
}) => {
  const token = getAuthToken();

  let response = await fetch(API_URL + `/making-orders/by-order/${orderCode}`, {
    signal: signal,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

export const fetchMakingOrderCowType = async ({
  signal,
  orderCode,
  cowType
}: {
  signal: AbortSignal;
  orderCode: string;
  cowType: string;
}) => {
  const token = getAuthToken();

  let response = await fetch(API_URL + `/making-orders/by-order/${orderCode}/${cowType}`, {
    signal: signal,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred... Failed to load."
    ) as customError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};
