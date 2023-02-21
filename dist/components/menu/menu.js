import React, { createContext, useState } from "react";
import classNames from "classnames";
export var MenuContext = createContext({ activeIndex: "0", defaultOpenSubMenus: [] });
export var Menu = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, mode = props.mode, style = props.style, onSelect = props.onSelect, children = props.children, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var classnames = classNames("menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode === "horizontal"
    });
    var _a = useState(defaultIndex), activeIndex = _a[0], setActiveIndex = _a[1];
    var handleSelect = function (index) {
        setActiveIndex(index);
        if (onSelect)
            onSelect(index);
    };
    var passMessage = {
        activeIndex: activeIndex ? activeIndex : "0",
        onSelect: handleSelect,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus ? defaultOpenSubMenus : [],
    };
    var renderChildren = function () {
        var temp = React.Children.map(children, function (child, index) {
            var _a, _b;
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "MenuItem" || displayName === "SubMenu") {
                return React.cloneElement(childElement, { index: ((_a = childElement.props) === null || _a === void 0 ? void 0 : _a.index) ? (_b = childElement.props) === null || _b === void 0 ? void 0 : _b.index : index.toString() });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
        return temp;
    };
    return (React.createElement("ul", { className: classnames, style: style, "data-testid": "menutest" },
        React.createElement(MenuContext.Provider, { value: passMessage }, renderChildren())));
};
Menu.defaultProps = {
    mode: "horizontal",
    defaultIndex: "0",
    defaultOpenSubMenus: []
};
export default Menu;
