import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
export var MenuItem = function (props) {
    var _a = useContext(MenuContext), activeIndex = _a.activeIndex, onSelect = _a.onSelect;
    var className = props.className, style = props.style, index = props.index, disable = props.disable, children = props.children;
    var classnames = classNames("menuItem", className, {
        "menuitem-disable": disable,
        "menuitem-active": index === activeIndex
    });
    var handleClick = function () {
        if (onSelect && !disable && typeof (index) === "string")
            onSelect(index);
    };
    return (React.createElement("li", { className: classnames, key: index, style: style, onClick: handleClick }, children));
};
MenuItem.displayName = "MenuItem";
export default MenuItem;
