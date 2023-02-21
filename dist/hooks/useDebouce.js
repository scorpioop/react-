import { useRef, useEffect, useCallback } from "react";
export default function useDebounce(fn, delay, dep) {
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
