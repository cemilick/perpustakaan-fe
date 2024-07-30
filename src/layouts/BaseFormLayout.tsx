import React, { useEffect, useState } from "react"
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import api from "../utils/axios";
import Swal from "sweetalert2";

interface IFields {
    label: string;
    name: string;
    type: string;
    rules: any;
    disabled?: boolean;
}

interface IBaseFormLayout {
    fields: IFields[];
    data?: any;
    path: string;
    title: string;
}

export const BaseFormLayout: React.FC<IBaseFormLayout> = ({ fields, data, path, title }) => {
    const [isLoading, setIsLoading] = useState(false);

    const keys = fields.flatMap((field) => (
        [field.name]
    ));

    let initialValues = keys.reduce((acc: any, key) => {
        acc[key] = "";
        return acc;
    }, {});

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        formState: { errors }
    } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        defaultValues: initialValues
    });

    const onSubmit = async (values: any) => {
        try {
            setIsLoading(false);
            if (data) {
                await api.post(path + `/${data?.id}`, values);
            } else {
                await api.post(path, values);
            }

            Swal.fire({
                title: 'Success!',
                text: 'Submit Successfull!',
                timer: 2000,
                icon: 'success',
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            Swal.fire({
                title: 'Failed!',
                text: 'Submit Failed!',
                timer: 2000,
                icon: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const onError = (error: any) => {
        Swal.fire({
            title: 'Failed!',
            text: 'Fill all required fields!',
            timer: 2000,
            icon: 'error',
        });
    };

    useEffect(() => {
        keys.forEach((key) => {
            setValue(key, data?.[key]);
        });
    }, [data])

    const form = () => (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            {fields.map((field) => (
                <Input
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    register={register}
                    errors={errors}
                    rules={field.rules}
                    disabled={field.disabled}
                />
            ))}
            <Button variant="primary" type="submit" className="mt-3">
                {data ? 'Update' : 'Submit'}
            </Button>
        </Form>
    );

    return data ? form() : (
        <Card>
            <Card.Body>
                <Card.Title className="mb-5">Form {title}</Card.Title>
                {form()}
            </Card.Body>
        </Card>
    );
}