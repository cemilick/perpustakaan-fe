import { DateHelper } from "../../utils/functions";
import { BaseIndexLayout } from "../../layouts/BaseIndexLayout";
import { TransactionForm } from "./TransactionForm";

export const Transaction: React.FC = () => {
    const column = [
        { key: "buku", label: "Judul Buku" },
        { key: "customer", label: "Nama Peminjam" },
        { key: "tanggal_pinjam", label: "Tanggal Pinjam" },
        { key: "status", label: "Status" },
    ];
    const path = "peminjaman";

    return (<BaseIndexLayout
        path={path}
        column={column}
        name="Peminjaman"
        customCell={(name, value, defaultCell) => {
            if (name === "buku") {
                return <>{value?.judul}</>;
            }
            if (name === "customer") {
                return <>{value?.nama}</>;
            }
            if (name === "tanggal_pinjam") {
                return <>{DateHelper.formatDate(value)}</>;
            }
            return defaultCell;
        }}
        detailComponent={(data) => {
            return <TransactionForm data={data} />;
        }}
    />);
}