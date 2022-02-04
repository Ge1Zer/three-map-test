import {keyWords} from "./action";
import {recursiveMethod} from "../../util/recursive";

let initState = {
    fieldsList: [],

    errorsFieldsGeoZone:"",
    loadingFieldsGeoZone:false,
}

const fieldLayerStore = (state = initState, action)=>{

    switch (action.type) {
        case keyWords.FETCH_FULL_LIST_FIELDS:
  
          let fields = recursiveMethod(action.payload.data, 'data')
         
            return{
                ...state,
                fieldsList:[...fields],
            }

        case keyWords.FIELDS_STATUS_IS_LOADING:
            return {
                ...state,
                loadingFieldsGeoZone: action.payload
            }
        case keyWords.GETTING_FIELDS_ERRORS:
            return {
                ...state,
                errorsFieldsGeoZone: {...action.payload},
            }
        default:
            return state
    }
}
export default fieldLayerStore;