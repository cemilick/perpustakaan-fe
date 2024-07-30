import { StringHelper } from "../../utils/functions";
import { BaseIndexLayout } from "../../layouts/BaseIndexLayout";
import { BookForm } from "./BookForm";

export const Book: React.FC = () => {
    const column = [
        { key: "judul", label: "Judul" },
        { key: "penerbit", label: "Penerbit" },
        { key: "jumlah_halaman", label: "Jumlah Halaman" },
        { key: "stok", label: "Stok" },
        { key: "harga", label: "Harga sewa per hari" },
    ];
    const path = "buku";

    return (<BaseIndexLayout
        path={path}
        column={column}
        name="Buku"
        customCell={(name, value, defaultCell) => {
            if (name === "harga") {
                return <>{StringHelper.formatCurrency(value)}</>;
            }
            return defaultCell;
        }}
        detailComponent={(data) => {
            return <BookForm data={data} />;
        }}
    />);
}