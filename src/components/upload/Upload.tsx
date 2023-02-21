import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import FileList from "./FileList";
import Dragger from "./Dragger";

export interface UploadProps {
  action: string;
  onProcess?: (percentage: number, file: File) => void;
  onSuccess?: (res: any, file: File) => void;
  onFail?: (err: any, file: File) => void;
  onBeforeUpload?: (file: File) => boolean | Promise<File>;
  onChange?: (file: File) => void;
  onRemove?:(file:UploadStateProps)=>void,
  defaultFile?:UploadStateProps[],
  accept?:string,
  multiple?:boolean,
  children?:React.ReactNode,
  drag:boolean,
}
export type fileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadStateProps {
  uid: string;
  size: number;
  name: string;
  status: fileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  err?: any;
  
}
export const Upload: React.FC<UploadProps> = (props) => {
  const { drag,children,action, onProcess, onSuccess, onFail, onBeforeUpload, onChange,onRemove, defaultFile,accept,multiple} =
    props;
  const [filesStatusArray, setFilesStatusArray] = useState<UploadStateProps[]>(
    []
  );
  const [defaultFiles,setDefaultFiles] = useState(defaultFile)
  const inputNode = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (!inputNode.current) return;
    inputNode.current.click();
  };
  // useEffect(()=>{
  //   console.log(filesStatusArray);
    
  // },[filesStatusArray])
  const updateFileList = (fileStatus:UploadStateProps,updateContent:Object)=>{
    setFilesStatusArray((pre)=>{
      let newNeed=pre.map(value=>{
        if(value.uid===fileStatus.uid){
          let temp = {...value,...updateContent}
          return temp
        }
        return value
      })
      return newNeed
    })

  }
  const post = (file: File) => {
    const dataForm = new FormData();
    dataForm.append(file.name, file);
    const __file = {
      uid: Date.now() + "files",
      size: file.size,
      name: file.name,
      status: "ready",
      raw:file,
      percent: 0,
    } as UploadStateProps
    setFilesStatusArray((pre)=>{
      return([__file, ...pre])
    });
    axios
      .post(action, dataForm, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          let percentage =
            Math.round((e.loaded * 100) / (e.total ? e.total : 100)) || 0;
          if (percentage < 100) {
            updateFileList(__file, { percent: percentage, status: "uploading" });
            if (onProcess) {
              onProcess(percentage, file);
            }
          }
        },
      })
      .then((res: any) => {
        if (onChange) onChange(file);
        updateFileList(__file, { percent: 100, status: "success",response:res });
        if (onSuccess) onSuccess(res, file);
      })
      .catch((err) => {
        if (onChange) onChange(file);
        if (onFail) onFail(err, file);
        updateFileList(__file, { percent: 100, status: "error",err:err });
      });
  };
  const uploadFiles = (files: FileList) => {
    let arryFiles = Array.from(files);
    arryFiles.map((file) => {
      if (onBeforeUpload) {
        const temp = onBeforeUpload(file);
        if (temp instanceof Promise) {
          temp.then((res) => {
            post(res);
          });
        } else if (temp) {
          post(file);
        } else if(temp===false){
          alert("fail");
        } else{
          post(file)
        }
      } else {
        post(file);
      }
    });
  };

  const handleFileSelect = (files:FileList) => {
    
    if (!files) return;
    uploadFiles(files);
    if (inputNode.current) {
      inputNode.current.value = ''
    }
  };
  const handleRemove = (fileStatus:UploadStateProps)=>{
    if(defaultFiles){
      let temp = defaultFiles.filter((val)=>{
        return val.uid!==fileStatus.uid
      })
      setDefaultFiles([...temp])
    }
    if(filesStatusArray){
      let temp=filesStatusArray.filter((val)=>{
        return val.uid!==fileStatus.uid
      })
      setFilesStatusArray([...temp])
    }
    if(onRemove){
      onRemove(fileStatus)
    }
  }
  const handleDragger=(files:FileList)=>{
    handleFileSelect(files)

  }
  return (
    <>
      <div onClick={handleClick} className="upload-child">
        {drag?<Dragger onFile={handleDragger}></Dragger>:children}
      </div>
      <input
        type={"file"}
        style={{ display: "none" }}
        ref={inputNode}
        onChange={(e :React.ChangeEvent<HTMLInputElement>)=>handleFileSelect(e.target.files as FileList)}
        accept={accept}
        multiple={multiple}
      ></input>
      <FileList defaultFile={defaultFiles} onRemove={handleRemove} filesStatusArray={filesStatusArray}/>
    </>
  );
};
Upload.defaultProps = {
  onBeforeUpload: undefined,
};
export default Upload;
