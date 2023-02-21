import React,{createContext,forwardRef,useEffect,useImperativeHandle} from "react";
import useStore from "../../hooks/useStore";
import { ValidateError } from "async-validator";
export interface FormProps{
  name?:string,
  children?:React.ReactNode,
  initialValue?:Record<string,any>,
  onFinish?:(values:Record<string,any>)=>void,
  onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
}
export type IFormContext = Omit<ReturnType<typeof useStore>,"getFieldValue"|"getFieldsValue"|"setFieldValue"> & Pick<FormProps,"initialValue">
export type RefProps =Omit<ReturnType<typeof useStore>,"store"|"dispatch"|"checkValid"|"checkFormValid">
export const FormContext = createContext<IFormContext>({} as IFormContext)
export const Form=forwardRef<RefProps,FormProps>((props,ref)=>{
  const {name,children,initialValue,onFinish,onFinishFailed} = props
  const {store,dispatch,checkValid,checkFormValid,...rest} = useStore()
  const passValue = {
    dispatch,
    store,
    initialValue,
    checkValid,
    checkFormValid
  }
  useEffect(()=>{

  },[])
  const handleSumbit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.stopPropagation()
    e.preventDefault()
    const{allValues,allErrors,valid}=await checkFormValid()
    if(valid && onFinish){
      onFinish(allValues)
    }else if(valid===false && onFinishFailed){
      onFinishFailed(allValues,allErrors)
    }
  }
  useImperativeHandle(ref,()=>{
    return {
      ...rest
    }
  })
  return(
    <>
    <form name={name} onSubmit={handleSumbit}>
      <FormContext.Provider value={passValue}>
      {
      children
    }
      </FormContext.Provider>
      </form>
    <div>{JSON.stringify(store)}</div>
    </>
  )
})
Form.defaultProps={
  name:"form"
}
export default Form