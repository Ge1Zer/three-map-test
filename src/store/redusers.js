import {createStore,applyMiddleware, combineReducers} from 'redux';
import fieldsStore from "./fieldsStore/store";
import unitsStore  from "./unitsStore/store";
import authStore from "../components/general/auth/store/store";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';



export default createStore(
    combineReducers({
            authStore,
            fieldsStore,
            unitsStore
        }
    ),
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);