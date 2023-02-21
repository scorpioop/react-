import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
export interface Inputprops extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    disable?: boolean;
    icon?: IconProp;
    propand?: React.ReactNode;
    append?: React.ReactNode;
    style?: React.CSSProperties;
}
export declare const Input: React.FC<Inputprops>;
export default Input;
