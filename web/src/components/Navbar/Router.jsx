import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from './../home/Home.jsx'
import Login from './../login/Login.jsx'
import Signup from './../signup/Signup.jsx'
import Dashboard from './../dashboard/Dashboard.jsx'
import ForgetPw from './../forgetPw/ForgetPassS1'
import Admin from '../admin/admin'
import AdminDashboard from '../admin/adminDashboard'
import { useGlobalState } from '../../context/globalContext'
function RoutesConfig() {
    const globalState = useGlobalState()

    return (
        <div>
            <Router>
                {globalState.loginStatus === false ?
                    <div>
                        <Switch>
                            <Route exact path="/" component={Signup} />
                            <Route path="/login" component={Login} />
                            <Route path="/admin" component={Admin} />
                            <Route path="/forgetpw" component={ForgetPw} />
                            <Route path="*" />
                            <Redirect to="/" />
                            <Route />
                        </Switch>
                    </div> : null}

                {globalState.roll === "user" && globalState.loginStatus === true ?
                    <>
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/home" component={Home} />
                        <Route path="*" />
                        <Redirect to="/" />
                        <Route />
                    </> : null
                }
                {globalState.roll === "admin" && globalState.loginStatus === true ?
                    <>
                        <Route exact path="/" component={AdminDashboard} />
                        <Route path="*" />
                        <Redirect to="/" />
                        <Route />
                    </> : null
                }
            </Router>
        </div>
    );
}
export default RoutesConfig