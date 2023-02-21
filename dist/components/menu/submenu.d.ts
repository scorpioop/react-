import React from "react";
export interface SubMenuProps {
    className?: string;
    style?: React.CSSProperties;
    index?: string;
    disable?: boolean;
    children?: React.ReactNode;
    title: string;
}
export declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
