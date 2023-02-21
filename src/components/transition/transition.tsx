import React from "react"
import { CSSTransition } from "react-transition-group"
import { CSSTransitionProps } from "react-transition-group/CSSTransition"

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'
type TransitionProps = CSSTransitionProps&{
  animation?:AnimationName,
  /**当内部的子节点含有transition属性时，wrapper需要设置为true */
  wrapper?:boolean,
  children?:React.ReactNode;
}
export const Transition:React.FC<TransitionProps>=(props)=>{
  const {children,animation,classNames,wrapper,...restprops}=props
  return(
    <CSSTransition classNames={classNames?classNames:animation} {...restprops}>
      {wrapper?<div>{children}</div>:children}
    </CSSTransition>
  )
}

Transition.defaultProps={
  unmountOnExit: true,
  appear: true,
  animation:'zoom-in-top'
}

export default Transition