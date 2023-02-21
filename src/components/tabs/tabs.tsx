import React, {  useEffect, useState, createContext } from "react";
import classNames from "classnames";
import { TabItemProps } from "./tabItem";

export interface TabsProps {
  defaultIndex?: string;
  onSelect?: (index: string) => void;
  children?: React.ReactNode;
  // mode?: "tab" | "card";
}
type LabelArray=[string|number,string,boolean]
interface TabContextProps{
  activeIndex:string,
  handleSelect?:(index: string,disable:boolean)=>void
}
export const TabContext= createContext<TabContextProps>({activeIndex:"0"})
export const Tabs: React.FC<TabsProps> = ({
  children,
  onSelect,
  defaultIndex,
  
}) => {
  const classes = classNames("tabs");
  const [lables, setLabels] = useState<LabelArray[]>([]);
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const [sonChildren, setSonChildren] = useState<React.FunctionComponentElement<TabItemProps>[]>()
  const getLable = () => {
    let temp:LabelArray[]=[]
    let temp1=React.Children.map(children, (child, index) => {

      const childElement =
        child as React.FunctionComponentElement<TabItemProps>;
      if(childElement.type.displayName==="TabItem"){
        temp.push([childElement.props.label,
          childElement.props.index?childElement.props.index:index.toString(),
          childElement.props.disable?true:false])
       return(React.cloneElement(childElement,{index:childElement.props.index?childElement.props.index:index.toString()}))
      }else{
        console.error(
          `Warning: Tab has a child which is not a TabItem component`
        );
      }
       
      
    }) as React.FunctionComponentElement<TabItemProps>[]
    
    // let result:LabelArray[]=temp?temp:[]
    setSonChildren(temp1)
    setLabels(temp);
  };
  useEffect(() => {
    getLable();
  }, []);
  const handleSelect=(index:string,disable:boolean)=>{
    if(!disable){
      setActiveIndex(index)
    if(onSelect) onSelect(index)
    }
    
  }
  const passMessage:TabContextProps={
    activeIndex:activeIndex?activeIndex:"0",
    handleSelect,
  }
  const each_label =(val:LabelArray)=> {
    return classNames("each-label", {
    active:activeIndex as string===val[1],
    disable:val[2]
  })
}
  return (
    <div className={classes}>
      <TabContext.Provider value={passMessage}>
      <div className="tab-label" data-testid="test-label">
        {lables.map((val) => {
          
          return <div key={val[1]} className={each_label(val)} onClick={()=>handleSelect(val[1],val[2])}>{val[0]}</div>;
        })}
      </div>
      {sonChildren}
      </TabContext.Provider>
    </div>
  );
};
Tabs.defaultProps = {
  defaultIndex: "0",
};
export default Tabs;
