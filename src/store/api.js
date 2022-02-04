import axios from "axios";
import {token, company} from '../components/general/auth/export'

let instance = axios.create({
    // baseURL: '/field',
});

instance.interceptors.request.use(function (config) {
    config.headers.Authorization =  token() ? `Bearer ${token()}` : '';
    config.headers.companyId = company();
    return config;
});



export default {

    getListGeoZone: async (list)=>instance.get(`/fieldTree?_ds=1638266027802&loadDate=2021-11-24T08:15:26.732Z`).then(data=>data.data),
    getListUnits: async ()=> instance.get(`/unitTree?_ds=1638266027802&sort=%5B%7B%22property%22%3A%22leaf%22%2C%22direction%22%3A%22ASC%22%7D%5D&node=`).then(data=>data.data),
    sock: ()=> new WebSocket(`wss://test3.agrosignal.com/data/play?jwt=Bearer%20${token()}&serverId=test3&companyId=2439`)

}



