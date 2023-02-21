import { FormProps, RefProps } from "./Form";
import { FormItemProps } from "./FormItem";
import React from "react";
export type FormType = React.ForwardRefExoticComponent<FormProps & React.RefAttributes<RefProps>> & {
    formItem: React.FC<FormItemProps>;
};
declare const FormComponent: FormType;
export default FormComponent;
