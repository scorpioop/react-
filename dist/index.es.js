import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import React, { useRef, useEffect, useCallback, useState, useReducer, createContext, forwardRef, useImperativeHandle, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Schema from 'async-validator';
import { mapValues } from 'lodash';
import { useRequest } from 'ahooks';
import axios from 'axios';

const baseSize = 16;
// 设置 rem 函数
function setRem () {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 750;
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px';
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem();
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var ButtonSize;
(function (ButtonSize) {
    ButtonSize["Large"] = "lg";
    ButtonSize["Small"] = "sm";
})(ButtonSize || (ButtonSize = {}));
/**
 * 按钮组件，可以设置多种模式<br/>
 * 引入方式：
 * `import{ Button} from "simonsay"`
 */
var Button = function (props) {
    var _a;
    var className = props.className, disable = props.disable, size = props.size, btnType = props.btnType, children = props.children, href = props.href, restProps = __rest(props, ["className", "disable", "size", "btnType", "children", "href"]);
    var classes = classNames('btn', className, (_a = {},
        _a["btn-".concat(btnType)] = btnType,
        _a["btn-".concat(size)] = size,
        _a['disabled'] = (btnType === 'link') && disable,
        _a));
    if (btnType === "link") {
        return (jsx("a", __assign({ className: classes, href: href }, restProps, { children: children })));
    }
    else
        return (jsx("button", __assign({ className: classes, disabled: disable }, restProps, { children: children })));
};
Button.defaultProps = {
    btnType: "default",
    disable: false,
    children: "press content"
};

var Transition = function (props) {
    var children = props.children, animation = props.animation, classNames = props.classNames, wrapper = props.wrapper, restprops = __rest(props, ["children", "animation", "classNames", "wrapper"]);
    return (jsx(CSSTransition, __assign({ classNames: classNames ? classNames : animation }, restprops, { children: wrapper ? jsx("div", { children: children }) : children })));
};
Transition.defaultProps = {
    unmountOnExit: true,
    appear: true,
    animation: 'zoom-in-top'
};

var Alert = function (props) {
    var _a;
    var type = props.type, title = props.title, content = props.content, closeIcon = props.closeIcon, children = props.children, open = props.open, onClose = props.onClose;
    var classes = classNames("alert", (_a = {},
        _a["alert-".concat(type)] = type,
        _a));
    return (jsx(Transition, __assign({ in: open, timeout: 500 }, { children: jsxs("div", __assign({ className: classes }, { children: [jsxs("div", { children: [title && jsx("div", __assign({ className: "title" }, { children: title })), jsx("div", __assign({ className: "content" }, { children: children ? children : content }))] }), closeIcon && (jsx("div", __assign({ className: "close", onClick: onClose }, { children: "X" })))] })) })));
};
Alert.defaultProps = {
    type: "default",
    closeIcon: true,
};

/**
 * 提供了一套常用的图标集合 基于 react-fontawesome。
 *
 * 支持 react-fontawesome的所有属性 可以在这里查询 https://github.com/FortAwesome/react-fontawesome#basic
 *
 * 支持 fontawesome 所有 free-solid-icons，可以在这里查看所有图标 https://fontawesome.com/icons?d=gallery&s=solid&m=free
 * ### 引用方法
 *
 * ~~~js
 * import { Icon } from 'vikingship'
 * ~~~
 */
var Icon = function (props) {
    var _a;
    // icon-primary
    var className = props.className, theme = props.theme, restProps = __rest(props, ["className", "theme"]);
    var classes = classNames('viking-icon', className, (_a = {},
        _a["icon-".concat(theme)] = theme,
        _a));
    return (jsx(FontAwesomeIcon, __assign({ className: classes }, restProps)));
};

var Input = function (props) {
    var disable = props.disable, icon = props.icon, propand = props.propand, append = props.append, style = props.style, restProps = __rest(props, ["disable", "icon", "propand", "append", "style"]);
    var classes = classNames('input-container');
    var inputClasses = classNames({
        "radis": !propand && !append,
        "left-redis": !propand && append,
        "right-radis": propand && !append
    });
    return (jsxs("div", __assign({ className: classes, style: style }, { children: [propand ? jsx("div", __assign({ className: "propand" }, { children: propand })) : null, jsxs("div", __assign({ className: "all-input" }, { children: [jsx("input", __assign({ disabled: disable, className: inputClasses }, restProps)), jsx("span", __assign({ className: "input-icon" }, { children: icon ? jsx(Icon, { icon: icon, theme: "primary" }) : null }))] })), append ? jsx("div", __assign({ className: "append" }, { children: append })) : null] })));
};

function useDebounce(fn, delay, dep) {
    if (dep === void 0) { dep = []; }
    var current = useRef({ fn: fn, timer: null }).current;
    useEffect(function () {
        current.fn = fn;
    }, [fn]);
    return useCallback(function () {
        var _this = this;
        var __args = arguments;
        if (current.timer) {
            clearTimeout(current.timer);
        }
        current.timer = setTimeout(function () {
            current.fn.apply(_this, __args);
        }, delay);
    }, dep);
}

var useClickOut = function (ref, fn) {
    useEffect(function () {
        var handlers = function (e) {
            console.log(ref.current);
            if (!ref.current || ref.current.contains(e.target)) {
                return;
            }
            fn(e);
        };
        document.addEventListener('click', handlers);
        return function () { document.removeEventListener("click", handlers); };
    }, [ref, fn]);
};

var AutoComplete = function (props) {
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
        }
    };
    var generateDropdown = function () {
        return (jsx("ul", { children: suggestions.map(function (item1, index) {
                var classes = classNames({ "active-index": index === indexCode });
                var item = item1;
                return (jsx("div", __assign({ className: classes }, { children: renderPerform ?
                        jsx("li", __assign({ onClick: function (e) {
                                handleSelect(primaryKey ? item[primaryKey] : item.value);
                            } }, { children: renderPerform(item) })) :
                        jsx("li", __assign({ onClick: function () { return handleSelect(primaryKey ? item[primaryKey] : item.value); } }, { children: item.value }), index) })));
            }) }));
    };
    return (jsxs("div", __assign({ className: "viking-auto-complete", ref: componentDiv }, { children: [jsx(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)), (suggestions.length > 0) && generateDropdown()] })));
};

