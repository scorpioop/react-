import React from "react";
export type AlertType = "success" | "default" | "danger" | "warning";
interface BaseAlertProps {
    type?: AlertType;
    title?: string;
    content?: string;
    closeIcon?: boolean;
    children?: React.ReactNode;
    open?: boolean;
    onClose?: () => void;
}
export declare const Alert: React.FC<BaseAlertProps>;
export default Alert;
