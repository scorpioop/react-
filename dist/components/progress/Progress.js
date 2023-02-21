import React from "react";
import classNames from "classnames";
var Progress = function (props) {
    var _a;
    var percent = props.percent, strokeHeight = props.strokeHeight, showText = props.showText, styles = props.styles, theme = props.theme;
    var classColors = classNames("progress-percent", (_a = {},
        _a["process-".concat(theme)] = theme,
        _a));
    return (React.createElement("div", { className: "progress", style: styles },
        React.createElement("div", { className: "progress-background" },
            React.createElement("div", { className: classColors, style: { width: "".concat(percent, "%") } },
                React.createElement("div", { className: "progress-percent-num" }, showText ? percent : null)))));
};
Progress.defaultProps = {
    strokeHeight: 10,
    showText: true,
    theme: "primary",
};
export default Progress;
