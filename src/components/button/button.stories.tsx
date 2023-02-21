import React from "react"
import Button from "./button"
import { ComponentMeta, ComponentStory } from "@storybook/react"

const buttonMeta: ComponentMeta<typeof Button>={
  title:"Button",
  component:Button
}
export default buttonMeta
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Default Button',
} 
Default.storyName = '默认按钮样式'
export const Large = Template.bind({})
Large.args = {
  size: 'lg',
  children: 'Large Button',
}
export const Small = Template.bind({})
Small.args = {
  size: 'sm',
  children: 'Small Button',
}
export const Primary = Template.bind({})
Primary.args = {
  btnType: 'primary',
  children: 'Primary Button',
}
export const Danger = Template.bind({})
Danger.args = {
  btnType: 'danger',
  children: 'Danger Button',
}
export const Link = Template.bind({})
Link.args = {
  btnType: 'link',
  children: 'Link Button',
  href: 'https://google.com'
}

// export const ADefaultBtn: ComponentStory<typeof Button> = (args) => {
//    return(
//    <Button {...args}> default button </Button>
//    )
// }
// ADefaultBtn.storyName="默认按钮"

// export const ButtonWithSize: ComponentStory<typeof Button> = () => (
//   (<>
//     <Button size="lg"> large button </Button>
//     <Button size="sm"> small button </Button>
//   </>)
// )
// ButtonWithSize.storyName = '不同尺寸的按钮'

// export const CButtonWithType = () => (
//   <>
//     <Button btnType="primary"> primary button </Button>
//     <Button btnType="danger"> danger button </Button>
//     <Button btnType="link" href="https://google.com"> link button </Button>
//   </>
// )

// CButtonWithType.storyName = '不同类型的按钮'
