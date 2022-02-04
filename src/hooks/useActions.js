import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import { allActionCreators } from "../store/action-creators";


export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allActionCreators, dispatch);
}

// хук для вызова actions по названию, сразу, без диспатча. 
// В нем доступны все actions проекта от всех action creators.