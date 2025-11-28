import { NavLink, useNavigate } from "react-router";
import { getAuthToken } from "../util/auth";
import DashboardIcon from "./Icons/DashboardIcon";
import LoginIcon from "./Icons/LoginIcon";
import LogoutIcon from "./Icons/LogoutIcon";
import { logout } from "../util/http";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const isAuthenticated = getAuthToken();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="bg-green-950 w-2/12 flex flex-col justify-between h-[calc(100vh-4rem)] py-5 sticky top-16">
      <div className="flex flex-col gap-5">
        <NavLink
          to="/shatat-slaughterhouse/dashboard"
          className={({ isActive }) => `
                    py-1.5 px-5 flex items-center gap-2 max-[57rem]:justify-center hover:underline ${
                      isActive
                        ? "bg-green-900 rounded-l-lg font-bold"
                        : undefined
                    }
                `}
        >
          <DashboardIcon />{" "}
          <span className="max-[57rem]:hidden">Dashboard</span>
        </NavLink>

        <NavLink
          to="/shatat-slaughterhouse/report"
          className={({ isActive }) => `
                    py-1.5 px-5 flex items-center gap-2 max-[57rem]:justify-center hover:underline ${
                      isActive
                        ? "bg-green-900 rounded-l-lg font-bold"
                        : undefined
                    }
                `}
        >
          <DashboardIcon /> <span className="max-[57rem]:hidden">Report</span>
        </NavLink>

        <NavLink
          to="/shatat-slaughterhouse/receipt"
          className={({ isActive }) => `
                    py-1.5 px-5 flex items-center gap-2 max-[57rem]:justify-center hover:underline ${
                      isActive
                        ? "bg-green-900 rounded-l-lg font-bold"
                        : undefined
                    }
                `}
        >
          <DashboardIcon /> <span className="max-[57rem]:hidden">Receipt</span>
        </NavLink>

        <NavLink
          to="/shatat-slaughterhouse/clients"
          className={({ isActive }) => `
                    py-1.5 px-5 flex items-center gap-2 max-[57rem]:justify-center hover:underline ${
                      isActive
                        ? "bg-green-900 rounded-l-lg font-bold"
                        : undefined
                    }
                `}
        >
          <DashboardIcon /> <span className="max-[57rem]:hidden">Clients</span>
        </NavLink>

        <NavLink
          to="/shatat-slaughterhouse/making-orders"
          className={({ isActive }) => `
                    py-1.5 px-5 flex items-center gap-2 max-[57rem]:justify-center hover:underline ${
                      isActive
                        ? "bg-green-900 rounded-l-lg font-bold"
                        : undefined
                    }
                `}
        >
          <DashboardIcon /> <span className="max-[57rem]:hidden">Making Orders</span>
        </NavLink>

        <NavLink
          to="/shatat-slaughterhouse/create"
          className={({ isActive }) => `
                    py-1.5 px-5 flex items-center gap-2 max-[57rem]:justify-center hover:underline ${
                      isActive
                        ? "bg-green-900 rounded-l-lg font-bold"
                        : undefined
                    }
                `}
        >
          <DashboardIcon /> <span className="max-[57rem]:hidden">Create</span>
        </NavLink>
      </div>

      {!isAuthenticated && (
        <NavLink
          to="/"
          className="py-1.5 px-5 flex items-center gap-2 max-[57rem]:justify-center hover:underline"
        >
          <LoginIcon /> <span className="max-[57rem]:hidden">Login/Signup</span>
        </NavLink>
      )}

      {isAuthenticated && (
        <button
          className="py-1.5 px-5 flex items-center gap-2 max-[57rem]:justify-center hover:underline hover:cursor-pointer"
          type="button"
          onClick={handleLogout}
        >
          <LogoutIcon /> <span className="max-[57rem]:hidden">Logout</span>
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
