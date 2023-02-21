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
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FormContext } from "./Form";
import classNames from "classnames";
export var FormItem = function (props) {
    var _a, _b, _c;
    var _d = useContext(FormContext), dispatch = _d.dispatch, store = _d.store, initialValue = _d.initialValue, checkValid = _d.checkValid;
    var _e = useState(false), seen = _e[0], setSeen = _e[1];
    var _f = props, label = _f.label, children = _f.children, name = _f.name, trigger = _f.trigger, getValueFromEvent = _f.getValueFromEvent, rules = _f.rules, isValid = _f.isValid, err = _f.err, valuePropName = _f.valuePropName;
    // const [reChild, setReChild] = useState<React.ReactNode>();
    useEffect(function () {
        var temp = "";
        if (initialValue) {
            temp = initialValue[name];
        }
        dispatch({
            type: "addField",
            name: name,
            value: {
                label: label,
                name: name,
                value: temp,
                isValid: isValid ? isValid : true,
                err: err ? err : {},
                rules: rules ? rules : [],
            },
        });
    }, []); //初始更新inputItem名字
    var inputNode = {};
    var handleChange = useCallback(function (e) {
        dispatch({
            type: "changeValue",
            name: name,
            value: getValueFromEvent(e),
        });
    }, []);
    useEffect(function () {
        var _a;
        var err = (_a = store.field[name]) === null || _a === void 0 ? void 0 : _a.err;
        setSeen(err && err.length > 0 ? true : false);
    }, [store]);
    inputNode[valuePropName] = store.field[name] && store.field[name].value;
    inputNode[trigger] = handleChange;
    inputNode.onBlur = rules && checkValid.bind(null, name);
    var childList = React.Children.toArray(children);
    var child = childList[0];
    var reChild = React.cloneElement(child, __assign(__assign({}, child.props), inputNode));
    var classes = classNames({
        "input-error": !((_a = store.field[name]) === null || _a === void 0 ? void 0 : _a.isValid)
    });
    return (React.createElement("div", { className: "form-item" },
        React.createElement("div", null, label && React.createElement("label", { title: label }, label)),
        React.createElement("div", { className: classes },
            reChild,
            (seen && ((_b = store.field[name]) === null || _b === void 0 ? void 0 : _b.err)) && React.createElement("div", { className: 'viking-form-item-explain' }, ((_c = store.field[name]) === null || _c === void 0 ? void 0 : _c.err)[0].message)),
        React.createElement("div", null, childList.map(function (val, index) {
            if (index !== 0) {
                return val;
            }
        }))));
};
FormItem.defaultProps = {
    trigger: "onChange",
    valuePropName: "value",
    getValueFromEvent: function (e) {
        return e.target.value;
    },
};
export default FormItem;
