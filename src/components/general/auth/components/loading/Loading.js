import React from "react";

import load from '../../style/icon/loading.gif'

const Loading = () =>{
    return(
        <div className={'loading__container'}>
            <div className={'loading__content'}>
                <img src={load} alt={'Загрузка'}/>
                <p>Загрузка</p>
            </div>
        </div>
    )
}
export default Loading