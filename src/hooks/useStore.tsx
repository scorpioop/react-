import React,{ useReducer } from "react";
import Schema, { RuleItem, ValidateError } from 'async-validator';
import { mapValues } from "lodash";
import { Rules } from "../components/Form/FormItem";
export interface FieldProps {
  name:string,
  value?:any,
  rules?:RuleItem[],
  isValid?:boolean,
  label?:string,
  err?:ValidateError[]
}

export interface FormProps {
  isValid?:boolean,
  isSubmitting?:boolean,
  errors:Record<string,any>
}
export type StoreProps ={
  field:{
    [key:string]:FieldProps
  },
  form:FormProps
}
export type actionProps = {
  type:"addField"|"changeValue"|"updateItemValidate"|"formSubmitStatus"|"formValid",
  name?:string,
  value:any
}
const reducer=(state:StoreProps,action:actionProps):StoreProps=>{
  let action1 = action as Rules<actionProps,"name">
  switch(action.type ){
    case "addField":
      
      return {...state,field:{...state.field,[action1.name]:{...action.value}}}
    case "changeValue":
      let temp = state.field[action1.name]
      return {...state,field:{...state.field,[action1.name]:{...temp,value:action.value}}}
    case "updateItemValidate":
      let temp1 = state.field[action1.name]
      return {...state,field:{...state.field,[action1.name]:{...temp1,isValid:action.value.isValid,err:action.value?.err}}}
    case "formSubmitStatus":
      let temp2 = state.form
      return {...state,form:{...temp2,isSubmitting:action.value.isSubmitting}}
    case "formValid":
      let temp3 = state.form
      return {...state,form:{...temp3,isValid:action.value.isValid,errors:action.value.errors}}
    default:
      return state
  }
}
const useStore = () =>{
  const initalStore = {field:{},form:{isValid:true,isSubmitting:false,errors:{}}} as StoreProps
  const [store,dispatch] = useReducer(reducer,initalStore)
  const getFieldValue = (key: string) => {
    return store.field[key] && store.field[key].value
  }
  const getFieldsValue = () => {
    return mapValues(store.field, item => item.value)
  }
  const setFieldValue = (name: string, value: any) => {
    if (store.field[name]) {
      dispatch({ type: "changeValue", name, value })
    }
  }
  // const resetFields = () => {
  //   if (initialValues) {
  //     each(initialValues, (value, name) => {
  //       if (fields[name]) {
  //         dispatch({ type: 'updateValue', name, value})
  //       }
  //     })
  //   }
  // }
  const checkValid = async(name:string) =>{
    
    const descriptor = {[name]:store.field[name].rules as RuleItem}
    const validator = new Schema(descriptor);
    const value = store.field[name].value
    try {
      await validator.validate({[name]:value})
      dispatch({type:"updateItemValidate",name:name,value:{isValid:true,err:null}})
    } catch (error) {
      console.log((error as any).errors);
      
      dispatch({type:"updateItemValidate",name:name,value:{isValid:false,err:(error as any).errors}})
      
    }
  }
  const checkFormValid = async() =>{
    dispatch({type:"formSubmitStatus",value:{isSubmitting:true}})
    const allValues = mapValues(store.field,function(o){return o.value})
    const allRules = mapValues(store.field,function(o){return o.rules})
    const validator = new Schema(allRules as Record<string,RuleItem[]>);
    let allErrors = {}
    let valid=true
    try {
      await validator.validate(allValues)
      dispatch({type:"formSubmitStatus",value:{isSubmitting:false}})
      dispatch({type:"formValid",value:{isValid:true,errors:{}}})
    } catch (error) {
      dispatch({type:"formSubmitStatus",value:{isSubmitting:false}})
      dispatch({type:"formValid",value:{isValid:false,errors:(error as any).fields}})
      // console.log((error as any).fields);

      allErrors={...(error as any).fields}
      valid=false
    }finally{
      return {allValues,allErrors,valid}
    }
  }
  return {store,dispatch,checkValid,checkFormValid,getFieldValue,getFieldsValue,setFieldValue}
}

export default useStore