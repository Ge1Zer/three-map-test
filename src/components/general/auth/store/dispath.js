import api from "./api";
import {
    doLogIn,
    doLogOut,
    gettingAuthErrors,
    authStatusIsLoading,
    changeLoginPass
} from './action'
import helperStorage from '../util/helperStorage'

var setTime;
let messErrorToken = "Истекло время жизни токена"
let messErrorLogin = "Не правильный логин или пароль"

// отправка пользователя на сервер
export const DoLogIn = dispatch => async (login, pass) =>{
    dispatch(authStatusIsLoading(true))
    try{
        const result = await api.loginization({login: login,password: pass})
        helperStorage("SET",result) && dispatch(doLogIn({user:result}))
        setTimeout(()=>RefreshToken(dispatch)(), new Date(result.expiresIn) - new Date(result.serverTime) - 30000)
    }catch (e) {
        dispatch(gettingAuthErrors({message: messErrorLogin}))
    }finally {
        dispatch(authStatusIsLoading(false))
    }
}
export const DoLogInWithToken = dispatch => async (fullScreen)=>{
    dispatch(authStatusIsLoading(true))
    try {
        let dataToken = helperStorage("GET")
        const result = await api.refresh({token:dataToken.refreshToken, serverId:dataToken.serverId})
        if(result.status === 200){
            helperStorage("SET", result.data) && dispatch(doLogIn({user:result.data}))
            if(fullScreen){
                setTimeout(()=>RefreshToken(dispatch)(), new Date(result.data.expiresIn) - new Date(result.data.serverTime) - 30000)
            }
        }else{
            DoLogOut(dispatch)()
            dispatch(gettingAuthErrors({message: messErrorToken}))
        }
    } catch (e) {
        DoLogOut(dispatch)()
        dispatch(gettingAuthErrors({message: messErrorToken}))
    } finally {
        dispatch(authStatusIsLoading(false))
    }
}

export const RefreshToken = dispatch => async () =>{
    clearTimeout(setTime)
    try {
        let refreshToken = helperStorage("GET")
        const result = await api.refresh({token:refreshToken.refreshToken, serverId:refreshToken.serverId})
        if(result.status === 200){
            helperStorage("SET", result.data)
            setTime = setTimeout(()=>RefreshToken(dispatch)(),new Date(result.data.expiresIn) - new Date(result.data.serverTime) - 30000)
        }else{
            DoLogOut(dispatch)()
            dispatch(gettingAuthErrors({message: messErrorToken}))
        }
    } catch (e) {
        DoLogOut(dispatch)()
        dispatch(gettingAuthErrors({message: messErrorToken}))
    }
}
// ======== работа локально ==============>
//выход
export const DoLogOut = dispatch => () =>{
    helperStorage("DEL")
    clearTimeout(setTime)
    dispatch(doLogOut())
}
export const doesTheTokenExist = dispatch => () =>{
    return !!helperStorage("GET")
}
export const ChangeLoginPass = dispatch => (field, value) =>{
    dispatch(changeLoginPass({field:field, value:value}))
}


