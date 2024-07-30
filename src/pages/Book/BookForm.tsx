import React from "react"
import { BaseFormLayout } from "../../layouts/BaseFormLayout";

interface IBookForm {
    data?: any;
}

export const BookForm: React.FC<IBookForm> = ({ data }) => {
    const fields = [
        { label: "Judul", name: "judul", type: "text", rules: { required: "No Anggota is required" } },
        { label: "Penerbit", name: "penerbit", type: "text", rules: { required: "Nama is required" } },
        { label: "Jumlah Halaman", name: "jumlah_halaman", type: "number", rules: { required: "Tanggal Lahir is required" } },
        { label: "Stok", name: "stok", type: "number", rules: { required: "Tanggal Lahir is required" } },
        { label: "Harga sewa per hari", name: "harga", type: "number", rules: { required: "Tanggal Lahir is required" } }
    ];

    return (<BaseFormLayout
        fields={fields}
        data={data}
        path="buku"
        title="Buku"
    />);
}