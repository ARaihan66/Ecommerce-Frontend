import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import { AdminPanel } from "../pages/AdminPanel";
import { AllUsers } from "../pages/AllUsers";
import { AllProducts } from "../pages/AllProducts";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/log-in",
        Component: Login,
      },
      {
        path: "/sign-up",
        Component: SignUp,
      },
      {
        path: "/forgot-password",
        Component: ForgotPassword,
      },
      {
        path: "/admin-panel",
        Component: AdminPanel,
        children: [
          { path: "all-users", Component: AllUsers },
          { path: "all-products", Component: AllProducts },
        ],
      },
    ],
  },
]);

export default router;
