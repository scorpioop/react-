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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
import { useReducer } from "react";
import Schema from 'async-validator';
import { mapValues } from "lodash";
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
export default useStore;
