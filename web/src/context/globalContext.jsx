import React, { useContext, useState, useEffect } from "react";
import axios from 'axios'
const GlobalStateContext = React.createContext()
const GlobalStateUpdateContext = React.createContext()

export const useGlobalState = () => useContext(GlobalStateContext)
export const useGlobalStateUpdate = () => useContext(GlobalStateUpdateContext)

export function GlobalStateProvider({ children }) {
  var ourRoll = localStorage.getItem('roll');
  console.log('local storage roll', ourRoll);
  const [data, setData] = useState({
    user: null,
    loginStatus: false,
    token: null,
    roll: null
  })
  console.log(data)

  useEffect(() => {
    console.log('inside global roll', data.roll);
    axios({
      method: "get",
      url: ourRoll === 'user' ? `http://localhost:5000/profile` : 'http://localhost:5000/adminProfile',
      withCredentials: true
    })
      .then((res) => {
        console.log("context response", res);
        if (res.data.status === 200) {
          setData((prev) => ({
            ...prev,
            user: res.data.profile,
            loginStatus: true,
            roll: ourRoll === 'user' ? 'user' : 'admin'
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          setData((prev) => ({ ...prev, loginStatus: false }));
        }
      });
    return () => {
      console.log("cleanup");
    };
  }, [data.roll]);

  return (
    <GlobalStateContext.Provider value={data}>
      <GlobalStateUpdateContext.Provider value={setData}>
        {children}
      </GlobalStateUpdateContext.Provider>
    </GlobalStateContext.Provider>
  )
} 