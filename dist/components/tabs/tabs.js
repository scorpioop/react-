import React, { useEffect, useState, createContext } from "react";
import classNames from "classnames";
export var TabContext = createContext({ activeIndex: "0" });
export var Tabs = function (_a) {
    var children = _a.children, onSelect = _a.onSelect, defaultIndex = _a.defaultIndex;
    var classes = classNames("tabs");
    var _b = useState([]), lables = _b[0], setLabels = _b[1];
    var _c = useState(defaultIndex), activeIndex = _c[0], setActiveIndex = _c[1];
    var _d = useState(), sonChildren = _d[0], setSonChildren = _d[1];
    var getLable = function () {
        var temp = [];
        var temp1 = React.Children.map(children, function (child, index) {
            var childElement = child;
            if (childElement.type.displayName === "TabItem") {
                temp.push([childElement.props.label,
                    childElement.props.index ? childElement.props.index : index.toString(),
                    childElement.props.disable ? true : false]);
                return (React.cloneElement(childElement, { index: childElement.props.index ? childElement.props.index : index.toString() }));
            }
            else {
                console.error("Warning: Tab has a child which is not a TabItem component");
            }
        });
        // let result:LabelArray[]=temp?temp:[]
        setSonChildren(temp1);
        setLabels(temp);
    };
    useEffect(function () {
        getLable();
    }, []);
    var handleSelect = function (index, disable) {
        if (!disable) {
            setActiveIndex(index);
            if (onSelect)
                onSelect(index);
        }
    };
    var passMessage = {
        activeIndex: activeIndex ? activeIndex : "0",
        handleSelect: handleSelect,
    };
    var each_label = function (val) {
        return classNames("each-label", {
            active: activeIndex === val[1],
            disable: val[2]
        });
    };
    return (React.createElement("div", { className: classes },
        React.createElement(TabContext.Provider, { value: passMessage },
            React.createElement("div", { className: "tab-label", "data-testid": "test-label" }, lables.map(function (val) {
                return React.createElement("div", { key: val[1], className: each_label(val), onClick: function () { return handleSelect(val[1], val[2]); } }, val[0]);
            })),
            sonChildren)));
};
Tabs.defaultProps = {
    defaultIndex: "0",
};
export default Tabs;
