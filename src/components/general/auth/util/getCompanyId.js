const company = () =>{
    return localStorage.getItem("companyId") || ""
}
export default company