import React from "react";
import './style.scss'
import logo from './../../style/icon/logo-agrosignal.svg'


const Login = (props) =>{
    let {
        login,
        pass,
        ChangeLoginPass,
        send,
        errors
    } = props

    const handleKeyPress = (event) => {
        if(event.key === 'Enter' && login && pass){
            send()
        }
    }

    return(
        <div className={"login__container"}>
            <div className={"login__content"}>
                <div className={"login__logo"}>
                    <img
                        src={logo}
                        className={"login__img"}
                     alt={'logo'}/>
                    <div className={"login__title"}>
                        Картирование
                    </div>
                </div>
                <div className={"login__inputs"}>
                    <input
                        className={"login__login login__input_el"}
                        type={"text"}
                        value={login}
                        onChange={(e)=>ChangeLoginPass('login',e.target.value)}
                        placeholder={"Логин"}
                        onKeyPress={handleKeyPress}
                    />
                    <input
                        className={"login__pass login__input_el"}
                        type="password"
                        value={pass}
                        onChange={(e)=>ChangeLoginPass('pass',e.target.value)}
                        placeholder={"Пароль"}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className={"login__submit p-button-rounded"}
                        onClick={()=>send()}
                        disabled={!login ? true : !pass}
                    >Войти</button>
                </div>
                <div className={"login__errors"}>
                    {errors.map((j,i)=><div key={i} className={"login__error"}>{j.message}</div>)}
                </div>
            </div>

        </div>
    )
}
export default Login;