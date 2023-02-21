import React,{useContext} from "react"
import classNames from "classnames"
import { MenuContext } from "./menu";

export interface MenuItemProps{
  className?:string;
  style?:React.CSSProperties;
  index?:string;
  disable?:boolean;
  children?:React.ReactNode
}
export const MenuItem:React.FC<MenuItemProps>=(props)=>{
  const {activeIndex,onSelect}=useContext(MenuContext)
  const {className, style, index, disable, children} = props
 
  
  const classnames = classNames("menuItem",className,{
    "menuitem-disable":disable,
    "menuitem-active":index===activeIndex
  })
  const handleClick=()=>{
    if(onSelect && !disable && typeof(index)==="string") onSelect(index)
  }
  return(
    <li className={classnames} key={index} style={style} onClick={handleClick}>{children}</li>
  )
}
MenuItem.displayName="MenuItem"

export default MenuItem