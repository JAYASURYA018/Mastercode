export function handleResponse(response:any) {
    if (response && response.results) {
        return response.results;
    }

    if (response && response.data) {
        return response.data;
    }
    return response;
}

export function handleError(error:any) {
    if (error && error.data) {
        return error.data;
    }
    return error;
}