import React from "react";
import Icon from "../icon/Icon";
import Progress from "../progress/Progress";
var FileList = function (props) {
    var defaultFile = props.defaultFile, onRemove = props.onRemove, filesStatusArray = props.filesStatusArray;
    var ifContain = function (item, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].uid === item.uid) {
                return true;
            }
        }
        return false;
    };
    return (React.createElement("ul", { className: "fileList" },
        defaultFile ? defaultFile.map(function (val) {
            return (React.createElement(React.Fragment, null,
                React.createElement("li", null,
                    React.createElement("span", { className: "fileName" }, val.name),
                    React.createElement("span", { className: "statusIcon" },
                        val.status === "uploading" && React.createElement(Icon, { icon: "spinner", spin: true, theme: "primary" }),
                        val.status === 'success' && React.createElement(Icon, { icon: "check-circle", theme: "success" }),
                        val.status === 'error' && React.createElement(Icon, { icon: "times-circle", theme: "danger" })),
                    React.createElement("span", { className: "removeIcon" },
                        React.createElement(Icon, { icon: "times", onClick: function () { onRemove(val); } }))),
                React.createElement(Progress, { percent: val.percent })));
        }) : null,
        filesStatusArray ? filesStatusArray.map(function (val) {
            return (React.createElement(React.Fragment, null,
                React.createElement("li", { key: val.uid },
                    React.createElement("span", { className: "fileName" }, val.name),
                    React.createElement("span", { className: "statusIcon" },
                        (val.status === "uploading" || val.status === "ready") && React.createElement(Icon, { icon: "spinner", spin: true, theme: "primary" }),
                        val.status === 'success' && React.createElement(Icon, { icon: "check-circle", theme: "success" }),
                        val.status === 'error' && React.createElement(Icon, { icon: "times-circle", theme: "danger" })),
                    React.createElement("span", { className: "removeIcon" },
                        React.createElement(Icon, { icon: "times", onClick: function () { onRemove(val); } }))),
                React.createElement(Progress, { percent: val.percent })));
        }) : null));
};
export default FileList;
