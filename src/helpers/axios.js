import axios from 'axios';

const axiosIntance = axios.create({
    baseURL: 'https://memories-server-ybd9.onrender.com/api/v1/',
});

axiosIntance.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export default axiosIntance