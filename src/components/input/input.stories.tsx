import React from "react";
import { ComponentMeta,ComponentStory } from "@storybook/react";
import Input from "./input";

const InputMeta:ComponentMeta<typeof Input> = {
  title:"Input",
  component:Input
}

export default InputMeta

const Template:ComponentStory<typeof Input> = (args) => {
  return(
    <Input placeholder="请输入...." { ...args } />
  )
}

export const Default = Template.bind({})

export const WithIcon = Template.bind({})
WithIcon.args = {
  icon:"coffee"
}
WithIcon.storyName= "带图标的Input"

export const Withpend = Template.bind({})
Withpend.args = {
  propand:"http://",
  append:".com"
}
Withpend.storyName="带后缀和前缀的Input"
