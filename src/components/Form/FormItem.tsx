import React, { useCallback, useContext, useEffect, useState } from "react";
import { FormContext } from "./Form";
import Schema, { RuleItem, ValidateError } from "async-validator";
import { FieldProps } from "../../hooks/useStore";
import classNames from "classnames";
export type Rules<T, U extends keyof T> = Required<Pick<T, U>> & Omit<T, U>;
export interface FormItemProps
  extends Pick<FieldProps, "err" | "isValid" | "rules"> {
  label?: string;
  children?: React.ReactNode;
  name: string;
  /**
   * 当input的显示key不是value时可以自定，例如checkbox类型的key为checked
   */
  valuePropName?: string;
  /**
   * 有些input修改时，不是触发onChange，可以自定
   */
  trigger?: string;
  /**
   * input里内容改变后的回调
   */
  getValueFromEvent?: (event: React.ChangeEvent<HTMLInputElement>) => any;
}
export const FormItem: React.FC<FormItemProps> = (props) => {
  const { dispatch, store, initialValue, checkValid } = useContext(FormContext);
  const [seen,setSeen] = useState(false)
  const {
    label,
    children,
    name,
    trigger,
    getValueFromEvent,
    rules,
    isValid,
    err,
    valuePropName,
  } = props as Rules<
    FormItemProps,
    "valuePropName" | "trigger" | "getValueFromEvent"
  >;
  // const [reChild, setReChild] = useState<React.ReactNode>();
  useEffect(() => {
    let temp = "";

    if (initialValue) {
      temp = initialValue[name];
    }
    dispatch({
      type: "addField",
      name,
      value: {
        label,
        name,
        value: temp,
        isValid: isValid ? isValid : true,
        err: err ? err : {},
        rules: rules ? rules : [],
      },
    });
  }, []); //初始更新inputItem名字

  const inputNode: Record<string, any> = {};

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "changeValue",
      name,
      value: getValueFromEvent(e),
    });
  }, []);
  useEffect(()=>{
    let err = store.field[name]?.err
    setSeen(err && err.length > 0 ?true:false)
    
  },[store])

  inputNode[valuePropName] = store.field[name] && store.field[name].value;
  inputNode[trigger] = handleChange;
  inputNode.onBlur = rules && checkValid.bind(null, name);
  const childList = React.Children.toArray(children);
  const child = childList[0] as React.ReactElement;

  const reChild = React.cloneElement(child, {
    ...child.props,
    ...inputNode,
  });
  
  const classes = classNames({
    "input-error":!store.field[name]?.isValid
  })
  return (
    <div className="form-item">
      <div>{label && <label title={label}>{label}</label>}</div>
      <div className={classes}>
        {reChild}
        {(seen && store.field[name]?.err )&& <div className='viking-form-item-explain'>{(store.field[name]?.err as ValidateError[])[0].message}</div> }
        
      </div>
      <div>
        {childList.map((val, index) => {
          if (index !== 0) {
            return val;
          }
        })}
      </div>
    </div>
  );
};
FormItem.defaultProps = {
  trigger: "onChange",
  valuePropName: "value",
  getValueFromEvent: (e) => {
    return e.target.value;
  },
};
export default FormItem;
