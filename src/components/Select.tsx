import React from "react";
import { Form } from "react-bootstrap";

interface IOptions {
    value: any;
    label: string;
}

interface IInput {
    label: string;
    name: string;
    options: IOptions[];
    register: any;
    errors: any;
    rules: any;
    disabled?: boolean;
}

export const Select: React.FC<IInput> = ({ label, name, options, register, errors, rules, disabled }) => {
    return (<Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Select
            disabled={disabled}
            {...register(name, rules)}
            placeholder={`Masukkan ${label}`}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
            ))}
        </Form.Select>
        {errors?.[name] && (
            <Form.Text className="text-danger">
                {errors?.[name].message}
            </Form.Text>
        )}
    </Form.Group>);
}