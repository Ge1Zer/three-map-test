const helperStorage = (status, value) =>{
    switch (status) {
        case "SET":
            localStorage.setItem("token_data",JSON.stringify(value))
            return JSON.parse(localStorage.getItem("token_data"))
        case "GET":
            return JSON.parse(localStorage.getItem("token_data"))
        case "DEL":
            return localStorage.removeItem("token_data")
    }
}
export default helperStorage;