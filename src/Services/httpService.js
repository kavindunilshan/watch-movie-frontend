import axios from 'axios';

const apiEndPoint = 'http://localhost:8080/watchMovie/api';


export const fetchData = async () => {
  try {
    const response = await axios.get(`${apiEndPoint}/movies`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};