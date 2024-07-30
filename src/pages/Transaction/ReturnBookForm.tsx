import React, { useEffect, useState } from "react"
import { BaseFormLayout } from "../../layouts/BaseFormLayout";
import api from "../../utils/axios";
import moment from "moment/moment";

export const ReturnBookForm: React.FC = () => {
    const [fields, setFields] = useState<any[]>([]);
    const [data, setData] = useState<any>({});

    const fetchOptions = async () => {
        const { data } = await api.get("peminjaman/get-peminjaman-options");
        setFields([
            { label: "Peminjaman", name: "peminjaman_id", type: "options", rules: { required: "Judul Buku is required" }, options: data.data },
        ]);
    }

    useEffect(() => {
        fetchOptions();
    }, []);

    const onSubmit = async (values: any) => {
        try {
            const id = values.peminjaman_id;
            await api.post("peminjaman/" + id, { status: 1, tanggal_kembali: moment().format("YYYY-MM-DD") });
        } catch (error) {
            console.error(error);
        }
    }

    return (<BaseFormLayout
        fields={fields}
        path="peminjaman"
        title="Pengembalian Buku"
        customSubmitAction={onSubmit}
    />);
}