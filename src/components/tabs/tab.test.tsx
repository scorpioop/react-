import React from "react"
import { fireEvent, render, RenderResult } from "@testing-library/react"
import Tabs from "./tabs"
import TabItem from "./tabItem"
import { TabsProps } from "./tabs"

const tabProps:TabsProps={
  onSelect:jest.fn(),
  defaultIndex:"1"
}
const createStyleFile = () =>{
  const cssFile:string = `
  .tab-item.tabContext-notshow{
  
    display: none!important;
  
}
.each-label.disable{
  pointer-events: none;
  cursor:default
}

`
  const style =document.createElement("style")
  style.type="text/css"
  style.innerHTML=cssFile
  return style
}
let view:RenderResult, labels:HTMLElement,content:HTMLElement
describe("tab test",()=>{
  beforeEach(()=>{
    view = render(
      <Tabs defaultIndex={tabProps.defaultIndex} onSelect={tabProps.onSelect}>
      <TabItem label={"体育"} className="hello">12</TabItem>
      <TabItem label={"语文"}>34</TabItem>
      <TabItem label={"英语"} disable>56</TabItem>  
    </Tabs>
    )
    view.container.append(createStyleFile())
    labels=view.getByTestId("test-label")
    // content = view.getByTestId("test-tabitem")
  })
  it("show all tabs' labels and show the active page content",()=>{
    expect(labels.querySelectorAll('.each-label').length).toEqual(3)
    expect(view.queryByText("12")).not.toBeVisible()
    expect(view.queryByText("34")).toBeVisible()
    expect(view.getByText("体育")).toHaveClass("each-label")
    expect(view.getByText("语文")).toHaveClass("each-label active")
    expect(view.getByText("12")).toHaveClass("hello")
  })
  it("click the tab label change the page",()=>{
    fireEvent.click(view.getByText("体育"))
    expect(tabProps.onSelect).toBeCalledWith("0")
    expect(view.getByText("体育")).toHaveClass("each-label active")
    expect(view.getByText("语文")).not.toHaveClass("active")
    expect(view.queryByText("12")).toBeVisible()
    expect(view.queryByText("34")).not.toBeVisible()

  })
  it("disable tag cannot be clicked",()=>{
    expect(view.getByText("英语")).toHaveClass("disable")
    fireEvent.click(view.getByText("英语"))
    expect(tabProps.onSelect).not.toBeCalled()
    
  })
})