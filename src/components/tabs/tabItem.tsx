import React,{useContext} from "react"
import classNames from "classnames"
import { TabContext } from "./tabs";

export interface TabItemProps{
  index?:string;
  label:string|number;
  disable?:boolean;
  children?: React.ReactNode;
  className?:string;
  style?:React.CSSProperties
  
}

export const TabItem:React.FC<TabItemProps>=(props)=>{
  const {children,label,index,className,style}=props
  const {activeIndex}=useContext(TabContext )
  const classes = classNames("tab-item",className,{
    "tabContext-notshow":activeIndex!==index,
    
  })

  
  return(
    <div className={classes} style={style} data-testid="test-tabitem">
      {/* <div className={classes}>
        {label.toString()}
      </div> */}
      {children}
      </div>
  )
}
TabItem.displayName="TabItem"

export default TabItem