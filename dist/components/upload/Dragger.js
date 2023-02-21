import React, { useState } from "react";
import Icon from "../icon/Icon";
import classNames from "classnames";
var Dragger = function (props) {
    var onFile = props.onFile;
    var _a = useState(false), dragIn = _a[0], setDragIn = _a[1];
    var classes = classNames("drag-block", {
        "drag-in": dragIn
    });
    var handleDragIn = function (e) {
        e.preventDefault();
        setDragIn(true);
    };
    var handleDragLeave = function (e) {
        e.preventDefault();
        setDragIn(false);
    };
    var handleDrop = function (e) {
        e.preventDefault();
        setDragIn(false);
        onFile(e.dataTransfer.files);
    };
    return (React.createElement("div", { className: classes, onDragOver: function (e) { return handleDragIn(e); }, onDragLeave: function (e) { return handleDragLeave(e); }, onDrop: function (e) { return handleDrop(e); } },
        React.createElement("div", null,
            React.createElement(Icon, { icon: "upload", style: { fontSize: "3rem" } }),
            React.createElement("div", null, "please drag file which you want to upload here"))));
};
export default Dragger;
