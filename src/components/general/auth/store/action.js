export const LOG_IN = "LOG_IN"
export const LOG_OUT = "LOG_OUT"
export const GETTING_AUTH_ERRORS = "GETTING_AUTH_ERRORS"
export const AUTH_STATUS_IS_LOADING = "AUTH_STATUS_IS_LOADING"
export const CHANGE_LOGIN_PASS = "CHANGE_LOGIN_PASS"



//==========================================================================>

export const doLogIn = (payload)=>({type:LOG_IN, payload})
export const doLogOut = ()=>({type:LOG_OUT})
export const gettingAuthErrors = (payload)=>({type:GETTING_AUTH_ERRORS, payload})
export const authStatusIsLoading = (payload)=>({type:AUTH_STATUS_IS_LOADING, payload})
export const changeLoginPass = (payload)=>({type:CHANGE_LOGIN_PASS, payload})


