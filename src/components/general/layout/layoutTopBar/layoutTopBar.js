import React from "react";

import './style.scss';
import TopBar from "../../components/topBar/TopBar";
import {DoLogOut} from "../../auth/store/dispath";
import {connect} from "react-redux";
import {itsHomeUrl} from "../../utils/utils";


const urlR = {

}
const urlL = {
    minHeight: "100%"
}


const LayoutTopBar = ({DoLogOut,children}) =>{

    return(
        <div className={'layouttopbar__container'}>
            <div className={'layouttopbar__content'}>
                <div className={'layouttopbar__header'} style={{display: itsHomeUrl("cartography") ? "block" : "none"}}>
                    <TopBar logout={DoLogOut}/>
                </div>
                <div className={'layouttopbar__main'} style={itsHomeUrl("cartography") ? urlR : urlL}>
                    {children}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state =>({})
const mapDispatchToProps = dispatch =>({
    DoLogOut: DoLogOut(dispatch)
})
export default connect(mapStateToProps,mapDispatchToProps)(LayoutTopBar);
