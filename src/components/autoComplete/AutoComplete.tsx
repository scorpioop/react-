
import React, { FC, useState, ChangeEvent, useRef, useEffect } from 'react'
import Input, { Inputprops } from '../input/input'
import useDebounce from '../../hooks/useDebouce';
import classNames from 'classnames';
import useClickOut from '../../hooks/useClickOut';

type oneValueData = { value:string}
export type ItemData<T={}> = T & oneValueData;
export interface AutoCompleteProps extends Omit<Inputprops, 'onSelect'> {
  fetchSuggestions: (str: string) => ItemData[]| Promise<ItemData[]>;
  onSelect?: (item: string) => void;
  renderPerform?:(item:ItemData)=>React.ReactNode,
  primaryKey?:string,
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderPerform,
    primaryKey,
    ...restProps
  } = props
  
  const [ inputValue, setInputValue ] = useState<string>(value as string)
  const [ suggestions, setSugestions ] = useState<ItemData[]>([])
  const [indexCode,setIndexCode] = useState(0)
  const componentDiv = useRef<HTMLDivElement>(null)
  useClickOut(componentDiv,()=>{
    setSugestions([])
  })
  const debounce=useDebounce(function(){
    if (inputValue) {
      const results = fetchSuggestions(inputValue)
      if(results instanceof Promise){
        results.then((result)=>{
          setSugestions(result)
        })
      }else{
        setSugestions(results)
      }
      
    } else {
      setSugestions([])
    }
  },1000)
  useEffect(()=>{
    
    
    debounce()
  },[inputValue])
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    
    
  }
  const handleSelect = (item: string) => {    
    setInputValue(item)
    setSugestions([])
    if (onSelect) {
      onSelect(item)
    }
    setIndexCode(0)
  }
  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) =>{
    switch(e.keyCode){
      case 40:
        if(indexCode<suggestions.length-1) {
          setIndexCode(indexCode+1)}
          break
      case 38:
        if(indexCode!==0) setIndexCode(indexCode-1)
        break
      case 13:
        if(suggestions[indexCode ]) {
          
          if(primaryKey ){
            let temp = suggestions[indexCode] as any
            if(temp[primaryKey]){
              handleSelect(temp[primaryKey])
            }

          }
        }
        break
      case 27:
        setSugestions([])
        setInputValue("")
        setIndexCode(0)
        break
      default:
        break
    }
    

  }
  const generateDropdown = () => {
    
    return (
      <ul>
        {suggestions.map((item1, index) => {
          const classes = classNames({"active-index":index===indexCode})
          let item =item1 as any
          return (
            <div className={classes}>
            {
              renderPerform?
              <li onClick={(e) => {
                
                handleSelect(primaryKey?item[primaryKey]:item.value)
              }
              }>
              {renderPerform(item)}</li>:
              <li key={index} onClick={() => handleSelect(primaryKey?item[primaryKey]:item.value)}>
              {item.value}
              </li>}
          </div>
          )
        })}
      </ul>
    )
  }
  return (
    <div className="viking-auto-complete" ref = {componentDiv}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      { (suggestions.length > 0) && generateDropdown()}
    </div>
  )
}