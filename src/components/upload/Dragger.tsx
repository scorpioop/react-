import React,{useState} from "react";
import Icon from "../icon/Icon";
import classNames from "classnames";

export interface DraggerProps {
  onFile:(files:FileList)=>void
}

const Dragger:React.FC<DraggerProps>=(props)=>{
  const {onFile}=props
  const [dragIn,setDragIn]=useState(false)
  const classes = classNames("drag-block" ,{
    "drag-in":dragIn
  })
  const handleDragIn=(e:React.DragEvent)=>{
    e.preventDefault()
    setDragIn(true)
    
  }
  const handleDragLeave=(e:React.DragEvent)=>{
    e.preventDefault()
    setDragIn(false)
    
  }
  const handleDrop=(e:React.DragEvent)=>{
    e.preventDefault()
    setDragIn(false)
    onFile(e.dataTransfer.files)
    
  }
  return(
    <div className={classes} onDragOver={e=>handleDragIn(e)}
    onDragLeave={e=>handleDragLeave(e)}
    onDrop={e=>handleDrop(e)}
    
    >
      <div>
      <Icon icon="upload" style={{fontSize:"3rem"}}/>
      <div>please drag file which you want to upload here</div>
      </div>

    </div>
  )
}

export default Dragger