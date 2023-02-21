import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import Alert from "./alert"

const AlertMeta: ComponentMeta<typeof Alert> = {
  title:"Alert",
  component:Alert
}
export default AlertMeta
const template:ComponentStory<typeof Alert> = (args) => {
  return <Alert {...args}>{args.children}</Alert>
}

export const Default = template.bind({})
Default.args = {
  title:"header",
  children:"default",
  open:true
}