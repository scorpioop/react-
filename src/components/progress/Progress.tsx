import React from "react";
import { ThemeProps } from "../icon/Icon";
import classNames from "classnames";

export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: ThemeProps;
}
const Progress:React.FC<ProgressProps> =(props)=>{
  const {percent,strokeHeight,showText,styles,theme} = props
  const classColors = classNames("progress-percent",{
    [`process-${theme}`]:theme
  })
  return(
    <div className="progress" style={styles}>
      <div className="progress-background">
        <div className={classColors} style={{width:`${percent}%`}} >
        <div className="progress-percent-num">{showText?percent:null}</div>
        </div>
        
      </div>
    </div>
  )
}
Progress.defaultProps={
  strokeHeight: 10,
  showText: true,
  theme: "primary",
}

export default Progress