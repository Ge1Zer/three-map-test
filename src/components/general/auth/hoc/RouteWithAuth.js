import React, {useEffect, useState} from "react";
import {Redirect, Route, withRouter} from "react-router";
import {connect} from "react-redux";
import {doesTheTokenExist, DoLogInWithToken, DoLogOut, RefreshToken} from "../store/dispath";


const RouteWithAuth = (props) =>{
    let {
        location,
        history
    } = props
    let {
        auth,
        isLoading
    } = props.authStore

    useEffect(()=>{
        let service = window.location.host.indexOf('localhost:3000'||'cartography')
        props.doesTheTokenExist() && !auth && props.DoLogInWithToken(service >= 0)
    },[])

    useEffect(()=>{
        localStorage.setItem("path",location.pathname)
    },[location.pathname])

    return(
        <>
            {
                auth && !isLoading
                ? <Route {...props} />
                : <Redirect to={'/log'} />
            }
        </>
        )
}

const mapStateToProps = state =>({
    authStore: state.authStore
})
const mapDispatchToProps = dispatch =>({
    RefreshToken: RefreshToken(dispatch),
    doesTheTokenExist: doesTheTokenExist(dispatch),
    DoLogInWithToken:DoLogInWithToken(dispatch)
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(RouteWithAuth));