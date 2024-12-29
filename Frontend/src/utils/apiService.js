/**
 * 
 * @description These Type of Services can used when We are Getting Response in Status Code from Server Like (404 , 403 , 201);
 * When the Respose Comes with the Status code Greter then 400 when it shows the error.
 */
import axios from "axios";
const BASE_URL = "http://localhost:8080/"

export async function getRequest(url, payload, headers = {}) {
    try {
        const response = await axios.get(BASE_URL + url, {
            params: payload, 
            headers: headers, 
            withCredentials: true, // Include credentials like cookies
        });
        return response;
    } catch (error) {
        // Handle errors more gracefully
        if (error.response) {
            // The request was made and the server responded with a status code
            return Promise.reject({
                status: error.response.status,
                message: error.response.data?.message || 'An error occurred',
            });
        } else if (error.request) {
            // The request was made but no response was received
            return Promise.reject({
                status: null,
                message: 'No response received from server',
            });
        } else {
            // Something happened in setting up the request
            return Promise.reject({
                status: null,
                message: error.message,
            });
        }
    }
}


export async function postRequest(url, payload, headers = {}) {
    try {
        const response = await axios.post(BASE_URL + url, payload, { headers:headers, withCredentials: true });
        return response;
    } catch (error) {
        // Handle errors more gracefully
        if (error.response) {
            // The request was made and the server responded with a status code
            return Promise.reject({
                status: error.response.status,
                message: error.response.data?.message || 'An error occurred',
            });
        } else if (error.request) {
            // The request was made but no response was received
            return Promise.reject({
                status: null,
                message: 'No response received from server',
            });
        } else {
            // Something happened in setting up the request
            return Promise.reject({
                status: null,
                message: error.message,
            });
        }
    }
}


export async function putRequest(url,payload,headers={}){
    try {
        const response = await axios.put(BASE_URL + url, payload, { headers ,withCredentials: true});
        return response;
    } catch (error) {
        // Handle errors more gracefully
        if (error.response) {
            // The request was made and the server responded with a status code
            return Promise.reject({
                status: error.response.status,
                message: error.response.data?.message || 'An error occurred',
            });
        } else if (error.request) {
            // The request was made but no response was received
            return Promise.reject({
                status: null,
                message: 'No response received from server',
            });
        } else {
            // Something happened in setting up the request
            return Promise.reject({
                status: null,
                message: error.message,
            });
        }
    }
}

export async function deleteRequest(url,payload,headers={}){
    try {
        const response = await axios.delete(BASE_URL + url, payload, { headers});
        return response;
    } catch (error) {
        // Handle errors more gracefully
        if (error.response) {
            // The request was made and the server responded with a status code
            return Promise.reject({
                status: error.response.status,
                message: error.response.data?.message || 'An error occurred',
            });
        } else if (error.request) {
            // The request was made but no response was received
            return Promise.reject({
                status: null,
                message: 'No response received from server',
            });
        } else {
            // Something happened in setting up the request
            return Promise.reject({
                status: null,
                message: error.message,
            });
        }
    }
}