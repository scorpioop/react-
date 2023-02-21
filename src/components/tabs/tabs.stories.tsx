import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import Tabs from "./tabs"
import TabItem from "./tabItem"

const TabMeta : ComponentMeta<typeof Tabs> = {
  title : "Tab",
  component: Tabs,
  subcomponents:{TabItem}
}

export default TabMeta

const Template : ComponentStory<typeof Tabs> = (args) => {
  return(
    <Tabs {...args}>
      <TabItem label="item1">content1</TabItem>
      <TabItem label="item2">content2</TabItem>
      <TabItem label="item3" disable>content3</TabItem>
    </Tabs>
  )
}
export const Default = Template.bind({})