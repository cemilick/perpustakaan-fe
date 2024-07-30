import React, { useEffect, useState } from "react"
import { BaseFormLayout } from "../../layouts/BaseFormLayout";
import api from "../../utils/axios";

interface ITransactionForm {
    data?: any;
}

export const TransactionForm: React.FC<ITransactionForm> = ({ data }) => {
    const [fields, setFields] = useState<any[]>([]);

    const fetchOptions = async () => {
        const { data } = await api.get("buku/get-buku-options");
        const { data: response } = await api.get("customer/get-customer-options");
        setFields([
            { label: "Judul Buku", name: "buku_id", type: "options", rules: { required: "Judul Buku is required" }, options: data.data },
            { label: "Nama Peminjam", name: "customer_id", type: "options", rules: { required: "Nama is required" }, options: response.data },
            { label: "Tanggal Pinjam", name: "tanggal_pinjam", type: "date", rules: { required: "Tanggal Lahir is required" } },
            { label: "Harga Sewa", name: "harga", type: "number", disabled: true },
            { label: "Lama Pinjam", name: "lama_pinjam", type: "text", disabled: true },
            { label: "Status", name: "status", type: "text", disabled: true },
        ]);
    }

    useEffect(() => {
        fetchOptions();
    }, []);

    return (<BaseFormLayout
        fields={fields}
        data={data}
        path="peminjaman"
        title="Peminjaman"
        disableAllFields={data?.status == "Sudah Dikembalikan"}
    />);
}