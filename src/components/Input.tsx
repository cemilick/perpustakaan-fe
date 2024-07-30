import React from "react";
import { Form } from "react-bootstrap";

interface IInput {
    label: string;
    name: string;
    type: string;
    register: any;
    errors: any;
    rules: any;
    disabled?: boolean;
}

export const Input: React.FC<IInput> = ({ label, name, type, register, errors, rules, disabled }) => {
    return (<Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control
            type={type}
            disabled={disabled}
            {...register(name, rules)}
            placeholder={`Masukkan ${label}`}
        />
        {errors?.[name] && (
            <Form.Text className="text-danger">
                {errors?.[name].message}
            </Form.Text>
        )}
    </Form.Group>);
}