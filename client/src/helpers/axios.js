import axios from 'axios';

const axiosIntance = axios.create({
    baseURL: ' https://memoriespj-server.herokuapp.com/api/v1/',
});


export default axiosIntance