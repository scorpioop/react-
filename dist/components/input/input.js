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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import classNames from "classnames";
import Icon from "../icon/Icon";
export var Input = function (props) {
    var disable = props.disable, icon = props.icon, propand = props.propand, append = props.append, style = props.style, restProps = __rest(props, ["disable", "icon", "propand", "append", "style"]);
    var classes = classNames('input-container');
    var inputClasses = classNames({
        "radis": !propand && !append,
        "left-redis": !propand && append,
        "right-radis": propand && !append
    });
    return (React.createElement("div", { className: classes, style: style },
        propand ? React.createElement("div", { className: "propand" }, propand) : null,
        React.createElement("div", { className: "all-input" },
            React.createElement("input", __assign({ disabled: disable, className: inputClasses }, restProps)),
            React.createElement("span", { className: "input-icon" }, icon ? React.createElement(Icon, { icon: icon, theme: "primary" }) : null)),
        append ? React.createElement("div", { className: "append" }, append) : null));
};
export default Input;
