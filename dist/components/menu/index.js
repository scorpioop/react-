import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./submenu";
var menuComponent = Menu;
menuComponent.menuItem = MenuItem;
menuComponent.subMenu = SubMenu;
export default menuComponent;
