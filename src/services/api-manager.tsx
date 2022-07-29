import { axiosInstance } from './axiosInstance';
import { handleError, handleResponse } from './api-response';


const ApiService = {

    getAll: function (resource: string, params?: any) {
        return axiosInstance
            .get(resource, { params })
            .then(handleResponse)
            .catch(handleError);
    },
    getSingle: function (resource: any, id: any) {
        return axiosInstance
            .get(`{resource}/${id}`)
            .then(handleResponse)
            .catch(handleError);
    },
    post: function (resource: any, model: any) {
        return axiosInstance
            .post(resource, model)
            .then(handleResponse)
            .catch(handleError);
    },
    put: function (resource: any, model: any) {
        return axiosInstance
            .put(resource, model)
            .then(handleResponse)
            .catch(handleError);
    },
    delete: function (resource: string, params?: any) {
        return axiosInstance
            .delete(resource, { params })
            .then(handleResponse)
            .catch(handleError);
    },
    deleteSingle: function (resource: any, id: any) {
        return axiosInstance
            .delete(`{resource}/${id}`)
            .then(handleResponse)
            .catch(handleError);
    },
}

export default ApiService;