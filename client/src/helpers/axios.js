import axios from 'axios';

const axiosIntance = axios.create({
    baseURL: ' http://localhost:4000/api/v1/',
});

axiosIntance.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    
    return req;
})

export default axiosIntance