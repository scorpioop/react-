import React, { useState } from 'react';
import Input from './components/input/input';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
function App() {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    return (React.createElement("div", { className: "App" },
        React.createElement("div", null, "sajdksda"),
        React.createElement(Input, { append: React.createElement(React.Fragment, null, ".com"), placeholder: "\u8BF7\u8F93\u5165", propand: "http//:", style: { margin: "20px" }, icon: "coffee" })));
}
export default App;
