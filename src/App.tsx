import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./components/Login";
import RootLayout from "./pages/RootLayout";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import Err from "./components/Err";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";
import Report from "./components/Report/Report";
import Receipt from "./components/Receipt/Receipt";
import Clients from "./components/Clients/Clients";
import ClientVacuumPieces from "./components/Clients/ClientVacuumPieces";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Err />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "shatat-slaughterhouse",
        element: <DashboardLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "report",
            element: <Report />,
          },
          {
            path: "receipt",
            element: <Receipt />,
          },
          {
            path: "clients",
            element: <Clients />,
          },
          {
            path: "clients/:clientId",
            element: <ClientVacuumPieces />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
