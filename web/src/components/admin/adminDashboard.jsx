import React, { useState } from "react";
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import {useHistory} from "react-router-dom"
import { useGlobalState,useGlobalStateUpdate} from '../../context/globalContext'
function AdminDashboard() {
    const globalState = useGlobalState()
    const globalStateUpdate = useGlobalStateUpdate()
    let history = useHistory()
    function logout() {
        axios({
            method: 'post',
            url: 'http://localhost:5000/logout',
            withCredentials: true
        }).then((response) => {
            console.log(response)
            globalStateUpdate(prev =>({
                ...prev,
                loginStatus:false
            }))
            history.push("/login")
            
        }, (error) => {
            console.log(error);
        });
    }
    return (
        <div>
            <Navbar logout={logout}/>
            <div className='bg-primary py-2'>
                <div className="container">
                    <h2 className="mr-4 text-white">Welcome admin</h2>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard