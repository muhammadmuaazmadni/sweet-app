import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import '../login/Login.css'
import {useGlobalState,useGlobalStateUpdate} from '../../context/globalContext'
import {
    useHistory
} from "react-router-dom";
function Admin() {
    let url = 'http://localhost:5000'
    let [show, setShow] = useState()
    let history = useHistory()
    const globalState = useGlobalState()
    const setGlobalState = useGlobalStateUpdate()
    function login(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: url + '/adminLogin',
            data: {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            },
            withCredentials: true
        }).then((response) => {
            if (response.data.status === 200) {
                console.log(response.data.message)
                console.log(response.data.user)
                setGlobalState(prev =>({
                    ...prev,
                    loginStatus: true,
                    // user: response.data.user,
                    roll: "admin"
                }))
            }
            else {
                // history.push("/login");
                setShow(response.data.message)
                console.log(response.data.message)

            }
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <div>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-5 form'>
                        <h2 className="text-center">Admin Login</h2><br/>
                        <form onSubmit={login}>
                            <div className="form-col">
                                <div className="col">
                                    <input type="text" className="form-control"
                                        placeholder="Username" required id="email" />
                                </div><br />
                                <div className="col">
                                    <input type="password" className="form-control"
                                        placeholder="Password" required id="password" />
                                </div><br />
                                <div className="col">
                                    <button className='btn btn-primary' type="submit">Login</button>
                                </div><br/>
                                {show?<div className="alert alert-danger" role="alert">
                                    {show}
                                </div>: null}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin