import axios from "axios";
import appsettings from '../config.json';

/* DO NOT REMOVE */
//function select(state:any) {
//    return state?.oidc?.user?.access_token;
//}

export const axiosInstance = axios.create({
    baseURL: appsettings.AppSettings.WebApiBaseUrl,    
});

axiosInstance.interceptors.request.use(function (config) {
    config.headers = { ...config.headers };
    /* DO NOT REMOVE */
    //let token = select(store.getState())
    //if (token) {
    //    config.headers.Authorization = `Bearer ${token}`;
    //}
    document.body.classList.add('loading-spinner');
    return config;
}, function (error) {
    document.body.classList.remove('loading-spinner');
    return error;
});

axiosInstance.interceptors.response.use(function (response) {
    if (response.status === 401) {
        // your failure logic
    }
    document.body.classList.remove('loading-spinner');
    return response;
}, function (error) {
    document.body.classList.remove('loading-spinner');
    return error;
});