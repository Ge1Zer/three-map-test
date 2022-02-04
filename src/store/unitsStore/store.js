import {keyWords} from "./action";

let initState = {
    unitsList: [],

    unitsPosition: [],

    unitsError:"",
    unitsIsLoading:false,
}

const unitsLayerStore = (state = initState, action)=>{

    switch (action.type) {
        case keyWords.FETCH_UNITS:

            return{
                ...state,
                unitsList:[...action.payload.data],
            }
        case keyWords.FETCH_UNITS_POSITION:
            // let unitPositionList;
            //
            // if(state.unitsPosition.length){
            //     unitPositionList = [...state.unitsPosition, ...action?.payload?.data?.items]
            // }else{
            //     unitPositionList = [...action.payload.data.items]
            // }
            //
            // unitPositionList = unitPositionList.flatMap((element, position, listArray)=>{
            //     let listFilterPosition = listArray.filter(i=>i.id === element.id)
            //     if(listFilterPosition.length>1){
            //         return [listFilterPosition[listFilterPosition.length-1]]
            //     }else{
            //         return [element]
            //     }
            // })

            // let r = unitsPosition.map((element, index, array)=>{
            //     let r = array.filter(j=>j.id === element.id)
            //     return r.reduce((accum, elemReducer)=>{
            //         return {
            //             id: elemReducer.id,
            //             values: {...accum.values, ...elemReducer.values}
            //         }
            //     })
            //
            // })

            return{
                ...state,
                unitsPosition:[...state.unitsPosition, ...action?.payload?.data?.items],
            }

        case keyWords.UNITS_STATUS_IS_LOADING:
            return {
                ...state,
                loadingUnitsGeoZone: action.payload
            }
        case keyWords.GETTING_UNITS_ERRORS:
            return {
                ...state,
                errorsUnitsGeoZone: {...action.payload},
            }
        default:
            return state
    }
}
export default unitsLayerStore;