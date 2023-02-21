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
import React, { useState, useRef, useEffect } from 'react';
import Input from '../input/input';
import useDebounce from '../../hooks/useDebouce';
import classNames from 'classnames';
import useClickOut from '../../hooks/useClickOut';
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderPerform = props.renderPerform, primaryKey = props.primaryKey, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderPerform", "primaryKey"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSugestions = _b[1];
    var _c = useState(0), indexCode = _c[0], setIndexCode = _c[1];
    var componentDiv = useRef(null);
    useClickOut(componentDiv, function () {
        setSugestions([]);
    });
    var debounce = useDebounce(function () {
        if (inputValue) {
            var results = fetchSuggestions(inputValue);
            if (results instanceof Promise) {
                results.then(function (result) {
                    setSugestions(result);
                });
            }
            else {
                setSugestions(results);
            }
        }
        else {
            setSugestions([]);
        }
    }, 1000);
    useEffect(function () {
        debounce();
    }, [inputValue]);
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
    };
    var handleSelect = function (item) {
        setInputValue(item);
        setSugestions([]);
        if (onSelect) {
            onSelect(item);
        }
        setIndexCode(0);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 40:
                if (indexCode < suggestions.length - 1) {
                    setIndexCode(indexCode + 1);
                }
                break;
            case 38:
                if (indexCode !== 0)
                    setIndexCode(indexCode - 1);
                break;
            case 13:
                if (suggestions[indexCode]) {
                    if (primaryKey) {
                        var temp = suggestions[indexCode];
                        if (temp[primaryKey]) {
                            handleSelect(temp[primaryKey]);
                        }
                    }
                }
                break;
            case 27:
                setSugestions([]);
                setInputValue("");
                setIndexCode(0);
                break;
            default:
                break;
        }
    };
    var generateDropdown = function () {
        return (React.createElement("ul", null, suggestions.map(function (item1, index) {
            var classes = classNames({ "active-index": index === indexCode });
            var item = item1;
            return (React.createElement("div", { className: classes }, renderPerform ?
                React.createElement("li", { onClick: function (e) {
                        handleSelect(primaryKey ? item[primaryKey] : item.value);
                    } }, renderPerform(item)) :
                React.createElement("li", { key: index, onClick: function () { return handleSelect(primaryKey ? item[primaryKey] : item.value); } }, item.value)));
        })));
    };
    return (React.createElement("div", { className: "viking-auto-complete", ref: componentDiv },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        (suggestions.length > 0) && generateDropdown()));
};
