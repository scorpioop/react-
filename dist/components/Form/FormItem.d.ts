import React from "react";
import { FieldProps } from "../../hooks/useStore";
export type Rules<T, U extends keyof T> = Required<Pick<T, U>> & Omit<T, U>;
export interface FormItemProps extends Pick<FieldProps, "err" | "isValid" | "rules"> {
    label?: string;
    children?: React.ReactNode;
    name: string;
    /**
     * 当input的显示key不是value时可以自定，例如checkbox类型的key为checked
     */
    valuePropName?: string;
    /**
     * 有些input修改时，不是触发onChange，可以自定
     */
    trigger?: string;
    /**
     * input里内容改变后的回调
     */
    getValueFromEvent?: (event: React.ChangeEvent<HTMLInputElement>) => any;
}
export declare const FormItem: React.FC<FormItemProps>;
export default FormItem;
