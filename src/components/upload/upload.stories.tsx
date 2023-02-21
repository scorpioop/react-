import React from "react"
import { ComponentMeta,ComponentStory } from "@storybook/react";
import Upload from "./Upload";
import { action } from "@storybook/addon-actions";
import { UploadStateProps } from "./Upload";
import Button from "../button/button";

const UploadMeta = {
  title:"upload",
  component:Upload
}

export default UploadMeta

const Template:ComponentStory<typeof Upload> = (args) =>{
  return(
    <Upload  {...args}>
      <Button>upload file</Button>
    </Upload>
  )
}

export const Default = Template.bind({})
Default.args={
  action:"https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onProcess:action("process"),
  onSuccess:action("success"),
  onFail:action("fail"),
  onBeforeUpload:undefined
}
const before=(file:File)=>{
  console.log(file.name);
  const temp = file.name.split(".")
  if(temp[temp.length-1]==="txt") return true
  
  return false
  
}

export const BeforeHandle = Template.bind({})
BeforeHandle.args={
  action:"https://jsonplaceholder.typicode.com/posts/",
  onProcess:action("process"),
  onSuccess:action("success"),
  onFail:action("fail"),
  onBeforeUpload:before

}
const defaultFileList: UploadStateProps[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]
export const DefaultArrayList = Template.bind({})
DefaultArrayList.args={
  action:"https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onProcess:action("process"),
  onSuccess:action("success"),
  onFail:action("fail"),
  defaultFile:defaultFileList
  
}

export const MultipleProgress = Template.bind({})
MultipleProgress.args={
  action:"https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onProcess:action("process"),
  onSuccess:action("success"),
  onFail:action("fail"),
  accept:".jpg",
  multiple:true
  
}
export const DragProgress = Template.bind({})
DragProgress.args={
  action:"https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onProcess:action("process"),
  onSuccess:action("success"),
  onFail:action("fail"),
  accept:".jpg",
  multiple:true,
  drag:true
  
}