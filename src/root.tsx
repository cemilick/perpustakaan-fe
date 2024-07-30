import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "./layouts/BaseLayout";
import { Dashboard } from "./pages/Dashboard";
import { Customer } from "./pages/Customer/Customer";
import { CustomerForm } from "./pages/Customer/CustomerForm";

export const router = () => createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "customers",
                element: <Customer />,
            },
            {
                path: "customers/create",
                element: <CustomerForm />,
            },
        ],
    },
]);