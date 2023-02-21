import Form,{FormProps,RefProps} from "./Form";
import FormItem,{FormItemProps} from "./FormItem";
import React,{forwardRef} from "react";
export type FormType = React.ForwardRefExoticComponent<FormProps & React.RefAttributes<RefProps>> & {
  formItem:React.FC<FormItemProps>
}
const FormComponent = Form as FormType
FormComponent.formItem=FormItem
export default FormComponent