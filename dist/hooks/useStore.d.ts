import React from "react";
import { RuleItem, ValidateError } from 'async-validator';
export interface FieldProps {
    name: string;
    value?: any;
    rules?: RuleItem[];
    isValid?: boolean;
    label?: string;
    err?: ValidateError[];
}
export interface FormProps {
    isValid?: boolean;
    isSubmitting?: boolean;
    errors: Record<string, any>;
}
export type StoreProps = {
    field: {
        [key: string]: FieldProps;
    };
    form: FormProps;
};
export type actionProps = {
    type: "addField" | "changeValue" | "updateItemValidate" | "formSubmitStatus" | "formValid";
    name?: string;
    value: any;
};
declare const useStore: () => {
    store: StoreProps;
    dispatch: React.Dispatch<actionProps>;
    checkValid: (name: string) => Promise<void>;
    checkFormValid: () => Promise<{
        allValues: {
            [x: string]: any;
        };
        allErrors: {};
        valid: boolean;
    }>;
    getFieldValue: (key: string) => any;
    getFieldsValue: () => {
        [x: string]: any;
    };
    setFieldValue: (name: string, value: any) => void;
};
export default useStore;
