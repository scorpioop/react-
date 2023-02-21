import { useEffect } from "react";
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
export default useClickOut;
