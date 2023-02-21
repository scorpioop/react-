import React, { useEffect,useState } from "react"
import { UploadStateProps } from "./Upload"
import Icon from "../icon/Icon"
import classNames from "classnames"
import Transition from "../transition/transition"
import Progress from "../progress/Progress"

export interface FileListProps {
  defaultFile?:UploadStateProps[],
  onRemove:(file:UploadStateProps)=>void,
  filesStatusArray:UploadStateProps[]
}
const FileList:React.FC<FileListProps> = (props) =>{
  const {defaultFile,onRemove,filesStatusArray} = props
  const ifContain=(item:UploadStateProps,array:UploadStateProps[])=>{
    for(let i=0;i<array.length;i++){
      if(array[i].uid === item.uid){
        return true
      }
    }
    return false
  }
  return(
    <ul className="fileList">
      {defaultFile?defaultFile.map(val=>{
        return(
          
            <>
            <li >
            <span className="fileName">{val.name}</span>
            <span className="statusIcon">
              {
                val.status==="uploading" && <Icon icon="spinner" spin theme="primary" />
              }
              {val.status === 'success' && <Icon icon="check-circle" theme="success" />}
              {val.status === 'error' && <Icon icon="times-circle" theme="danger" />}
            </span>
            <span className="removeIcon">
            <Icon icon="times" onClick={() => { onRemove(val)}}/>
            </span>
          </li>
          <Progress percent={val.percent as number}/>
            </>
          
        )
      }):null}
      {filesStatusArray?filesStatusArray.map(val=>{
        
        return(
          <>
          <li key={val.uid}>
            <span className="fileName">{val.name}</span>
            <span className="statusIcon">
              {
               ( val.status==="uploading" || val.status==="ready") && <Icon icon="spinner" spin theme="primary" />
              }
              {val.status === 'success' && <Icon icon="check-circle" theme="success" />}
              {val.status === 'error' && <Icon icon="times-circle" theme="danger" />}
            </span>
            <span className="removeIcon">
            <Icon icon="times" onClick={() => { onRemove(val)}}/>
            </span>
          </li>
          <Progress percent={val.percent as number}/></>
        )
      }):null}
    </ul>
  )
}

export default FileList