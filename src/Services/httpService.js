import axios from 'axios';
import { toast } from 'react-toastify';

const apiEndPoint = 'http://51.20.35.253:8080/api';


export const fetchData = async (path) => {
  try {
    const response = await axios.get(`${apiEndPoint}${path}`);
    return response.data;
  } catch (error) {
    toast.error(`${error.response.data.status} ${error.response.data.error}`);
  }
};

export const createData = async (path, data) => {
  try {
    const response = await axios.post(`${apiEndPoint}${path}`, data);
    return response.data;
  } catch (error) {
      toast.error(`${error.response.data.status} ${error.response.data.error}`);
  }
};

export const updateData = async (path, data) => {
  try {
    const response = await axios.put(`${apiEndPoint}${path}`, data);
    return response.data;
  } catch (error) {
      toast.error(`${error.response.data.status} ${error.response.data.error}`);
  }
}