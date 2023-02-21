import React from "react";
import useStore from "../../hooks/useStore";
import { ValidateError } from "async-validator";
export interface FormProps {
    name?: string;
    children?: React.ReactNode;
    initialValue?: Record<string, any>;
    onFinish?: (values: Record<string, any>) => void;
    onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
}
export type IFormContext = Omit<ReturnType<typeof useStore>, "getFieldValue" | "getFieldsValue" | "setFieldValue"> & Pick<FormProps, "initialValue">;
export type RefProps = Omit<ReturnType<typeof useStore>, "store" | "dispatch" | "checkValid" | "checkFormValid">;
export declare const FormContext: React.Context<IFormContext>;
export declare const Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<RefProps>>;
export default Form;
