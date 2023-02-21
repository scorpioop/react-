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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useRef, useState } from "react";
import axios from "axios";
import FileList from "./FileList";
import Dragger from "./Dragger";
export var Upload = function (props) {
    var drag = props.drag, children = props.children, action = props.action, onProcess = props.onProcess, onSuccess = props.onSuccess, onFail = props.onFail, onBeforeUpload = props.onBeforeUpload, onChange = props.onChange, onRemove = props.onRemove, defaultFile = props.defaultFile, accept = props.accept, multiple = props.multiple;
    var _a = useState([]), filesStatusArray = _a[0], setFilesStatusArray = _a[1];
    var _b = useState(defaultFile), defaultFiles = _b[0], setDefaultFiles = _b[1];
    var inputNode = useRef(null);
    var handleClick = function () {
        if (!inputNode.current)
            return;
        inputNode.current.click();
    };
    // useEffect(()=>{
    //   console.log(filesStatusArray);
    // },[filesStatusArray])
    var updateFileList = function (fileStatus, updateContent) {
        setFilesStatusArray(function (pre) {
            var newNeed = pre.map(function (value) {
                if (value.uid === fileStatus.uid) {
                    var temp = __assign(__assign({}, value), updateContent);
                    return temp;
                }
                return value;
            });
            return newNeed;
        });
    };
    var post = function (file) {
        var dataForm = new FormData();
        dataForm.append(file.name, file);
        var __file = {
            uid: Date.now() + "files",
            size: file.size,
            name: file.name,
            status: "ready",
            raw: file,
            percent: 0,
        };
        setFilesStatusArray(function (pre) {
            return (__spreadArray([__file], pre, true));
        });
        axios
            .post(action, dataForm, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / (e.total ? e.total : 100)) || 0;
                if (percentage < 100) {
                    updateFileList(__file, { percent: percentage, status: "uploading" });
                    if (onProcess) {
                        onProcess(percentage, file);
                    }
                }
            },
        })
            .then(function (res) {
            if (onChange)
                onChange(file);
            updateFileList(__file, { percent: 100, status: "success", response: res });
            if (onSuccess)
                onSuccess(res, file);
        })
            .catch(function (err) {
            if (onChange)
                onChange(file);
            if (onFail)
                onFail(err, file);
            updateFileList(__file, { percent: 100, status: "error", err: err });
        });
    };
    var uploadFiles = function (files) {
        var arryFiles = Array.from(files);
        arryFiles.map(function (file) {
            if (onBeforeUpload) {
                var temp = onBeforeUpload(file);
                if (temp instanceof Promise) {
                    temp.then(function (res) {
                        post(res);
                    });
                }
                else if (temp) {
                    post(file);
                }
                else if (temp === false) {
                    alert("fail");
                }
                else {
                    post(file);
                }
            }
            else {
                post(file);
            }
        });
    };
    var handleFileSelect = function (files) {
        if (!files)
            return;
        uploadFiles(files);
        if (inputNode.current) {
            inputNode.current.value = '';
        }
    };
    var handleRemove = function (fileStatus) {
        if (defaultFiles) {
            var temp = defaultFiles.filter(function (val) {
                return val.uid !== fileStatus.uid;
            });
            setDefaultFiles(__spreadArray([], temp, true));
        }
        if (filesStatusArray) {
            var temp = filesStatusArray.filter(function (val) {
                return val.uid !== fileStatus.uid;
            });
            setFilesStatusArray(__spreadArray([], temp, true));
        }
        if (onRemove) {
            onRemove(fileStatus);
        }
    };
    var handleDragger = function (files) {
        handleFileSelect(files);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { onClick: handleClick, className: "upload-child" }, drag ? React.createElement(Dragger, { onFile: handleDragger }) : children),
        React.createElement("input", { type: "file", style: { display: "none" }, ref: inputNode, onChange: function (e) { return handleFileSelect(e.target.files); }, accept: accept, multiple: multiple }),
        React.createElement(FileList, { defaultFile: defaultFiles, onRemove: handleRemove, filesStatusArray: filesStatusArray })));
};
Upload.defaultProps = {
    onBeforeUpload: undefined,
};
export default Upload;
