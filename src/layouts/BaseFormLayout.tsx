import React, { useEffect, useState } from "react"
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import api from "../utils/axios";
import Swal from "sweetalert2";
import { Select } from "../components/Select";

interface IFields {
    label: string;
    name: string;
    type: string;
    rules: any;
    disabled?: boolean;
    options?: any;
}

interface IBaseFormLayout {
    fields: IFields[];
    data?: any;
    path: string;
    title: string;
    transformFields?: (name: string) => void;
    customSubmitAction?: (values: any) => Promise<any>;
    disableAllFields?: boolean;
}

export const BaseFormLayout: React.FC<IBaseFormLayout> = ({ fields, data, path, title, transformFields, customSubmitAction, disableAllFields }) => {
    const [isLoading, setIsLoading] = useState(false);

    const keys = fields.flatMap((field) => (
        [transformFields?.(field.name) ?? field.name]
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

            if (customSubmitAction) {
                await customSubmitAction(values);
            } else if (data) {
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
        } catch (error: any) {
            Swal.fire({
                title: 'Failed!',
                text: error.response.data.message,
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
            {fields.map((field) => {
                if (field.type === "options") {
                    return (<Select
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        register={register}
                        errors={errors}
                        rules={field.rules}
                        disabled={field.disabled || disableAllFields}
                        options={field?.options ?? []}
                    />)
                }

                return (
                    <Input
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        register={register}
                        errors={errors}
                        rules={field.rules}
                        disabled={field.disabled || disableAllFields}
                    />
                );
            })}
            {!disableAllFields && (
                <Button variant="primary" type="submit" className="mt-3">
                    {data ? 'Update' : 'Submit'}
                </Button>)
            }
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