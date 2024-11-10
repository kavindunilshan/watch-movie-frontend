import axios from 'axios';
import {toast} from 'react-toastify';

const apiEndPoint = 'http://localhost:8080/api';

export const fetchData = async (path) => {
    try {
        const response = await axios.get(`${apiEndPoint}${path}`);
        return response.data;
    } catch (error) {
        toast.error(`${error.response.data.status} ${error.response.data.error}`);
    }
}

export const createData = async (path, data) => {
    try {
        const response = await axios.post(`${apiEndPoint}${path}`, data);
        return response.data;
    } catch (error) {
        toast.error(`${error.response.data.status} ${error.response.data.error}`);
    }
}

export const updateData = async (path, data) => {
    try {
        const response = await axios.put(`${apiEndPoint}${path}`, data);
        return response.data;
    } catch (error) {
        toast.error(`${error.response.data.status} ${error.response.data.error}`);
    }
}

export const deleteData = async (path) => {
    try {
        const response = await axios.delete(`${apiEndPoint}${path}`);
        return response.data;
    } catch (error) {
        toast.error(`${error.response.data.status} ${error.response.data.error}`);
    }
}

export const fetchTheaterData = async (userId) => {
    try {
        const response = await axios.get(`${apiEndPoint}/theaters/${userId}`);

        return response.data;

    } catch (error) {
        console.error("Failed to fetch theater data", error);
        throw error;
    }
};