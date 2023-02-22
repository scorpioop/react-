import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../icon/Icon";

export interface Inputprops extends Omit<React.InputHTMLAttributes<HTMLInputElement>,"size">{
  disable?:boolean,
  icon?:IconProp,
  propand?: React.ReactNode,
  append?: React.ReactNode,
  style?: React.CSSProperties
}

export const Input:React.FC<Inputprops> =(props)=>{
  const {disable,icon,propand,append,style,...restProps} = props
  const classes = classNames('input-container',)
  const inputClasses = classNames({
    "radis":!propand && !append,
    "left-redis":!propand && append,
    "right-radis":propand&& !append
  })
  return(
    <div className={classes} style={style}>
      {propand?<div className="propand">{propand}</div>:null}
    <div className="all-input" >
    <input disabled={disable} className={inputClasses} {...restProps}/>
    <span className="input-icon">{icon?<Icon icon={icon} theme="primary"/>:null}</span>
    </div>
      {append ? <div className="append" >{ append }</div> : null}
    </div>
    
  )
}

export default Input