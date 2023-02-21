import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import Menu from "./menu"
import MenuItem from "./menuItem"
import SubMenu from "./submenu"

const MenuMeta: ComponentMeta<typeof Menu>={
  title:"Menu",
  component:Menu,
  subcomponents:{MenuItem,SubMenu}
}
export default MenuMeta

const Template: ComponentStory<typeof Menu> = (args) => {
  return(
    <Menu {...args}>
      <MenuItem>title 1</MenuItem>
      <MenuItem>title 2</MenuItem>
      <SubMenu title="title 3">
        <MenuItem>sub1</MenuItem>
        <MenuItem>sub2</MenuItem>
      </SubMenu>
      <MenuItem disable>title 4</MenuItem>
      <SubMenu title="title 5">
        <MenuItem>sub3</MenuItem>
      </SubMenu>
    </Menu>
  )
}

export const Default = Template.bind({})
Default.args = {}

export const vertical = Template.bind({})
vertical.args = {
  mode : "vertical",
  defaultIndex : "1",
  defaultOpenSubMenus:["2"],
}
vertical.storyName = "纵向的Menu"
