import React,{useContext, useState} from "react"
import classNames from "classnames"
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import { useRequest } from "ahooks";
import Icon from "../icon/Icon";
import Transition from "../transition/transition";


export interface SubMenuProps{
  className?:string;
  style?:React.CSSProperties;
  index?:string;
  disable?:boolean;
  children?:React.ReactNode;
  title:string;
}

export const SubMenu:React.FC<SubMenuProps>=(props)=>{
  const {activeIndex,onSelect,mode,defaultOpenSubMenus}=useContext(MenuContext)
  const {className, style,index,disable,children,title} = props
  const defaultOpen = defaultOpenSubMenus.indexOf(index as string)!==-1 && mode==="vertical"
  const [ifOpen, setIfOpen] = useState(defaultOpen)
  const classes = classNames('sub-menu', className,{
    "menuitem-disable":disable,
    "menuitem-active":index===activeIndex,
    "ifOpen":ifOpen
  })
  const generateChild = ()=>{
    let temp = React.Children.map(children, (child, index1) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      
      if (displayName === "MenuItem") {
        return React.cloneElement(childElement,{index:childElement.props?.index?childElement.props?.index:index+"-"+index1.toString()});
      } else {
        console.error(
          `Warning: SubMenu has a child which is not a MenuItem component`
        );
      }
    });
    return temp
  }
  const sub_classes = classNames("submenu-ul")
  const handleClick=(e:React.MouseEvent)=>{
    e.preventDefault()
    setIfOpen(!ifOpen)
  }
  const handleMouse = (e:React.MouseEvent,troop:boolean)=>{
    e.preventDefault()
    setIfOpen(troop)

    
    return new Promise(reslove=>{
      reslove(null)
    })

  }
  const { data,  run } = useRequest(handleMouse, {
    throttleWait: 800,
    manual: true,
  });
  const hoverFuc=mode==="horizontal"?{
    onMouseEnter:(e :React.MouseEvent)=>run(e,true),
    onMouseLeave:(e:React.MouseEvent)=>run(e,false),
  }:{}
  const clickFuc = mode ==="vertical"?{
    onClick:(e:React.MouseEvent)=>handleClick(e)
  }:{}
  return(
    <li key={index} className = {classes} {...hoverFuc}>
      <div className="submenu-title menuItem" {...clickFuc}>{title}
        <span className="icon">
        <Icon icon="angle-down"/>
        </span>
      </div>
      <Transition in={ifOpen} timeout={500} >
      <ul className={sub_classes}>{generateChild()}</ul>
      </Transition>
    </li>
  )

}
SubMenu.displayName="SubMenu"

export default SubMenu