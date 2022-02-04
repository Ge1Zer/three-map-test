import React from "react";
import {Redirect, Route, Switch} from "react-router";
import LoginContainer from "./components/login/LoginContainer";


let AuthContainer = () =>{
    return(
        <>
            <Switch>
                <Redirect exact from={'/log'} to={'/log/login'}  />
                <Route path={'/log/login'}>
                    <LoginContainer />
                </Route>
            </Switch>
        </>
    )
}
export default AuthContainer