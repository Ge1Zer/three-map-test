import React, {useEffect, useState} from "react";
import {Redirect, Route, withRouter} from "react-router";
import {connect} from "react-redux";
import {doesTheTokenExist, DoLogInWithToken, DoLogOut, RefreshToken} from "../store/dispath";

const SuperRouter = (props) =>{
    let {
        redirect
    } = props

    let {
        userInfo
    } = props.authStore

    return(
        <>
            {userInfo.roles.indexOf("super") === 0
                    ? <Route {...props} />
                    : <Redirect to={redirect} />}
        </>
    )
}

const mapStateToProps = state =>({
    authStore: state.authStore
})

export default connect(mapStateToProps)(SuperRouter);