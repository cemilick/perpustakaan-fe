import { DateHelper } from "../../utils/functions";
import { BaseIndexLayout } from "../../layouts/BaseIndexLayout";
import { CustomerForm } from "./CustomerForm";

export const Customer: React.FC = () => {
    const column = [
        { key: "no_anggota", label: "No Anggota" },
        { key: "nama", label: "Nama" },
        { key: "tgl_lahir", label: "Tanggal Lahir" },
    ];
    const path = "customer";

    return (<BaseIndexLayout
        path={path}
        column={column}
        name="Customer"
        customCell={(name, value, defaultCell) => {
            if (name === "tgl_lahir") {
                return <>{DateHelper.formatDate(value)}</>;
            }
            return defaultCell;
        }}
        detailComponent={(data) => {
            return <CustomerForm data={data} />;
        }}
    />);
}