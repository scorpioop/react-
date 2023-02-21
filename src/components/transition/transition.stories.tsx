import React from "react";
import { ComponentMeta,ComponentStory } from "@storybook/react";
import Transition from "./transition";
import Button from "../button/button";

const TransitionMeta : ComponentMeta<typeof Transition> = {
  title:"Transition",
  component: Transition
}

export default TransitionMeta

const Template:ComponentStory<typeof Transition> = (args) => {
  return(
    <Transition {...args}/>
  )
}

export const Default = Template.bind({})
Default.args={
  in:true,
  children:(<div>
    <div>你好</div>
    <div>Welcome to this page</div>
  </div>),
  timeout:300
}
export const Wrapper = Template.bind({})
Wrapper.args={
  in:true,
  children:(<div>
    <Button>click</Button>
  </div>),
  timeout:300,
  wrapper:true
}