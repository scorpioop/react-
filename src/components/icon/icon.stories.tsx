import React from "react"
import Icon from "./Icon"
import { ComponentMeta, ComponentStory } from "@storybook/react"

const IconMeta : ComponentMeta<typeof Icon> = {
  title:"Icon",
  component: Icon
}

export default IconMeta

const Template: ComponentStory<typeof Icon> = (args) => {
  return( <Icon {...args}/>)
}

export const Default = Template.bind({})
Default.args = {
  icon: "hand-lizard"
}

Default.decorators = [
  (Story) =>{
    return <div style={{fontSize:"3rem"}}><Story/></div>
  }
]