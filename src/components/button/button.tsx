import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import classNames from "classnames"


export enum ButtonSize{
  Large="lg",
  Small="sm"
}
export type ButtonType ="primary"|"default"|"danger"|"link"

interface BaseButtonProps{
  className?:string,
  /**
   * 是否禁用
   */
  disable?:boolean,
  /**
   * 设置大小
   */
  size?:"lg"|"sm", 
  /**
   * 设置模式
   */
  btnType?:ButtonType,
  href?:string,
  children?:React.ReactNode,
  
}
export type ButtonProps=Partial<ButtonHTMLAttributes<HTMLElement> & AnchorHTMLAttributes<HTMLElement> > &  BaseButtonProps
/**
 * 按钮组件，可以设置多种模式<br/>
 * 引入方式：
 * `import{ Button} from "simonsay"`
 */
export const Button:React.FC<ButtonProps >=(props)=>{
  const {className,disable, size, btnType, children,href, ...restProps} = props
  
  
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disable
  })

  if(btnType==="link"){
    return(
      <a className={classes} href={href} {...restProps}>{children}</a>
    )
  }
  else return(
    <button className={classes} disabled={disable} {...restProps}>{children}</button>
  )
}
Button.defaultProps={
  btnType:"default",
  disable:false,
  children:"press content"
}
export default Button