var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { useRequest } from "ahooks";
import Icon from "../icon/Icon";
import Transition from "../transition/transition";
export var SubMenu = function (props) {
    var _a = useContext(MenuContext), activeIndex = _a.activeIndex, onSelect = _a.onSelect, mode = _a.mode, defaultOpenSubMenus = _a.defaultOpenSubMenus;
    var className = props.className, style = props.style, index = props.index, disable = props.disable, children = props.children, title = props.title;
    var defaultOpen = defaultOpenSubMenus.indexOf(index) !== -1 && mode === "vertical";
    var _b = useState(defaultOpen), ifOpen = _b[0], setIfOpen = _b[1];
    var classes = classNames('sub-menu', className, {
        "menuitem-disable": disable,
        "menuitem-active": index === activeIndex,
        "ifOpen": ifOpen
    });
    var generateChild = function () {
        var temp = React.Children.map(children, function (child, index1) {
            var _a, _b;
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "MenuItem") {
                return React.cloneElement(childElement, { index: ((_a = childElement.props) === null || _a === void 0 ? void 0 : _a.index) ? (_b = childElement.props) === null || _b === void 0 ? void 0 : _b.index : index + "-" + index1.toString() });
            }
            else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component");
            }
        });
        return temp;
    };
    var sub_classes = classNames("submenu-ul");
    var handleClick = function (e) {
        e.preventDefault();
        setIfOpen(!ifOpen);
    };
    var handleMouse = function (e, troop) {
        e.preventDefault();
        setIfOpen(troop);
        return new Promise(function (reslove) {
            reslove(null);
        });
    };
    var _c = useRequest(handleMouse, {
        throttleWait: 800,
        manual: true,
    }), data = _c.data, run = _c.run;
    var hoverFuc = mode === "horizontal" ? {
        onMouseEnter: function (e) { return run(e, true); },
        onMouseLeave: function (e) { return run(e, false); },
    } : {};
    var clickFuc = mode === "vertical" ? {
        onClick: function (e) { return handleClick(e); }
    } : {};
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverFuc),
        React.createElement("div", __assign({ className: "submenu-title menuItem" }, clickFuc),
            title,
            React.createElement("span", { className: "icon" },
                React.createElement(Icon, { icon: "angle-down" }))),
        React.createElement(Transition, { in: ifOpen, timeout: 500 },
            React.createElement("ul", { className: sub_classes }, generateChild()))));
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
