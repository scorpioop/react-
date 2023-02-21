import React from "react";
import { render, cleanup, RenderResult, fireEvent, waitFor } from "@testing-library/react";
import Menu,{MenuProps} from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./submenu";
import { act } from "react-dom/test-utils";



const testProps:MenuProps={
  onSelect:jest.fn(),
  defaultIndex:"1",
  className:"test"
}

const testVerProps:MenuProps={
  onSelect:jest.fn(),
  defaultIndex:"1",
  className:"test",
  mode:"vertical"

}
const testDefaultOpenProps:MenuProps={
  onSelect:jest.fn(),
  defaultIndex:"0",
  className:"test",
  defaultOpenSubMenus:["3"],
  mode:"vertical"
}

const generateMenu=(props:MenuProps)=>{
  const {onSelect, className,mode,defaultIndex,defaultOpenSubMenus}=props
  return(
    <Menu mode={mode} className={className} onSelect={onSelect} defaultIndex={defaultIndex} defaultOpenSubMenus={defaultOpenSubMenus}>
        <MenuItem  disable={true}>disable</MenuItem>
        <MenuItem >active</MenuItem>
        <MenuItem >123</MenuItem>
        <SubMenu title="subMenu">
          <MenuItem>sub1</MenuItem>
        </SubMenu>
        <SubMenu title="subMenu2">
          <MenuItem>sub2</MenuItem>
        </SubMenu>
      </Menu>
  )
}
const createStyleFile = () =>{
  const cssFile:string = `
  .sub-menu .display-none{
    display: none;
  }`
  const style =document.createElement("style")
  style.type="text/css"
  style.innerHTML=cssFile
  return style
}
let view:RenderResult, menuElement:HTMLElement,activeElement:HTMLElement, disableElement:HTMLElement
describe("test menu and menu item work",()=>{
  beforeEach(()=>{

    view = render(generateMenu(testProps))

    view.container.append(createStyleFile())
    menuElement=view.getByTestId("menutest")
    activeElement = view.getByText("active")
    disableElement = view.getByText("disable")

  })
  it("should render correct menu and menu items",()=>{
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    expect(activeElement).toBeInTheDocument()
    expect(activeElement).toHaveClass("menuItem menuitem-active")
    expect(disableElement).toBeInTheDocument()
    expect(disableElement).toHaveClass('menuitem-disable')
    expect(menuElement.querySelectorAll(":scope >li").length).toEqual(5)


  })
  it("click item should change active and induce correct callback",()=>{
    fireEvent.click(view.getByText("123"))
    expect(testProps.onSelect).toBeCalledWith("2")
    expect(view.getByText("123")).toHaveClass('menuItem menuitem-active')
    expect(activeElement).not.toHaveClass('menuitem-active')
    fireEvent.click(disableElement)
    expect(testProps.onSelect).not.toBeCalledWith("1")
    expect(disableElement).not.toHaveClass('menuitem-active')
  })

  it("test Menu and MenuItem component in vertical mode",()=>{
    cleanup()
    const newView =render( generateMenu(testVerProps))
    expect(newView.container.querySelector(".menu")).toHaveClass('menu-vertical')

  })
  it("should show dropdown when hover menu",async()=>{
    expect(view.queryByText('sub1')).toBeNull()
    const dropDown = view.getByText("subMenu")
    
    await act( async () => {
      fireEvent.mouseEnter(dropDown)
     });
     await waitFor(()=>{
      expect(view.queryByText('sub1')).toBeVisible()

    })
    fireEvent.click(view.getByText('sub1'))
    expect(testProps.onSelect).toBeCalledWith("3-0")
    await act(async()=>{
      fireEvent.mouseLeave(dropDown)
    })
    await waitFor(()=>{
      expect(view.queryByText('sub1')).not.toBeNull()
    })  
  })
  it("should show dropdown when click menu on vertical mode",async()=>{
    cleanup()
    const newView =render( generateMenu(testVerProps))
    newView.container.append(createStyleFile())
    expect(newView.queryByText('sub1')).toBeNull()
    const subBtn = newView.getByText('subMenu')

    await act(()=>{
      fireEvent.click(subBtn)
    })
    expect(newView.queryByText('sub1')).toBeVisible()
    fireEvent.click(view.getByText("sub1"))
    expect(testVerProps.onSelect).toBeCalledWith("3-0")
    await act(()=>{
      fireEvent.click(subBtn)
    })
    expect(newView.queryByText('sub1')).toBeVisible()
  })
  it("check defaultOpenSubMenus is useful",()=>{
    cleanup()
    const newView =render( generateMenu(testDefaultOpenProps))
    newView.container.append(createStyleFile())
    expect(newView.queryByText("sub1")).toBeVisible()
    expect(newView.queryByText("sub2")).toBeNull()
  })
})