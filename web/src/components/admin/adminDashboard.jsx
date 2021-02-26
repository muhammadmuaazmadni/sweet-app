import React, { useEffect, useState } from "react";
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { useHistory } from "react-router-dom"
import { useGlobalState, useGlobalStateUpdate } from '../../context/globalContext'
function AdminDashboard() {
    let [orderData, setOrderData] = useState([])
    const globalStateUpdate = useGlobalStateUpdate()
    let history = useHistory()
    function logout() {
        axios({
            method: 'post',
            url: 'http://localhost:5000/logout',
            withCredentials: true
        }).then((response) => {
            console.log(response)
            globalStateUpdate(prev => ({
                ...prev,
                loginStatus: false,
                role: null
            }))
            history.push("/login")

        }, (error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:5000/getOrders',
            withCredentials: true
        }).then((response) => {
            console.log(response.data.data)
            setOrderData(response.data.data)

        }).catch((err) => {
            console.log(err)
        })
    }, [])
    console.log("Order data", orderData)
    return (
        <div>
            <Navbar logout={logout} />
            <div className='bg-primary py-2'>
                <div className="container">
                    <h2 className="mr-4 text-white">Welcome admin</h2>
                </div>
            </div>
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                        </tr>
                    </thead>
                    {
                       orderData.map((value, index) => {
                            return (
                                <tbody>
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{value.name}</td>
                                        <td>{value.email}</td>
                                        <td>{value.phone}</td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    )
}

export default AdminDashboard