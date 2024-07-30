import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "./layouts/BaseLayout";
import { Dashboard } from "./pages/Dashboard";
import { Customer } from "./pages/Customer/Customer";
import { CustomerForm } from "./pages/Customer/CustomerForm";
import { Book } from "./pages/Book/Book";
import { BookForm } from "./pages/Book/BookForm";

export const router = () => createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout />,
        children: [
            { path: "", element: <Dashboard /> },
            { path: "customers", element: <Customer /> },
            { path: "customers/create", element: <CustomerForm /> },
            { path: "books", element: <Book /> },
            { path: "books/create", element: <BookForm /> },
        ],
    },
]);