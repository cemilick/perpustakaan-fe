import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "./layouts/BaseLayout";
import { Dashboard } from "./pages/Dashboard";
import { Customer } from "./pages/Customer/Customer";
import { CustomerForm } from "./pages/Customer/CustomerForm";
import { Book } from "./pages/Book/Book";
import { BookForm } from "./pages/Book/BookForm";
import { Transaction } from "./pages/Transaction/Transaction";
import { TransactionForm } from "./pages/Transaction/TransactionForm";
import { ReturnBookForm } from "./pages/Transaction/ReturnBookForm";

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
            { path: "transactions", element: <Transaction /> },
            { path: "transactions/rent", element: <TransactionForm /> },
            { path: "transactions/return", element: <ReturnBookForm /> },
        ],
    },
]);