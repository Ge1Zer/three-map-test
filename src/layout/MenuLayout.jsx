import Menu from "../components/menu";
import React from "react";
import './style.scss'


const MenuLayout = ({children}) =>{
    return(
        <div className={'menuLay__container'}>
            <div className={'menuLay__menu'}><Menu/></div>
            <div className={'menuLay__main'}>{children}</div>
        </div>
    )
}
export default MenuLayout