import React, { useState } from 'react';
import Menu from './components/menu/menu';
import SubMenu from './components/menu/submenu';
import MenuItem from './components/menu/menuItem';

import Icon from './components/icon/Icon';
import Transition from './components/transition/transition';
import Button from './components/button/button';
import Alert from './components/alert/alert';
import Input from './components/input/input';
import {library} from "@fortawesome/fontawesome-svg-core"
import {fas} from "@fortawesome/free-solid-svg-icons"
library.add(fas)


function App() {
  const [show, setShow]=useState(false)
  return (
    <div className="App" >
      {/* <Button onClick={()=>{setShow(true)}}>click</Button>
      
        <Alert open={show} onClose={()=>{setShow(false)}}>你好</Alert>
      
      <Menu mode="vertical">
        <MenuItem  disable={true}>disable</MenuItem>
        <MenuItem >active</MenuItem>
        <MenuItem >123</MenuItem>
        <SubMenu title="subMenu">
          <MenuItem>sub1</MenuItem>
          <MenuItem>sub1</MenuItem>
          <MenuItem>sub1</MenuItem>
          <MenuItem>sub1</MenuItem>
        </SubMenu>
        <SubMenu title="subMenu2">
          <MenuItem>sub2</MenuItem>
        </SubMenu>
      </Menu> */}
      <div>sajdksda</div>
      <Input append={<>.com</>} placeholder="请输入" propand={"http//:"} style={{margin:"20px"}} icon="coffee"
      />
    </div>
  );
}

export default App;