var reducer = function (state, action) {
    var _a, _b, _c;
    var _d;
    var action1 = action;
    switch (action.type) {
        case "addField":
            return __assign(__assign({}, state), { field: __assign(__assign({}, state.field), (_a = {}, _a[action1.name] = __assign({}, action.value), _a)) });
        case "changeValue":
            var temp = state.field[action1.name];
            return __assign(__assign({}, state), { field: __assign(__assign({}, state.field), (_b = {}, _b[action1.name] = __assign(__assign({}, temp), { value: action.value }), _b)) });
        case "updateItemValidate":
            var temp1 = state.field[action1.name];
            return __assign(__assign({}, state), { field: __assign(__assign({}, state.field), (_c = {}, _c[action1.name] = __assign(__assign({}, temp1), { isValid: action.value.isValid, err: (_d = action.value) === null || _d === void 0 ? void 0 : _d.err }), _c)) });
        case "formSubmitStatus":
            var temp2 = state.form;
            return __assign(__assign({}, state), { form: __assign(__assign({}, temp2), { isSubmitting: action.value.isSubmitting }) });
        case "formValid":
            var temp3 = state.form;
            return __assign(__assign({}, state), { form: __assign(__assign({}, temp3), { isValid: action.value.isValid, errors: action.value.errors }) });
        default:
            return state;
    }
};
var useStore = function () {
    var initalStore = { field: {}, form: { isValid: true, isSubmitting: false, errors: {} } };
    var _a = useReducer(reducer, initalStore), store = _a[0], dispatch = _a[1];
    var getFieldValue = function (key) {
        return store.field[key] && store.field[key].value;
    };
    var getFieldsValue = function () {
        return mapValues(store.field, function (item) { return item.value; });
    };
    var setFieldValue = function (name, value) {
        if (store.field[name]) {
            dispatch({ type: "changeValue", name: name, value: value });
        }
    };
    // const resetFields = () => {
    //   if (initialValues) {
    //     each(initialValues, (value, name) => {
    //       if (fields[name]) {
    //         dispatch({ type: 'updateValue', name, value})
    //       }
    //     })
    //   }
    // }
    var checkValid = function (name) { return __awaiter(void 0, void 0, void 0, function () {
        var descriptor, validator, value, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    descriptor = (_a = {}, _a[name] = store.field[name].rules, _a);
                    validator = new Schema(descriptor);
                    value = store.field[name].value;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validator.validate((_b = {}, _b[name] = value, _b))];
                case 2:
                    _c.sent();
                    dispatch({ type: "updateItemValidate", name: name, value: { isValid: true, err: null } });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    console.log(error_1.errors);
                    dispatch({ type: "updateItemValidate", name: name, value: { isValid: false, err: error_1.errors } });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var checkFormValid = function () { return __awaiter(void 0, void 0, void 0, function () {
        var allValues, allRules, validator, allErrors, valid, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch({ type: "formSubmitStatus", value: { isSubmitting: true } });
                    allValues = mapValues(store.field, function (o) { return o.value; });
                    allRules = mapValues(store.field, function (o) { return o.rules; });
                    validator = new Schema(allRules);
                    allErrors = {};
                    valid = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, validator.validate(allValues)];
                case 2:
                    _a.sent();
                    dispatch({ type: "formSubmitStatus", value: { isSubmitting: false } });
                    dispatch({ type: "formValid", value: { isValid: true, errors: {} } });
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    dispatch({ type: "formSubmitStatus", value: { isSubmitting: false } });
                    dispatch({ type: "formValid", value: { isValid: false, errors: error_2.fields } });
                    // console.log((error as any).fields);
                    allErrors = __assign({}, error_2.fields);
                    valid = false;
                    return [3 /*break*/, 5];
                case 4: return [2 /*return*/, { allValues: allValues, allErrors: allErrors, valid: valid }];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return { store: store, dispatch: dispatch, checkValid: checkValid, checkFormValid: checkFormValid, getFieldValue: getFieldValue, getFieldsValue: getFieldsValue, setFieldValue: setFieldValue };
};

var FormContext = createContext({});
var Form = forwardRef(function (props, ref) {
    var name = props.name, children = props.children, initialValue = props.initialValue, onFinish = props.onFinish, onFinishFailed = props.onFinishFailed;
    var _a = useStore(), store = _a.store, dispatch = _a.dispatch, checkValid = _a.checkValid, checkFormValid = _a.checkFormValid, rest = __rest(_a, ["store", "dispatch", "checkValid", "checkFormValid"]);
    var passValue = {
        dispatch: dispatch,
        store: store,
        initialValue: initialValue,
        checkValid: checkValid,
        checkFormValid: checkFormValid
    };
    useEffect(function () {
    }, []);
    var handleSumbit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, allValues, allErrors, valid;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.stopPropagation();
                    e.preventDefault();
                    return [4 /*yield*/, checkFormValid()];
                case 1:
                    _a = _b.sent(), allValues = _a.allValues, allErrors = _a.allErrors, valid = _a.valid;
                    if (valid && onFinish) {
                        onFinish(allValues);
                    }
                    else if (valid === false && onFinishFailed) {
                        onFinishFailed(allValues, allErrors);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    useImperativeHandle(ref, function () {
        return __assign({}, rest);
    });
    return (jsxs(Fragment, { children: [jsx("form", __assign({ name: name, onSubmit: handleSumbit }, { children: jsx(FormContext.Provider, __assign({ value: passValue }, { children: children })) })), jsx("div", { children: JSON.stringify(store) })] }));
});
Form.defaultProps = {
    name: "form"
};

var FormItem = function (props) {
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
    return (jsxs("div", __assign({ className: "form-item" }, { children: [jsx("div", { children: label && jsx("label", __assign({ title: label }, { children: label })) }), jsxs("div", __assign({ className: classes }, { children: [reChild, (seen && ((_b = store.field[name]) === null || _b === void 0 ? void 0 : _b.err)) && jsx("div", __assign({ className: 'viking-form-item-explain' }, { children: ((_c = store.field[name]) === null || _c === void 0 ? void 0 : _c.err)[0].message }))] })), jsx("div", { children: childList.map(function (val, index) {
                    if (index !== 0) {
                        return val;
                    }
                }) })] })));
};
FormItem.defaultProps = {
    trigger: "onChange",
    valuePropName: "value",
    getValueFromEvent: function (e) {
        return e.target.value;
    },
};

var FormComponent = Form;
FormComponent.formItem = FormItem;

var MenuContext = createContext({ activeIndex: "0", defaultOpenSubMenus: [] });
var Menu = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, mode = props.mode, style = props.style, onSelect = props.onSelect, children = props.children, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var classnames = classNames("menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode === "horizontal"
    });
    var _a = useState(defaultIndex), activeIndex = _a[0], setActiveIndex = _a[1];
    var handleSelect = function (index) {
        setActiveIndex(index);
        if (onSelect)
            onSelect(index);
    };
    var passMessage = {
        activeIndex: activeIndex ? activeIndex : "0",
        onSelect: handleSelect,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus ? defaultOpenSubMenus : [],
    };
    var renderChildren = function () {
        var temp = React.Children.map(children, function (child, index) {
            var _a, _b;
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "MenuItem" || displayName === "SubMenu") {
                return React.cloneElement(childElement, { index: ((_a = childElement.props) === null || _a === void 0 ? void 0 : _a.index) ? (_b = childElement.props) === null || _b === void 0 ? void 0 : _b.index : index.toString() });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
        return temp;
    };
    return (jsx("ul", __assign({ className: classnames, style: style, "data-testid": "menutest" }, { children: jsx(MenuContext.Provider, __assign({ value: passMessage }, { children: renderChildren() })) })));
};
Menu.defaultProps = {
    mode: "horizontal",
    defaultIndex: "0",
    defaultOpenSubMenus: []
};

var MenuItem = function (props) {
    var _a = useContext(MenuContext), activeIndex = _a.activeIndex, onSelect = _a.onSelect;
    var className = props.className, style = props.style, index = props.index, disable = props.disable, children = props.children;
    var classnames = classNames("menuItem", className, {
        "menuitem-disable": disable,
        "menuitem-active": index === activeIndex
    });
    var handleClick = function () {
        if (onSelect && !disable && typeof (index) === "string")
            onSelect(index);
    };
    return (jsx("li", __assign({ className: classnames, style: style, onClick: handleClick }, { children: children }), index));
};
MenuItem.displayName = "MenuItem";

var SubMenu = function (props) {
    var _a = useContext(MenuContext), activeIndex = _a.activeIndex; _a.onSelect; var mode = _a.mode, defaultOpenSubMenus = _a.defaultOpenSubMenus;
    var className = props.className; props.style; var index = props.index, disable = props.disable, children = props.children, title = props.title;
    var defaultOpen = defaultOpenSubMenus.indexOf(index) !== -1 && mode === "vertical";
    var _b = useState(defaultOpen), ifOpen = _b[0], setIfOpen = _b[1];
    var classes = classNames('sub-menu', className, {
        "menuitem-disable": disable,
        "menuitem-active": index === activeIndex,
        "ifOpen": ifOpen
    });
    var generateChild = function () {
        var temp = React.Children.map(children, function (child, index1) {
            var _a, _b;
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "MenuItem") {
                return React.cloneElement(childElement, { index: ((_a = childElement.props) === null || _a === void 0 ? void 0 : _a.index) ? (_b = childElement.props) === null || _b === void 0 ? void 0 : _b.index : index + "-" + index1.toString() });
            }
            else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component");
            }
        });
        return temp;
    };
    var sub_classes = classNames("submenu-ul");
    var handleClick = function (e) {
        e.preventDefault();
        setIfOpen(!ifOpen);
    };
    var handleMouse = function (e, troop) {
        e.preventDefault();
        setIfOpen(troop);
        return new Promise(function (reslove) {
            reslove(null);
        });
    };
    var _c = useRequest(handleMouse, {
        throttleWait: 800,
        manual: true,
    }); _c.data; var run = _c.run;
    var hoverFuc = mode === "horizontal" ? {
        onMouseEnter: function (e) { return run(e, true); },
        onMouseLeave: function (e) { return run(e, false); },
    } : {};
    var clickFuc = mode === "vertical" ? {
        onClick: function (e) { return handleClick(e); }
    } : {};
    return (jsxs("li", __assign({ className: classes }, hoverFuc, { children: [jsxs("div", __assign({ className: "submenu-title menuItem" }, clickFuc, { children: [title, jsx("span", __assign({ className: "icon" }, { children: jsx(Icon, { icon: "angle-down" }) }))] })), jsx(Transition, __assign({ in: ifOpen, timeout: 500 }, { children: jsx("ul", __assign({ className: sub_classes }, { children: generateChild() })) }))] }), index));
};
SubMenu.displayName = "SubMenu";

var menuComponent = Menu;
menuComponent.menuItem = MenuItem;
menuComponent.subMenu = SubMenu;

var Progress = function (props) {
    var _a;
    var percent = props.percent; props.strokeHeight; var showText = props.showText, styles = props.styles, theme = props.theme;
    var classColors = classNames("progress-percent", (_a = {},
        _a["process-".concat(theme)] = theme,
        _a));
    return (jsx("div", __assign({ className: "progress", style: styles }, { children: jsx("div", __assign({ className: "progress-background" }, { children: jsx("div", __assign({ className: classColors, style: { width: "".concat(percent, "%") } }, { children: jsx("div", __assign({ className: "progress-percent-num" }, { children: showText ? percent : null })) })) })) })));
};
Progress.defaultProps = {
    strokeHeight: 10,
    showText: true,
    theme: "primary",
};

var TabContext = createContext({ activeIndex: "0" });
var Tabs = function (_a) {
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
    return (jsx("div", __assign({ className: classes }, { children: jsxs(TabContext.Provider, __assign({ value: passMessage }, { children: [jsx("div", __assign({ className: "tab-label", "data-testid": "test-label" }, { children: lables.map(function (val) {
                        return jsx("div", __assign({ className: each_label(val), onClick: function () { return handleSelect(val[1], val[2]); } }, { children: val[0] }), val[1]);
                    }) })), sonChildren] })) })));
};
Tabs.defaultProps = {
    defaultIndex: "0",
};

var TabItem = function (props) {
    var children = props.children; props.label; var index = props.index, className = props.className, style = props.style;
    var activeIndex = useContext(TabContext).activeIndex;
    var classes = classNames("tab-item", className, {
        "tabContext-notshow": activeIndex !== index,
    });
    return (jsx("div", __assign({ className: classes, style: style, "data-testid": "test-tabitem" }, { children: children })));
};
TabItem.displayName = "TabItem";

var tabsComponent = Tabs;
tabsComponent.TabItem = TabItem;

var FileList = function (props) {
    var defaultFile = props.defaultFile, onRemove = props.onRemove, filesStatusArray = props.filesStatusArray;
    return (jsxs("ul", __assign({ className: "fileList" }, { children: [defaultFile ? defaultFile.map(function (val) {
                return (jsxs(Fragment, { children: [jsxs("li", { children: [jsx("span", __assign({ className: "fileName" }, { children: val.name })), jsxs("span", __assign({ className: "statusIcon" }, { children: [val.status === "uploading" && jsx(Icon, { icon: "spinner", spin: true, theme: "primary" }), val.status === 'success' && jsx(Icon, { icon: "check-circle", theme: "success" }), val.status === 'error' && jsx(Icon, { icon: "times-circle", theme: "danger" })] })), jsx("span", __assign({ className: "removeIcon" }, { children: jsx(Icon, { icon: "times", onClick: function () { onRemove(val); } }) }))] }), jsx(Progress, { percent: val.percent })] }));
            }) : null, filesStatusArray ? filesStatusArray.map(function (val) {
                return (jsxs(Fragment, { children: [jsxs("li", { children: [jsx("span", __assign({ className: "fileName" }, { children: val.name })), jsxs("span", __assign({ className: "statusIcon" }, { children: [(val.status === "uploading" || val.status === "ready") && jsx(Icon, { icon: "spinner", spin: true, theme: "primary" }), val.status === 'success' && jsx(Icon, { icon: "check-circle", theme: "success" }), val.status === 'error' && jsx(Icon, { icon: "times-circle", theme: "danger" })] })), jsx("span", __assign({ className: "removeIcon" }, { children: jsx(Icon, { icon: "times", onClick: function () { onRemove(val); } }) }))] }, val.uid), jsx(Progress, { percent: val.percent })] }));
            }) : null] })));
};

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
    return (jsx("div", __assign({ className: classes, onDragOver: function (e) { return handleDragIn(e); }, onDragLeave: function (e) { return handleDragLeave(e); }, onDrop: function (e) { return handleDrop(e); } }, { children: jsxs("div", { children: [jsx(Icon, { icon: "upload", style: { fontSize: "3rem" } }), jsx("div", { children: "please drag file which you want to upload here" })] }) })));
};

var Upload = function (props) {
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
            return __spreadArray([__file], pre, true);
        });
        axios
            .post(action, dataForm, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / (e.total ? e.total : 100)) || 0;
                if (percentage < 100) {
                    updateFileList(__file, {
                        percent: percentage,
                        status: "uploading",
                    });
                    if (onProcess) {
                        onProcess(percentage, file);
                    }
                }
            },
        })
            .then(function (res) {
            if (onChange)
                onChange(file);
            updateFileList(__file, {
                percent: 100,
                status: "success",
                response: res,
            });
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
            inputNode.current.value = "";
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
    return (jsxs(Fragment, { children: [jsx("div", __assign({ onClick: handleClick, className: "upload-child" }, { children: drag ? jsx(Dragger, { onFile: handleDragger }) : children })), jsx("input", { type: "file", style: { display: "none" }, ref: inputNode, onChange: function (e) {
                    return handleFileSelect(e.target.files);
                }, accept: accept, multiple: multiple }), jsx(FileList, { defaultFile: defaultFiles, onRemove: handleRemove, filesStatusArray: filesStatusArray })] }));
};
Upload.defaultProps = {
    onBeforeUpload: undefined,
    drag: false
};

library.add(fas);

export { Alert, AutoComplete, Button, FormComponent as Form, Icon, Input, menuComponent as Menu, Progress, tabsComponent as Tabs, Transition, Upload };
