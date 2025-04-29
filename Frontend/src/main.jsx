import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home";
import AdminLogin from "./routes/AdminLogin";

import AdminDashboard from "./routes/AdminDashboard";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import CandidateList from "./routes/Candidate";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <AdminLogin />,
      },
      {
        path: "/candidate",
        element: <CandidateList />,
      },
      {
        path: "/admindashboard",
        element: (
          <ProtectedRoutes>
            <AdminDashboard />,
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </StrictMode>
);
