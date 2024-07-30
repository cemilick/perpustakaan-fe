import React from "react"
import { BaseFormLayout } from "../../layouts/BaseFormLayout";
import { Card } from "react-bootstrap";

interface ICustomerForm {
    data?: any;
}

export const CustomerForm: React.FC<ICustomerForm> = ({ data }) => {

    const fields = data ? [
        { label: "No Anggota", name: "no_anggota", type: "text", rules: { required: "No Anggota is required" }, disabled: true },
        { label: "Nama", name: "nama", type: "text", rules: { required: "Nama is required" } },
        { label: "Tanggal Lahir", name: "tgl_lahir", type: "date", rules: { required: "Tanggal Lahir is required" } }
    ] : [
        { label: "Nama", name: "nama", type: "text", rules: { required: "Nama is required" } },
        { label: "Tanggal Lahir", name: "tgl_lahir", type: "date", rules: { required: "Tanggal Lahir is required" } }
    ];

    return (<BaseFormLayout
        fields={fields}
        data={data}
        path="customer"
        title="Customer"
    />);
}