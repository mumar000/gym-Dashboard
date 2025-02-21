import React from "react";
import { Login } from "./Components/components";
import Routes from "./Components/Routes/Routes";
import { BrowserRouter } from 'react-router-dom'
function App () {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}

export default App