import api from "../api";

export const keyWords = {
    FETCH_UNITS : "FETCH_UNITS",
    UNITS_STATUS_IS_LOADING : "UNITS_STATUS_IS_LOADING",
    GETTING_UNITS_ERRORS : "GETTING_UNITS_ERRORS",
    FETCH_UNITS_POSITION : "FETCH_UNITS_POSITION"
}

var wsLogin, ws, msgCopy ;
//==========================================================================>

const uni = {
    fetchUnits : (payload)=>({type:keyWords.FETCH_UNITS, payload}),
    fetchPositionUnits : (payload)=>({type:keyWords.FETCH_UNITS_POSITION, payload}),

    unitsStatusIsLoading : (payload)=>({type:keyWords.UNITS_STATUS_IS_LOADING, payload}),
    gettingUnitsErrors : (payload)=>({type:keyWords.GETTING_UNITS_ERRORS, payload}),

    FetchUnits : ()=> async dispatch => {
        try{
            dispatch(uni.unitsStatusIsLoading(true))
            const result = await api.getListUnits()
            result && dispatch(uni.fetchUnits(result))
        }catch(e){
            dispatch(uni.gettingUnitsErrors(e))
        }finally {
            dispatch(uni.unitsStatusIsLoading(false))
        }
    },

    connectFetchStatusUnits: ()=> dispatch => {

        let date1 = new Date();
        let date2 = new Date();

        date2.setHours(date1.getHours());
        ws = api.sock()
        ws.onopen = (event) =>{ console.log('сокет запущен') }
        ws.onerror = (error) =>{ console.log(error) }
        ws.onmessage = (msg) => {
            if(!msgCopy) {
                msgCopy = JSON.parse(msg.data)
                ws.send(JSON.stringify({
                    cid: msgCopy.data.id,
                    data: {
                        archiveFrom: null,
                        cid: msgCopy.data.id,
                        dynamic: [],
                        from: date2.toISOString()
                    },
                    event: "start"
                }))
                ws.send(JSON.stringify({
                    cid: msgCopy.data.id,
                    data: {
                        list: [{entityType: "fieldOp"}]
                    },
                    event: "removeSwitchableCalc"
                }))
                ws.send(JSON.stringify({
                    cid: msgCopy.data.id,
                    data: {
                        list: []
                    },
                    event: "setDynamic"
                }))
            } else {
                msgCopy = JSON.parse(msg.data)
                switch (msgCopy.event) {
                    case "changes" : {
                        dispatch( uni.fetchPositionUnits(msgCopy) )
                    }
                }

            }
        }

    },



    disconnectFetchStatusUnits: ()=> dispatch => {
        if(ws) ws.onclose = () =>{ console.log('socket close') }
    },

    sendChangeStatusUnits: (message)=> dispatch => {
    }

}

export default uni;

//
// dispatch(act.fieldsStatusIsLoading(true))
// try {
//     const result = await api.getListGeoZone(list)
//     dispatch(act.fetchFullListFields(result))
// }catch(e){
//     dispatch(act.gettingFieldsErrors(e))
// }
