import React, {useEffect} from 'react'
import Login from "./Login";
import {connect} from "react-redux";
import {ChangeLoginPass, DoLogIn, DoLogOut} from "../../store/dispath";

import LoadingContainer from "../loading/LoadingContainer";
import token from "../../util/getToken";
import {withRouter} from "react-router";


const LoginContainer = (props) =>{
    let {
        history
    } = props
    let {
        login,
        pass,
        errorsAuth,
        auth,
        isLoading
    } = props.authStore

    const send = async () =>{
        await props.DoLogIn(login,pass)
    }

    useEffect(()=>{
        if(auth && token()){
            history.push(localStorage.getItem("path") || '/map')
        }
    },[auth])

    return(
        <>
            {
                isLoading
                ? <LoadingContainer/>
                : <Login
                    login={login}
                    pass={pass}
                    send={send}
                    errors={errorsAuth}
                    ChangeLoginPass={props.ChangeLoginPass}
                />
            }

        </>
    )
}

const mapStateToProps = state =>({
    authStore: state.authStore
})

const mapDispatchToProps = dispatch =>({
    ChangeLoginPass: ChangeLoginPass(dispatch),
    DoLogIn: DoLogIn(dispatch),
    DoLogOut: DoLogOut(dispatch)
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));