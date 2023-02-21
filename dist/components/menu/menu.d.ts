import React from "react";
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: "horizontal" | "vertical";
    style?: React.CSSProperties;
    onSelect?: (index: string) => void;
    children?: React.ReactNode;
    defaultOpenSubMenus?: string[];
}
interface MenuContextProps {
    activeIndex: string;
    onSelect?: (index: string) => void;
    mode?: "horizontal" | "vertical";
    defaultOpenSubMenus: string[];
}
export declare const MenuContext: React.Context<MenuContextProps>;
export declare const Menu: React.FC<MenuProps>;
export default Menu;
