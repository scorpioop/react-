import React,{useRef,useEffect,useCallback} from "react";
export default function useDebounce(fn:Function, delay:number, dep = []) {
  const { current } = useRef({ fn, timer: null as any});
  useEffect(function () {
    current.fn = fn;
  }, [fn]);
  return useCallback(function (this:any) {
    let __args= arguments
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.apply(this, __args);
    }, delay);
  }, dep)
}
