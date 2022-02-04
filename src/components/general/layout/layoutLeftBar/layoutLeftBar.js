import React from "react";
import LeftBarContainer from "../../../components/leftBar/LeftBarContainer";
import './style.scss';
import {itsHomeUrl} from "../../utils/utils";

const urlR = {

}
const urlL = {

}

const LayoutLeftBar = ({children}) =>{
    return(
        <div className={'layoutleftbar__container'}>
            <div className={'layoutleftbar__content'}>
                <div className={'layoutleftbar__aside'} style={{display: itsHomeUrl("cartography") ? "block" : "none"}}>
                    <LeftBarContainer/>
                </div>
                <div className={'layoutleftbar__main'} style={itsHomeUrl("cartography") ? urlR : urlL}>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default LayoutLeftBar;