import React from "react";
export interface MenuItemProps {
    className?: string;
    style?: React.CSSProperties;
    index?: string;
    disable?: boolean;
    children?: React.ReactNode;
}
export declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
