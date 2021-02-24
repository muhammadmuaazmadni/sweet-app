import React, { useContext } from "react";
import './App.css';
import Route from "./components/Navbar/Router";

import {GlobalStateProvider} from './context/globalContext'
import {useGlobalState,useGlobalStateUpdate} from './context/globalContext'


function App() {
  const globalState = useGlobalState()
  const setGlobalState = useGlobalStateUpdate()
  // const themeStyles = {
  //   backgroundColor: globalState.darkTheme ? "#333" : "#ccc",
  //   color: globalState.darkTheme ? "#ccc" : "#333",
  //   padding: "2rem",
  // }
  // const navStyles = {
  //   display: "inline",
  //   border: globalState.darkTheme ? "1px solid white" : "1px solid black",
  //   padding: "5px",
  //   marginLeft: "5px"
  // }
  console.log(globalState)
  return (
    <div style={{height: "1009px"}}>
      <GlobalStateProvider>
      <Route/>
      </GlobalStateProvider>
    </div>
  );
}

export default App;
