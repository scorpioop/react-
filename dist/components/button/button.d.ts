import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
export declare enum ButtonSize {
    Large = "lg",
    Small = "sm"
}
export type ButtonType = "primary" | "default" | "danger" | "link";
interface BaseButtonProps {
    className?: string;
    /**
     * 是否禁用
     */
    disable?: boolean;
    /**
     * 设置大小
     */
    size?: "lg" | "sm";
    /**
     * 设置模式
     */
    btnType?: ButtonType;
    href?: string;
    children?: React.ReactNode;
}
export type ButtonProps = Partial<ButtonHTMLAttributes<HTMLElement> & AnchorHTMLAttributes<HTMLElement>> & BaseButtonProps;
/**
 * 按钮组件，可以设置多种模式<br/>
 * 引入方式：
 * `import{ Button} from "simonsay"`
 */
export declare const Button: React.FC<ButtonProps>;
export default Button;
