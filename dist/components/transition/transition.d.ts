import React from "react";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';
type TransitionProps = CSSTransitionProps & {
    animation?: AnimationName;
    /**当内部的子节点含有transition属性时，wrapper需要设置为true */
    wrapper?: boolean;
    children?: React.ReactNode;
};
export declare const Transition: React.FC<TransitionProps>;
export default Transition;
