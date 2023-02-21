import React from 'react'
import { action } from '@storybook/addon-actions'
import { AutoComplete, ItemData } from './AutoComplete'
import axios from 'axios';
import { log } from 'console';

export default {
  title:"AutoComplete",
  component:"AutoComplete",
  argTypes:{handleFetch:{description:"筛选方式函数"},
  onSelect:{description:"选择选项所调用的回调"}
}
}
export const SimpleComplete = () => {
  const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
  'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
  const lakersWithNumber = [
    {value: 'bradley', number: 11},
    {value: 'pope', number: 1},
    {value: 'caruso', number: 4},
    {value: 'cook', number: 2},
    {value: 'cousins', number: 15},
    {value: 'james', number: 23},
    {value: 'AD', number: 3},
    {value: 'green', number: 14},
    {value: 'howard', number: 39},
    {value: 'kuzma', number: 0},
  ]
  // const handleFetch = (query: string) => {
  //   return lakers.filter(name => name.includes(query)).map(val=>{
  //     return {value:val}
  //   })
  // }

  // const renderPerform=<T extends {value:string}>(item:T):React.ReactNode=>{
  //   return(
  //     <div style={{backgroundColor:"red"}}>{item.value}</div>
  //   )
  // }
  const handleFetch = (query: string) => {
    return lakersWithNumber.filter(player => player.value.includes(query))
  }
  const renderOption = (item: ItemData):React.ReactNode => {
    let temp=item as ItemData<{value:string,number:number}>
    return (
      <>
        <h2>Name: {temp.value}</h2>
        <p>Number: {temp.number}</p>
      </>
    )
  }
  return (
    <AutoComplete 
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      renderPerform={renderOption}
    />
  )
}


// storiesOf('AutoComplete Component', module)
//   .add('AutoComplete', SimpleComplete)

export const PromiseAuto = () => {
  const handleFetch=(val:string):Promise<ItemData[]>=>{
    return axios.get("https://api.github.com/search/users",
    {
      params:{
        q:val
      }
    }).then(result=>{
      return(result.data.items)
    })
  }
  const renderOption=(item:ItemData)=>{
    const temp=item as ItemData<{login:string,id:number}>

    return(
      <div >
        <h2>{temp.login}</h2>
        <div>{temp.id}</div>
      </div>
    )

  }
  return(
    <AutoComplete 
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      renderPerform={renderOption}
      primaryKey="login"
    />
  )
}