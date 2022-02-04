import helperStorage from "./helperStorage";

const token = () =>{
    let helpStore = helperStorage("GET")
    return helpStore ? helpStore.accessToken : ""
}
export default token