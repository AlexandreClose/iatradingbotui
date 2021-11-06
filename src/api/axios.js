import axios from 'axios'

const axiosApi = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_API,
    timeout: 10000,
});

export default axiosApi