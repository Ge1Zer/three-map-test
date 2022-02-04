import axios from "axios";

let auth = axios.create({
    baseURL: '/auth',
});



const api = {
    loginization: async  (data)=> auth.post('/login', data).then(data=>data.data),
    refresh: async (data)=>auth.post('/refresh', data).then(data=>data)
}
export default api;