import {keyWords} from "./action";
import {recursiveMethod} from "../../util/recursive";
import {testSpeed} from "../../util/testSpeed";

let initState = {
  fieldsList: new Map([]),
  selectField: {},
  
  errorsFieldsGeoZone: "",
  loadingFieldsGeoZone: false,
}

const fieldLayerStore = (state = initState, action) => {
  
  switch (action.type) {
    case keyWords.FETCH_FULL_LIST_FIELDS:
      
      let fieldsList = testSpeed(()=>recursiveMethod(action.payload.data, 'data'), "рекурсивное объединения всех вложенных полей в единый список")
      
      return {
        ...state,
        fieldsList,
      }
    case keyWords.SET_SELECT_FIELD:
      
      return {
        ...state,
        selectField: action.payload
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