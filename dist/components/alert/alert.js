import React from "react";
import Transition from "../transition/transition";
import classNames from "classnames";
export var Alert = function (props) {
    var _a;
    var type = props.type, title = props.title, content = props.content, closeIcon = props.closeIcon, children = props.children, open = props.open, onClose = props.onClose;
    var classes = classNames("alert", (_a = {},
        _a["alert-".concat(type)] = type,
        _a));
    return (React.createElement(Transition, { in: open, timeout: 500 },
        React.createElement("div", { className: classes },
            React.createElement("div", null,
                title && React.createElement("div", { className: "title" }, title),
                React.createElement("div", { className: "content" }, children ? children : content)),
            closeIcon && (React.createElement("div", { className: "close", onClick: onClose }, "X")))));
};
Alert.defaultProps = {
    type: "default",
    closeIcon: true,
};
export default Alert;
