import React,{useState} from 'react'
import { render, fireEvent,screen } from '@testing-library/react'
import Alert from './alert'


const onClose=jest.fn()
describe("test alert component",()=>{
  test("test default alert",()=>{
    let open= true
    const { getByText, container, queryByText }=render(<Alert open={open} onClose={onClose}>alert11</Alert>)
    
    expect(queryByText("alert11")).toBeInTheDocument()
    expect(container.querySelector('.alert')).toHaveClass('alert-default')
    fireEvent.click(container.querySelector('.close') as HTMLButtonElement) 
    expect(onClose).toHaveBeenCalled()
    // expect(queryByText('alert11')).not.toBeInTheDocument()
  })
  test("close the alert",()=>{
    const { getByText, container, queryByText }=render(<Alert open={false} onClose={onClose}>alert11</Alert>)
    expect(queryByText('alert11')).not.toBeInTheDocument()
  })
  test("test alert with different props",()=>{
    const { getByText, container, queryByText }=render(<Alert open={true} title="nihao" type="success">alert11</Alert>)
    expect(container.querySelector(".alert")).toHaveClass("alert-success")
    expect(getByText('nihao')).toBeInTheDocument()
  })

  test("test alert with no closeIcon",()=>{
    const { getByText, container, queryByText }=render(<Alert open={true} title="nihao" type="success" closeIcon={false}>alert11</Alert>)
    expect(container.querySelector('close')).not.toBeInTheDocument()
  })
})