import api from "../api";

export const keyWords = {
    SET_SELECT_FIELD: "SET_SELECT_FIELD",
    FETCH_FULL_LIST_FIELDS : "FETCH_FULL_LIST_FIELDS",
    FIELDS_STATUS_IS_LOADING : "FIELDS_STATUS_IS_LOADING",
    GETTING_FIELDS_ERRORS : "GETTING_FIELDS_ERRORS",
}

//==========================================================================>

const act = {
    fetchFullListFields : (payload)=>({type:keyWords.FETCH_FULL_LIST_FIELDS, payload}),

    fieldsStatusIsLoading : (payload)=>({type:keyWords.FIELDS_STATUS_IS_LOADING, payload}),
    gettingFieldsErrors : (payload)=>({type:keyWords.GETTING_FIELDS_ERRORS, payload}),
  
    setSelectField : (payload)=>({type: keyWords.SET_SELECT_FIELD, payload}),
  
    SetSelectField : (field) => async dispatch =>{
      dispatch(act.setSelectField(field))
    },

    FetchFullListFields: (list = [])=> async dispatch =>{
        dispatch(act.fieldsStatusIsLoading(true))
        try {
            const result = await api.getListGeoZone(list)
            dispatch(act.fetchFullListFields(result))
        }catch(e){
            dispatch(act.gettingFieldsErrors(e))
        }
    }
}

export default act;
