import React, { useRef } from "react"
import { ComponentMeta,ComponentStory } from "@storybook/react";
import Input from "../input/input";
import { action } from "@storybook/addon-actions";
import Form from "./Form";
import FormItem from "./FormItem";
import Button from "../button/button";
import { RefProps } from "./Form";

const FormMeta={
  title:"Form",
  component:Form
}
export default FormMeta

export const Default = () => {
  return(
    <Form>
      <FormItem name="name" label="name">
        <Input/>
      </FormItem>
      <FormItem name="password"label="password">
        <Input type="password"/>
      </FormItem>
      <FormItem name="check" valuePropName='checked' getValueFromEvent={(e) => e.target.checked}>
        
        
        <Input type="checkbox"/>
        <span className="agree-text" style={{marginLeft:"0.5rem"}}>注册即代表你同意<a href='#'>用户协议</a></span>
        
      </FormItem>
      
    </Form>
  )
}
export const FormWithInitialValue = () => {
  return(
    <Form initialValue={{ name: 'viking', check: true }}>
      <FormItem name="name" label="name">
        <Input/>
      </FormItem>
      <FormItem name="password"label="password">
        <Input type="password"/>
      </FormItem>
      <FormItem name="check" valuePropName='checked' getValueFromEvent={(e) => e.target.checked}>
        
        
        <Input type="checkbox"/>
        <span className="agree-text" style={{marginLeft:"0.5rem"}}>注册即代表你同意<a href='#'>用户协议</a></span>
        
      </FormItem>
      
    </Form>
  )
}
export const WithCheck = () => {
  const ref=useRef<RefProps>(null)
  const clickBtn=()=>{
    console.log(ref.current?.getFieldsValue());
    
  }
  return(
    <Form onFinish={()=>{alert("success")}} ref={ref}>
      <FormItem name="name" label="name" rules={[{ type: 'email', required: true }]}>
        <Input/>
      </FormItem>
      <FormItem name="password"label="password" rules={[{type: 'string', required: true, min: 3, max: 8 }]}>
        <Input type="password"/>
      </FormItem>
      <FormItem name="check" valuePropName='checked' getValueFromEvent={(e) => e.target.checked}>
        
        
        <Input type="checkbox"/>
        <span className="agree-text" style={{marginLeft:"0.5rem"}}>注册即代表你同意<a href='#'>用户协议</a></span>
        
      </FormItem>
      <div>
        <Button type="submit" btnType="primary">登录</Button>
        <Button type="button" onClick={clickBtn}>click</Button>
      </div>
    </Form>
  )
}