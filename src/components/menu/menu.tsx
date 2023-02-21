import React, { createContext, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: "horizontal" | "vertical";
  style?: React.CSSProperties;
  onSelect?: (index: string) => void;
  children?: React.ReactNode;
  defaultOpenSubMenus?:string[]
}
interface MenuContextProps {
  activeIndex: string;
  onSelect?: (index: string) => void;
  mode?: "horizontal" | "vertical";
  defaultOpenSubMenus:string[];
}
export const MenuContext = createContext<MenuContextProps>({ activeIndex: "0",defaultOpenSubMenus:[] });
export const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, onSelect, children,defaultOpenSubMenus } = props;
  const classnames = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal":mode === "horizontal"
  });
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const handleSelect = (index: string) => {
    
    setActiveIndex(index);
    if (onSelect) onSelect(index);
  };
  const passMessage: MenuContextProps = {
    activeIndex: activeIndex ? activeIndex : "0",
    onSelect: handleSelect,
    mode,
    defaultOpenSubMenus:defaultOpenSubMenus?defaultOpenSubMenus:[],
  };
  const renderChildren = () => {
    
    let temp = React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;

      
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        
        return React.cloneElement(childElement,{index:childElement.props?.index?childElement.props?.index:index.toString()});
      } else {
        console.error(
          `Warning: Menu has a child which is not a MenuItem component`
        );
      }
    });


    return temp;
  };
  return (
    <ul className={classnames} style={style} data-testid="menutest">
      <MenuContext.Provider value={passMessage}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};
Menu.defaultProps = {
  mode: "horizontal",
  defaultIndex: "0",
  defaultOpenSubMenus:[]
};

export default Menu;
