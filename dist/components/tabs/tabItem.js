import React, { useContext } from "react";
import classNames from "classnames";
import { TabContext } from "./tabs";
export var TabItem = function (props) {
    var children = props.children, label = props.label, index = props.index, className = props.className, style = props.style;
    var activeIndex = useContext(TabContext).activeIndex;
    var classes = classNames("tab-item", className, {
        "tabContext-notshow": activeIndex !== index,
    });
    return (React.createElement("div", { className: classes, style: style, "data-testid": "test-tabitem" }, children));
};
TabItem.displayName = "TabItem";
export default TabItem;
