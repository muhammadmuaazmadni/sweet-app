import React, { useContext, useState, useEffect } from "react";
import axios from 'axios'
const GlobalStateContext = React.createContext()
const GlobalStateUpdateContext = React.createContext()

export const useGlobalState = () => useContext(GlobalStateContext)
export const useGlobalStateUpdate = () => useContext(GlobalStateUpdateContext)

export function GlobalStateProvider({ children }) {
  const [data, setData] = useState({
    user: null,
    loginStatus: false,
    token: null,
    roll: null
  })
  console.log(data)
  useEffect(() => {
    if (data.roll === "user") {
      axios({
        method: "get",
        url: `http://localhost:5000/profile`,
        withCredentials: true
      })
        .then((res) => {
          console.log("context response", res);
          if (res.data.status === 200) {
            setData((prev) => ({
              ...prev,
              user: res.data.profile,
              loginStatus: true,
              roll: "user"
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
    }
    else {
      axios({
        method: "get",
        url: `http://localhost:5000/adminProfile`,
        withCredentials: true
      })
        .then((res) => {
          console.log("context response", res);
          if (res.data.status === 200) {
            setData((prev) => ({
              ...prev,
              user: res.data.profile,
              loginStatus: true,
              roll: "admin"
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
    }
  }, []);

  return (
    <GlobalStateContext.Provider value={data}>
      <GlobalStateUpdateContext.Provider value={setData}>
        {children}
      </GlobalStateUpdateContext.Provider>
    </GlobalStateContext.Provider>
  )
} 