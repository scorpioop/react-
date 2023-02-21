/// <reference types="react" />
import { MenuProps } from "./menu";
import { MenuItemProps } from "./menuItem";
import { SubMenuProps } from "./submenu";
export type MenuComponent = React.FC<MenuProps> & {
    menuItem: React.FC<MenuItemProps>;
    subMenu: React.FC<SubMenuProps>;
};
declare const menuComponent: MenuComponent;
export default menuComponent;
