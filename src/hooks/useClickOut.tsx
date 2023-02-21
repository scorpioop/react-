import React, { useEffect } from "react"

const useClickOut=(ref:React.RefObject<HTMLElement>,fn:Function)=>{
  useEffect(()=>{
    const handlers=(e:MouseEvent)=>{
      console.log(ref.current);
      if(!ref.current || ref.current.contains(e.target as HTMLElement)){
        return
      }
      fn(e)
    }
    document.addEventListener('click',handlers)
    return()=>{document.removeEventListener("click",handlers)}
  },[ref,fn])

}
export default useClickOut