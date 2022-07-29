"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.handleResponse = void 0;
function handleResponse(response) {
    if (response && response.results) {
        return response.results;
    }
    if (response && response.data) {
        return response.data;
    }
    return response;
}
exports.handleResponse = handleResponse;
function handleError(error) {
    if (error && error.data) {
        return error.data;
    }
    return error;
}
exports.handleError = handleError;
//# sourceMappingURL=api-response.js.map