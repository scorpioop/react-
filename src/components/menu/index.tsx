import Menu,{MenuProps} from "./menu";
import MenuItem,{MenuItemProps} from "./menuItem";
import SubMenu,{SubMenuProps} from "./submenu";

export type MenuComponent = React.FC<MenuProps> & {
  menuItem: React.FC<MenuItemProps>,
  subMenu: React.FC<SubMenuProps>,
}

const menuComponent = Menu as MenuComponent
menuComponent.menuItem= MenuItem
menuComponent.subMenu = SubMenu
export default menuComponent