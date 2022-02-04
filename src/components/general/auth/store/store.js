import {LOG_IN, LOG_OUT, GETTING_AUTH_ERRORS, AUTH_STATUS_IS_LOADING, CHANGE_LOGIN_PASS} from "./action";

let initState = {
    login: "",
    pass: "",
    auth: false,
    isLoading: false,
    errorsAuth: [],
    userInfo: {},
}

const authStore = (state = initState, action)=>{

    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                auth: true,
                userInfo: {...action.payload.user.userInfo}
            }
        case LOG_OUT:
            return {
                login: "",
                pass: "",
                auth: false,
                role: "user",
                isLoading: false,
                errorsAuth: []
            }
        case CHANGE_LOGIN_PASS:
            const field = action.payload.field
            const value = action.payload.value
            return{
                ...state,
                [field]: value
            }
        case GETTING_AUTH_ERRORS:
            return {
                ...state,
                errorsAuth: [...state.errorsAuth, {message:action.payload.message}]
            }
        case AUTH_STATUS_IS_LOADING:
            return{
                ...state,
                isLoading: action.payload
            }
        default:

            return state
    }
}
export default authStore;